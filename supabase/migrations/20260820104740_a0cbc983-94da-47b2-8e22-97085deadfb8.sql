-- ============ ENUMS ============
create type public.app_role as enum ('admin','mitarbeiter');
create type public.vehicle_status as enum ('eingekauft','aufbereitung','verfuegbar','reserviert','verkauft');
create type public.cost_type as enum ('werkstatt','aufbereitung','transport','inserat','standkosten','sonstiges');
create type public.lead_status as enum ('neu','in_bearbeitung','wiedervorlage','gewonnen','verloren');
create type public.deal_kind as enum ('ankauf','verkauf');
create type public.deal_status as enum ('offen','angebahnt','abgeschlossen','storniert');
create type public.doc_kind as enum ('bestellung','rechnung','uebergabeprotokoll','kaufvertrag_ankauf','vollmacht');
create type public.task_status as enum ('offen','in_arbeit','erledigt');

-- ============ HELPER: updated_at ============
create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

-- ============ PROFILES / ROLES ============
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  is_approved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role);
$$;

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.user_roles ur
    join public.profiles p on p.id = ur.user_id
    where ur.user_id = auth.uid() and p.is_approved = true
  );
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.user_roles ur
    join public.profiles p on p.id = ur.user_id
    where ur.user_id = auth.uid() and ur.role = 'admin' and p.is_approved = true
  );
$$;

create policy "own profile read" on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_staff());
create policy "own profile update" on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());
create policy "admin profile write" on public.profiles for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "roles read" on public.user_roles for select to authenticated
  using (user_id = auth.uid() or public.is_staff());
create policy "roles admin manage" on public.user_roles for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- bootstrap admin on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, is_approved)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name',
          lower(coalesce(new.email,'')) = 'info@hochtaunus-automobile.de')
  on conflict (id) do nothing;
  if lower(coalesce(new.email,'')) = 'info@hochtaunus-automobile.de' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin')
    on conflict do nothing;
  end if;
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============ VEHICLES ============
create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text not null,
  brand text,
  model text,
  year integer,
  first_registration text,
  mileage_km integer,
  fuel text,
  transmission text,
  power_kw integer,
  power_ps integer,
  displacement_ccm integer,
  emission_class text,
  hu text,
  previous_owners integer,
  doors integer,
  seats integer,
  color text,
  condition_text text,
  accident_free boolean,
  features text[] not null default '{}',
  description text,
  price_eur numeric(12,2),
  vat_deductible boolean not null default false,
  status vehicle_status not null default 'verfuegbar',
  website_published boolean not null default false,
  vin text,
  license_plate text,
  purchase_price_eur numeric(12,2),
  purchase_date date,
  sale_price_eur numeric(12,2),
  sale_date date,
  source text,
  external_id text,
  mobile_ad_id text,
  mobile_seller_id text,
  source_url text,
  internal_notes text,
  last_synced_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index vehicles_published_idx on public.vehicles (website_published, status);
create index vehicles_brand_idx on public.vehicles (brand);
create trigger vehicles_updated_at before update on public.vehicles
  for each row execute function public.set_updated_at();

grant select, insert, update, delete on public.vehicles to authenticated;
grant all on public.vehicles to service_role;
-- anon: only public columns
grant select (id, slug, title, brand, model, year, first_registration, mileage_km, fuel,
  transmission, power_kw, power_ps, displacement_ccm, emission_class, hu, previous_owners,
  doors, seats, color, condition_text, accident_free, features, description, price_eur,
  vat_deductible, status, website_published, source_url, created_at, updated_at)
  on public.vehicles to anon;

alter table public.vehicles enable row level security;
create policy "public can read published vehicles" on public.vehicles for select to anon
  using (website_published = true);
create policy "staff read vehicles" on public.vehicles for select to authenticated
  using (public.is_staff() or website_published = true);
create policy "staff write vehicles" on public.vehicles for insert to authenticated
  with check (public.is_staff());
create policy "staff update vehicles" on public.vehicles for update to authenticated
  using (public.is_staff()) with check (public.is_staff());
create policy "admin delete vehicles" on public.vehicles for delete to authenticated
  using (public.is_admin());

create table public.vehicle_images (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  url text not null,
  alt_text text,
  sort_order integer not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);
