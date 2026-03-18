export type LeadSource = "chat" | "call" | "booking";
export type LeadStatus = "new" | "contacted" | "qualified" | "won" | "lost";

export interface LeadRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  source: LeadSource;
  status: LeadStatus;
  chat_transcript: Record<string, unknown>[] | null;
  calendly_event_uri: string | null;
  scheduled_at: string | null;
  timezone: string | null;
  cancel_url: string | null;
  reschedule_url: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  lead_score: number;
  hubspot_contact_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeadInsert
  extends Omit<LeadRow, "id" | "created_at" | "updated_at" | "lead_score" | "status"> {
  id?: string;
  status?: LeadStatus;
  lead_score?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: LeadRow;
        Insert: LeadInsert;
        Update: Partial<LeadInsert>;
      };
    };
  };
}
