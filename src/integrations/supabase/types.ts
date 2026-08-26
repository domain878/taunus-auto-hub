export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      activity_log: {
        Row: {
          action: string
          created_at: string
          description: string | null
          entity_id: string | null
          entity_table: string | null
          id: string
          meta: Json
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          description?: string | null
          entity_id?: string | null
          entity_table?: string | null
          id?: string
          meta?: Json
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          description?: string | null
          entity_id?: string | null
          entity_table?: string | null
          id?: string
          meta?: Json
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          birth_date: string | null
          city: string | null
          company: string | null
          country: string | null
          created_at: string
          created_by: string | null
          email: string | null
          first_name: string | null
          id: string
          id_number: string | null
          last_name: string | null
          notes: string | null
          phone: string | null
          street: string | null
          updated_at: string
          zip: string | null
        }
        Insert: {
          birth_date?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          id_number?: string | null
          last_name?: string | null
          notes?: string | null
          phone?: string | null
          street?: string | null
          updated_at?: string
          zip?: string | null
        }
        Update: {
          birth_date?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          id_number?: string | null
          last_name?: string | null
          notes?: string | null
          phone?: string | null
          street?: string | null
          updated_at?: string
          zip?: string | null
        }
        Relationships: []
      }
      daily_snapshots: {
        Row: {
          available_count: number
          created_at: string
          id: string
          new_today: number
          open_leads: number
          open_tasks: number
          potential_margin_eur: number | null
          preparation_count: number
          reserved_count: number
          snapshot_date: string
          sold_count: number
          sold_today: number
          stock_costs_eur: number | null
          stock_purchase_value_eur: number | null
          stock_sales_value_eur: number | null
          total_vehicles: number
        }
        Insert: {
          available_count?: number
          created_at?: string
          id?: string
          new_today?: number
          open_leads?: number
          open_tasks?: number
          potential_margin_eur?: number | null
          preparation_count?: number
          reserved_count?: number
          snapshot_date: string
          sold_count?: number
          sold_today?: number
          stock_costs_eur?: number | null
          stock_purchase_value_eur?: number | null
          stock_sales_value_eur?: number | null
          total_vehicles?: number
        }
        Update: {
          available_count?: number
          created_at?: string
          id?: string
          new_today?: number
          open_leads?: number
          open_tasks?: number
          potential_margin_eur?: number | null
          preparation_count?: number
          reserved_count?: number
          snapshot_date?: string
          sold_count?: number
          sold_today?: number
          stock_costs_eur?: number | null
          stock_purchase_value_eur?: number | null
          stock_sales_value_eur?: number | null
          total_vehicles?: number
        }
        Relationships: []
      }
      deals: {
        Row: {
          created_at: string
          created_by: string | null
          customer_id: string | null
          deal_date: string
          deal_number: string | null
          id: string
          kind: Database["public"]["Enums"]["deal_kind"]
          notes: string | null
          price_eur: number | null
          status: Database["public"]["Enums"]["deal_status"]
          updated_at: string
          vat_deductible: boolean
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          deal_date?: string
          deal_number?: string | null
          id?: string
          kind: Database["public"]["Enums"]["deal_kind"]
          notes?: string | null
          price_eur?: number | null
          status?: Database["public"]["Enums"]["deal_status"]
          updated_at?: string
          vat_deductible?: boolean
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          deal_date?: string
          deal_number?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["deal_kind"]
          notes?: string | null
          price_eur?: number | null
          status?: Database["public"]["Enums"]["deal_status"]
          updated_at?: string
          vat_deductible?: boolean
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      document_templates: {
        Row: {
          body: string | null
          created_at: string
          id: string
          is_active: boolean
          kind: Database["public"]["Enums"]["doc_kind"]
          legal_review_required: boolean
          name: string
          updated_at: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          kind: Database["public"]["Enums"]["doc_kind"]
          legal_review_required?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          kind?: Database["public"]["Enums"]["doc_kind"]
          legal_review_required?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          body: string | null
          created_at: string
          created_by: string | null
          customer_id: string | null
          data: Json
          deal_id: string | null
          document_number: string | null
          id: string
          issued_at: string | null
          kind: Database["public"]["Enums"]["doc_kind"]
          status: string
          template_id: string | null
          title: string | null
          total_eur: number | null
          updated_at: string
          vehicle_id: string | null
        }
        Insert: {
          body?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          data?: Json
          deal_id?: string | null
          document_number?: string | null
          id?: string
          issued_at?: string | null
          kind: Database["public"]["Enums"]["doc_kind"]
          status?: string
          template_id?: string | null
          title?: string | null
          total_eur?: number | null
          updated_at?: string
          vehicle_id?: string | null
        }
        Update: {
          body?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          data?: Json
          deal_id?: string | null
          document_number?: string | null
          id?: string
          issued_at?: string | null
          kind?: Database["public"]["Enums"]["doc_kind"]
          status?: string
          template_id?: string | null
          title?: string | null
          total_eur?: number | null
          updated_at?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "document_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_settings: {
        Row: {
          id: string
          key: string
          label: string | null
          last_synced_at: string | null
          notes: string | null
          status: string
          updated_at: string
          value: string | null
        }
        Insert: {
          id?: string
          key: string
          label?: string | null
          last_synced_at?: string | null
          notes?: string | null
          status?: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          id?: string
          key?: string
          label?: string | null
          last_synced_at?: string | null
          notes?: string | null
          status?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          assigned_to: string | null
          created_at: string
          customer_id: string | null
          email: string | null
          follow_up_date: string | null
          id: string
          message: string | null
          name: string | null
          notes: string | null
          phone: string | null
          source: string | null
          status: Database["public"]["Enums"]["lead_status"]
          updated_at: string
          vehicle_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          customer_id?: string | null
          email?: string | null
          follow_up_date?: string | null
          id?: string
          message?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
          vehicle_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          customer_id?: string | null
          email?: string | null
          follow_up_date?: string | null
          id?: string
          message?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_content_plan: {
        Row: {
          created_at: string
          format: string | null
          id: string
          notes: string | null
          planned_date: string | null
          status: string
          topic: string
          updated_at: string
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string
          format?: string | null
          id?: string
          notes?: string | null
          planned_date?: string | null
          status?: string
          topic: string
          updated_at?: string
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string
          format?: string | null
          id?: string
          notes?: string | null
          planned_date?: string | null
          status?: string
          topic?: string
          updated_at?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketing_content_plan_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_kpis: {
        Row: {
          created_at: string
          id: string
          inquiries: number | null
          notes: string | null
          profile_views: number | null
          reels: number | null
          stories: number | null
          updated_at: string
          vehicle_posts: number | null
          website_clicks: number | null
          week_start: string
        }
        Insert: {
          created_at?: string
          id?: string
          inquiries?: number | null
          notes?: string | null
          profile_views?: number | null
          reels?: number | null
          stories?: number | null
          updated_at?: string
          vehicle_posts?: number | null
          website_clicks?: number | null
          week_start: string
        }
        Update: {
          created_at?: string
          id?: string
          inquiries?: number | null
          notes?: string | null
          profile_views?: number | null
          reels?: number | null
          stories?: number | null
          updated_at?: string
          vehicle_posts?: number | null
          website_clicks?: number | null
          week_start?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          is_approved: boolean
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          is_approved?: boolean
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_approved?: boolean
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          customer_id: string | null
          deal_id: string | null
          description: string | null
          due_date: string | null
          id: string
          priority: string
          status: Database["public"]["Enums"]["task_status"]
          title: string
          updated_at: string
          vehicle_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          deal_id?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          status?: Database["public"]["Enums"]["task_status"]
          title: string
          updated_at?: string
          vehicle_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          deal_id?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          status?: Database["public"]["Enums"]["task_status"]
          title?: string
          updated_at?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vehicle_costs: {
        Row: {
          amount_eur: number
          cost_date: string
          cost_type: Database["public"]["Enums"]["cost_type"]
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          vehicle_id: string
        }
        Insert: {
          amount_eur: number
          cost_date?: string
          cost_type?: Database["public"]["Enums"]["cost_type"]
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          vehicle_id: string
        }
        Update: {
          amount_eur?: number
          cost_date?: string
          cost_type?: Database["public"]["Enums"]["cost_type"]
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_costs_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_images: {
        Row: {
          alt_text: string | null
          created_at: string
          id: string
          is_primary: boolean
          sort_order: number
          url: string
          vehicle_id: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          id?: string
          is_primary?: boolean
          sort_order?: number
          url: string
          vehicle_id: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          id?: string
          is_primary?: boolean
          sort_order?: number
          url?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_images_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          accident_free: boolean | null
          brand: string | null
          color: string | null
          condition_text: string | null
          created_at: string
          created_by: string | null
          description: string | null
          displacement_ccm: number | null
          doors: number | null
          emission_class: string | null
          external_id: string | null
          features: string[]
          first_registration: string | null
          fuel: string | null
          hu: string | null
          id: string
          internal_notes: string | null
          last_synced_at: string | null
          license_plate: string | null
          mileage_km: number | null
          mobile_ad_id: string | null
          mobile_seller_id: string | null
          model: string | null
          power_kw: number | null
          power_ps: number | null
          previous_owners: number | null
          price_eur: number | null
          purchase_date: string | null
          purchase_price_eur: number | null
          sale_date: string | null
          sale_price_eur: number | null
          seats: number | null
          slug: string | null
          source: string | null
          source_url: string | null
          status: Database["public"]["Enums"]["vehicle_status"]
          title: string
          transmission: string | null
          updated_at: string
          vat_deductible: boolean
          vin: string | null
          website_published: boolean
          year: number | null
        }
        Insert: {
          accident_free?: boolean | null
          brand?: string | null
          color?: string | null
          condition_text?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          displacement_ccm?: number | null
          doors?: number | null
          emission_class?: string | null
          external_id?: string | null
          features?: string[]
          first_registration?: string | null
          fuel?: string | null
          hu?: string | null
          id?: string
          internal_notes?: string | null
          last_synced_at?: string | null
          license_plate?: string | null
          mileage_km?: number | null
          mobile_ad_id?: string | null
          mobile_seller_id?: string | null
          model?: string | null
          power_kw?: number | null
          power_ps?: number | null
          previous_owners?: number | null
          price_eur?: number | null
          purchase_date?: string | null
          purchase_price_eur?: number | null
          sale_date?: string | null
          sale_price_eur?: number | null
          seats?: number | null
          slug?: string | null
          source?: string | null
          source_url?: string | null
          status?: Database["public"]["Enums"]["vehicle_status"]
          title: string
          transmission?: string | null
          updated_at?: string
          vat_deductible?: boolean
          vin?: string | null
          website_published?: boolean
          year?: number | null
        }
        Update: {
          accident_free?: boolean | null
          brand?: string | null
          color?: string | null
          condition_text?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          displacement_ccm?: number | null
          doors?: number | null
          emission_class?: string | null
          external_id?: string | null
          features?: string[]
          first_registration?: string | null
          fuel?: string | null
          hu?: string | null
          id?: string
          internal_notes?: string | null
          last_synced_at?: string | null
          license_plate?: string | null
          mileage_km?: number | null
          mobile_ad_id?: string | null
          mobile_seller_id?: string | null
          model?: string | null
          power_kw?: number | null
          power_ps?: number | null
          previous_owners?: number | null
          price_eur?: number | null
          purchase_date?: string | null
          purchase_price_eur?: number | null
          sale_date?: string | null
          sale_price_eur?: number | null
          seats?: number | null
          slug?: string | null
          source?: string | null
          source_url?: string | null
          status?: Database["public"]["Enums"]["vehicle_status"]
          title?: string
          transmission?: string | null
          updated_at?: string
          vat_deductible?: boolean
          vin?: string | null
          website_published?: boolean
          year?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_daily_snapshot: {
        Args: { _date?: string }
        Returns: {
          available_count: number
          created_at: string
          id: string
          new_today: number
          open_leads: number
          open_tasks: number
          potential_margin_eur: number | null
          preparation_count: number
          reserved_count: number
          snapshot_date: string
          sold_count: number
          sold_today: number
          stock_costs_eur: number | null
          stock_purchase_value_eur: number | null
          stock_sales_value_eur: number | null
          total_vehicles: number
        }
        SetofOptions: {
          from: "*"
          to: "daily_snapshots"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      is_staff: { Args: never; Returns: boolean }
      next_document_number: {
        Args: { _kind: Database["public"]["Enums"]["doc_kind"] }
        Returns: string
      }
    }
    Enums: {
      app_role: "admin" | "mitarbeiter"
      cost_type:
        | "werkstatt"
        | "aufbereitung"
        | "transport"
        | "inserat"
        | "standkosten"
        | "sonstiges"
      deal_kind: "ankauf" | "verkauf"
      deal_status: "offen" | "angebahnt" | "abgeschlossen" | "storniert"
      doc_kind:
        | "bestellung"
        | "rechnung"
        | "uebergabeprotokoll"
        | "kaufvertrag_ankauf"
        | "vollmacht"
      lead_status:
        | "neu"
        | "in_bearbeitung"
        | "wiedervorlage"
        | "gewonnen"
        | "verloren"
      task_status: "offen" | "in_arbeit" | "erledigt"
      vehicle_status:
        | "eingekauft"
        | "aufbereitung"
        | "verfuegbar"
        | "reserviert"
        | "verkauft"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "mitarbeiter"],
      cost_type: [
        "werkstatt",
        "aufbereitung",
        "transport",
        "inserat",
        "standkosten",
        "sonstiges",
      ],
      deal_kind: ["ankauf", "verkauf"],
      deal_status: ["offen", "angebahnt", "abgeschlossen", "storniert"],
      doc_kind: [
        "bestellung",
        "rechnung",
        "uebergabeprotokoll",
        "kaufvertrag_ankauf",
        "vollmacht",
      ],
      lead_status: [
        "neu",
        "in_bearbeitung",
        "wiedervorlage",
        "gewonnen",
        "verloren",
      ],
      task_status: ["offen", "in_arbeit", "erledigt"],
      vehicle_status: [
        "eingekauft",
        "aufbereitung",
        "verfuegbar",
        "reserviert",
        "verkauft",
      ],
    },
  },
} as const