create index vehicle_images_vehicle_idx on public.vehicle_images (vehicle_id, sort_order);
grant select, insert, update, delete on public.vehicle_images to authenticated;
grant all on public.vehicle_images to service_role;
grant select on public.vehicle_images to anon;
alter table public.vehicle_images enable row level security;
create policy "public read images of published vehicles" on public.vehicle_images for select to anon
  using (exists (select 1 from public.vehicles v where v.id = vehicle_id and v.website_published));
create policy "staff read images" on public.vehicle_images for select to authenticated
  using (public.is_staff() or exists (select 1 from public.vehicles v where v.id = vehicle_id and v.website_published));
create policy "staff manage images" on public.vehicle_images for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

create table public.vehicle_costs (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  cost_type cost_type not null default 'sonstiges',
  amount_eur numeric(12,2) not null,
  cost_date date not null default current_date,
  description text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
create index vehicle_costs_vehicle_idx on public.vehicle_costs (vehicle_id);
grant select, insert, update, delete on public.vehicle_costs to authenticated;
grant all on public.vehicle_costs to service_role;
alter table public.vehicle_costs enable row level security;
create policy "staff manage costs" on public.vehicle_costs for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

-- ============ CUSTOMERS / LEADS ============
create table public.customers (
  id uuid primary key default gen_random_uuid(),
  first_name text,
  last_name text,
  company text,
  email text,
  phone text,
  street text,
  zip text,
  city text,
  country text default 'Deutschland',
  birth_date date,
  id_number text,
  notes text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger customers_updated_at before update on public.customers
  for each row execute function public.set_updated_at();
grant select, insert, update, delete on public.customers to authenticated;
grant all on public.customers to service_role;
alter table public.customers enable row level security;
create policy "staff manage customers" on public.customers for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete set null,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  name text,
  email text,
  phone text,
  source text,
  status lead_status not null default 'neu',
  message text,
  notes text,
  follow_up_date date,
  assigned_to uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger leads_updated_at before update on public.leads
  for each row execute function public.set_updated_at();
grant select, insert, update, delete on public.leads to authenticated;
grant all on public.leads to service_role;
alter table public.leads enable row level security;
create policy "staff manage leads" on public.leads for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

-- ============ DEALS ============
create table public.deals (
  id uuid primary key default gen_random_uuid(),
  deal_number text unique,
  kind deal_kind not null,
  customer_id uuid references public.customers(id) on delete set null,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  price_eur numeric(12,2),
  vat_deductible boolean not null default false,
  deal_date date not null default current_date,
  status deal_status not null default 'offen',
  notes text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger deals_updated_at before update on public.deals
  for each row execute function public.set_updated_at();
grant select, insert, update, delete on public.deals to authenticated;
grant all on public.deals to service_role;
alter table public.deals enable row level security;
create policy "staff manage deals" on public.deals for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

-- ============ DOCUMENTS ============
create table public.document_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  kind doc_kind not null,
  body text,
  legal_review_required boolean not null default true,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger document_templates_updated_at before update on public.document_templates
  for each row execute function public.set_updated_at();
grant select, insert, update, delete on public.document_templates to authenticated;
grant all on public.document_templates to service_role;
alter table public.document_templates enable row level security;
create policy "staff read templates" on public.document_templates for select to authenticated
  using (public.is_staff());
create policy "admin manage templates" on public.document_templates for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  document_number text unique,
  kind doc_kind not null,
  template_id uuid references public.document_templates(id) on delete set null,
  customer_id uuid references public.customers(id) on delete set null,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  deal_id uuid references public.deals(id) on delete set null,
  title text,
  data jsonb not null default '{}'::jsonb,
  body text,
  total_eur numeric(12,2),
  status text not null default 'entwurf',
  issued_at date,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger documents_updated_at before update on public.documents
  for each row execute function public.set_updated_at();
grant select, insert, update, delete on public.documents to authenticated;
grant all on public.documents to service_role;
alter table public.documents enable row level security;
create policy "staff manage documents" on public.documents for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

-- document numbering
create sequence if not exists public.doc_number_seq;
create or replace function public.next_document_number(_kind doc_kind)
returns text language plpgsql security definer set search_path = public as $$
declare prefix text; n bigint;
begin
  if not public.is_staff() then raise exception 'not authorized'; end if;
  prefix := case _kind
    when 'rechnung' then 'RE' when 'bestellung' then 'BE'
    when 'uebergabeprotokoll' then 'UP' when 'kaufvertrag_ankauf' then 'AK'
    else 'VM' end;
  n := nextval('public.doc_number_seq');
  return prefix || '-' || to_char(now(),'YYYY') || '-' || lpad(n::text, 5, '0');
end; $$;

-- ============ TASKS ============
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  status task_status not null default 'offen',
  priority text not null default 'normal',
  due_date date,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  customer_id uuid references public.customers(id) on delete set null,
  deal_id uuid references public.deals(id) on delete set null,
  assigned_to uuid references auth.users(id) on delete set null,
  created_by uuid references auth.users(id) on delete set null,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger tasks_updated_at before update on public.tasks
  for each row execute function public.set_updated_at();
grant select, insert, update, delete on public.tasks to authenticated;
grant all on public.tasks to service_role;
alter table public.tasks enable row level security;
create policy "staff manage tasks" on public.tasks for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

-- ============ ACTIVITY LOG ============
create table public.activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  user_email text,
  action text not null,
  entity_table text,
  entity_id uuid,
  description text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index activity_log_created_idx on public.activity_log (created_at desc);
grant select, insert on public.activity_log to authenticated;
grant all on public.activity_log to service_role;
alter table public.activity_log enable row level security;
create policy "staff read activity" on public.activity_log for select to authenticated
  using (public.is_staff());
create policy "staff insert activity" on public.activity_log for insert to authenticated
  with check (public.is_staff());

create or replace function public.log_vehicle_change()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_action text; v_desc text;
begin
  if tg_op = 'INSERT' then
    v_action := 'vehicle_created'; v_desc := 'Fahrzeug angelegt: ' || new.title;
  elsif tg_op = 'UPDATE' then
    v_action := 'vehicle_updated';
    v_desc := 'Fahrzeug aktualisiert: ' || new.title;
    if new.status is distinct from old.status then
      v_desc := v_desc || ' (Status: ' || old.status || ' -> ' || new.status || ')';
    end if;
    if new.website_published is distinct from old.website_published then
      v_desc := v_desc || case when new.website_published then ' (auf Website veröffentlicht)' else ' (von Website entfernt)' end;
    end if;
  else
    v_action := 'vehicle_deleted'; v_desc := 'Fahrzeug gelöscht: ' || old.title;
  end if;
  insert into public.activity_log (user_id, action, entity_table, entity_id, description)
  values (auth.uid(), v_action, 'vehicles', coalesce(new.id, old.id), v_desc);
  return coalesce(new, old);
end; $$;
create trigger vehicles_activity after insert or update or delete on public.vehicles
  for each row execute function public.log_vehicle_change();

-- ============ DAILY SNAPSHOTS ============
create table public.daily_snapshots (
  id uuid primary key default gen_random_uuid(),
  snapshot_date date not null unique,
  total_vehicles integer not null default 0,
  available_count integer not null default 0,
  reserved_count integer not null default 0,
  preparation_count integer not null default 0,
  sold_count integer not null default 0,
  sold_today integer not null default 0,
  new_today integer not null default 0,
  stock_sales_value_eur numeric(14,2),
  stock_purchase_value_eur numeric(14,2),
  stock_costs_eur numeric(14,2),
  potential_margin_eur numeric(14,2),
  open_leads integer not null default 0,
  open_tasks integer not null default 0,
  created_at timestamptz not null default now()
);
grant select, insert, update on public.daily_snapshots to authenticated;
grant all on public.daily_snapshots to service_role;
alter table public.daily_snapshots enable row level security;
create policy "staff read snapshots" on public.daily_snapshots for select to authenticated
  using (public.is_staff());

create or replace function public.create_daily_snapshot(_date date default current_date)
returns public.daily_snapshots language plpgsql security definer set search_path = public as $$
declare r public.daily_snapshots;
begin
  if not public.is_staff() then raise exception 'not authorized'; end if;
  insert into public.daily_snapshots (
    snapshot_date, total_vehicles, available_count, reserved_count, preparation_count,
    sold_count, sold_today, new_today, stock_sales_value_eur, stock_purchase_value_eur,
    stock_costs_eur, potential_margin_eur, open_leads, open_tasks)
  select _date,
    count(*) filter (where status <> 'verkauft'),
    count(*) filter (where status = 'verfuegbar'),
    count(*) filter (where status = 'reserviert'),
    count(*) filter (where status = 'aufbereitung'),
    count(*) filter (where status = 'verkauft'),
    count(*) filter (where status = 'verkauft' and sale_date = _date),
    count(*) filter (where created_at::date = _date),
    sum(price_eur) filter (where status <> 'verkauft'),
    sum(purchase_price_eur) filter (where status <> 'verkauft'),
    (select sum(c.amount_eur) from public.vehicle_costs c
       join public.vehicles v2 on v2.id = c.vehicle_id where v2.status <> 'verkauft'),
    coalesce(sum(price_eur) filter (where status <> 'verkauft' and purchase_price_eur is not null), 0)
      - coalesce(sum(purchase_price_eur) filter (where status <> 'verkauft'), 0)
      - coalesce((select sum(c.amount_eur) from public.vehicle_costs c
           join public.vehicles v2 on v2.id = c.vehicle_id
           where v2.status <> 'verkauft' and v2.purchase_price_eur is not null), 0),
    (select count(*) from public.leads where status in ('neu','in_bearbeitung','wiedervorlage')),
    (select count(*) from public.tasks where status <> 'erledigt')
  from public.vehicles
  on conflict (snapshot_date) do update set
    total_vehicles = excluded.total_vehicles,
    available_count = excluded.available_count,
    reserved_count = excluded.reserved_count,
    preparation_count = excluded.preparation_count,
    sold_count = excluded.sold_count,
    sold_today = excluded.sold_today,
    new_today = excluded.new_today,
    stock_sales_value_eur = excluded.stock_sales_value_eur,
    stock_purchase_value_eur = excluded.stock_purchase_value_eur,
    stock_costs_eur = excluded.stock_costs_eur,
    potential_margin_eur = excluded.potential_margin_eur,
    open_leads = excluded.open_leads,
    open_tasks = excluded.open_tasks
  returning * into r;
  return r;
end; $$;

-- ============ INTEGRATIONS / MARKETING ============
create table public.integration_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  label text,
  value text,
  status text not null default 'nicht_verbunden',
  notes text,
  last_synced_at timestamptz,
  updated_at timestamptz not null default now()
);
create trigger integration_settings_updated_at before update on public.integration_settings
  for each row execute function public.set_updated_at();
grant select, insert, update on public.integration_settings to authenticated;
grant all on public.integration_settings to service_role;
alter table public.integration_settings enable row level security;
create policy "staff read integrations" on public.integration_settings for select to authenticated
  using (public.is_staff());
create policy "admin manage integrations" on public.integration_settings for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

insert into public.integration_settings (key, label, status, notes) values
  ('mobile_de', 'mobile.de Seller/Search API', 'nicht_verbunden',
   'Zugangsdaten werden ausschließlich serverseitig als Secret gespeichert. Aktuell keine Verbindung.'),
  ('instagram', 'Instagram Profil', 'nicht_verbunden',
   'Profil-URL eintragen, sobald vorhanden. Kein erfundener Handle.');

create table public.marketing_kpis (
  id uuid primary key default gen_random_uuid(),
  week_start date not null unique,
  reels integer,
  vehicle_posts integer,
  stories integer,
  inquiries integer,
  profile_views integer,
  website_clicks integer,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger marketing_kpis_updated_at before update on public.marketing_kpis
  for each row execute function public.set_updated_at();
grant select, insert, update, delete on public.marketing_kpis to authenticated;
grant all on public.marketing_kpis to service_role;
alter table public.marketing_kpis enable row level security;
create policy "staff manage kpis" on public.marketing_kpis for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

create table public.marketing_content_plan (
  id uuid primary key default gen_random_uuid(),
  planned_date date,
  format text,
  topic text not null,
  status text not null default 'geplant',
  vehicle_id uuid references public.vehicles(id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger marketing_content_plan_updated_at before update on public.marketing_content_plan
  for each row execute function public.set_updated_at();
grant select, insert, update, delete on public.marketing_content_plan to authenticated;
grant all on public.marketing_content_plan to service_role;
alter table public.marketing_content_plan enable row level security;
create policy "staff manage content plan" on public.marketing_content_plan for all to authenticated
  using (public.is_staff()) with check (public.is_staff());
