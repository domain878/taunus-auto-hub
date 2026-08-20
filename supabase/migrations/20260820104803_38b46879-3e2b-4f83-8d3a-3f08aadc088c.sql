revoke execute on function public.set_updated_at() from anon, authenticated;
revoke execute on function public.handle_new_user() from anon, authenticated;
revoke execute on function public.log_vehicle_change() from anon, authenticated;
revoke execute on function public.has_role(uuid, public.app_role) from anon;
revoke execute on function public.is_staff() from anon;
revoke execute on function public.is_admin() from anon;
revoke execute on function public.next_document_number(public.doc_kind) from anon;
revoke execute on function public.create_daily_snapshot(date) from anon;