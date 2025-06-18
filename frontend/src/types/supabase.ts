Need to install the following packages:
supabase@2.26.9
Ok to proceed? (y) 
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      availabilities: {
        Row: {
          available_from: string
          available_to: string
          created_at: string | null
          deleted_at: string | null
          id: string
          is_deleted: boolean | null
          tutor_id: string
          updated_at: string | null
        }
        Insert: {
          available_from: string
          available_to: string
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          is_deleted?: boolean | null
          tutor_id: string
          updated_at?: string | null
        }
        Update: {
          available_from?: string
          available_to?: string
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          is_deleted?: boolean | null
          tutor_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "availabilities_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string
          id: string
          status: number | null
          stripe_session_id: string
          student_id: string
          ticket_type_id: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency: string
          id?: string
          status?: number | null
          stripe_session_id: string
          student_id: string
          ticket_type_id: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string
          id?: string
          status?: number | null
          stripe_session_id?: string
          student_id?: string
          ticket_type_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_ticket_type_id_fkey"
            columns: ["ticket_type_id"]
            isOneToOne: false
            referencedRelation: "ticket_types"
            referencedColumns: ["id"]
          },
        ]
      }
      reservations: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          end_at: string
          id: string
          is_deleted: boolean | null
          start_at: string
          status: number
          student_id: string
          ticket_id: string | null
          tutor_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          end_at: string
          id?: string
          is_deleted?: boolean | null
          start_at: string
          status?: number
          student_id: string
          ticket_id?: string | null
          tutor_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          end_at?: string
          id?: string
          is_deleted?: boolean | null
          start_at?: string
          status?: number
          student_id?: string
          ticket_id?: string | null
          tutor_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_type_visible_students: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          id: string
          is_deleted: boolean | null
          student_id: string
          ticket_type_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          is_deleted?: boolean | null
          student_id: string
          ticket_type_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          is_deleted?: boolean | null
          student_id?: string
          ticket_type_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_type_visible_students_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_type_visible_students_ticket_type_id_fkey"
            columns: ["ticket_type_id"]
            isOneToOne: false
            referencedRelation: "ticket_types"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_types: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          id: string
          is_deleted: boolean | null
          lesson_duration: number
          price: unknown
          quantities: number
          tutor_id: string
          type: number
          updated_at: string | null
          visibility: number
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          is_deleted?: boolean | null
          lesson_duration: number
          price: unknown
          quantities?: number
          tutor_id: string
          type: number
          updated_at?: string | null
          visibility?: number
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          is_deleted?: boolean | null
          lesson_duration?: number
          price?: unknown
          quantities?: number
          tutor_id?: string
          type?: number
          updated_at?: string | null
          visibility?: number
        }
        Relationships: [
          {
            foreignKeyName: "ticket_types_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          expire_at: string
          id: string
          is_deleted: boolean | null
          is_used: boolean | null
          payment_id: string | null
          student_id: string
          ticket_type_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          expire_at: string
          id?: string
          is_deleted?: boolean | null
          is_used?: boolean | null
          payment_id?: string | null
          student_id: string
          ticket_type_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          expire_at?: string
          id?: string
          is_deleted?: boolean | null
          is_used?: boolean | null
          payment_id?: string | null
          student_id?: string
          ticket_type_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_ticket_type_id_fkey"
            columns: ["ticket_type_id"]
            isOneToOne: false
            referencedRelation: "ticket_types"
            referencedColumns: ["id"]
          },
        ]
      }
      tokens: {
        Row: {
          created_at: string | null
          email: string | null
          expires_at: string | null
          id: string
          token: string
          updated_at: string | null
          used_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          expires_at?: string | null
          id?: string
          token?: string
          updated_at?: string | null
          used_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          expires_at?: string | null
          id?: string
          token?: string
          updated_at?: string | null
          used_at?: string | null
        }
        Relationships: []
      }
      tutor_settings: {
        Row: {
          booking_deadline: number
          booking_unit: number
          created_at: string | null
          currency: string
          deleted_at: string | null
          id: string
          is_deleted: boolean | null
          picture_path: string | null
          public_id: string
          stripe_account_id: string | null
          tutor_id: string
          updated_at: string | null
        }
        Insert: {
          booking_deadline: number
          booking_unit?: number
          created_at?: string | null
          currency: string
          deleted_at?: string | null
          id?: string
          is_deleted?: boolean | null
          picture_path?: string | null
          public_id: string
          stripe_account_id?: string | null
          tutor_id: string
          updated_at?: string | null
        }
        Update: {
          booking_deadline?: number
          booking_unit?: number
          created_at?: string | null
          currency?: string
          deleted_at?: string | null
          id?: string
          is_deleted?: boolean | null
          picture_path?: string | null
          public_id?: string
          stripe_account_id?: string | null
          tutor_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tutor_settings_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          deleted_at: string | null
          email: string
          first_name: string | null
          id: string
          is_deleted: boolean | null
          last_name: string | null
          reated_at: string | null
          role: number
          time_zone: string | null
          tutor_id: string | null
          updated_at: string | null
        }
        Insert: {
          deleted_at?: string | null
          email: string
          first_name?: string | null
          id?: string
          is_deleted?: boolean | null
          last_name?: string | null
          reated_at?: string | null
          role: number
          time_zone?: string | null
          tutor_id?: string | null
          updated_at?: string | null
        }
        Update: {
          deleted_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          is_deleted?: boolean | null
          last_name?: string | null
          reated_at?: string | null
          role?: number
          time_zone?: string | null
          tutor_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
