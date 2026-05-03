export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  state: string | null;
  district: string | null;
  language_preference: string;
  voter_status: "unknown" | "registered" | "not_registered";
  xp_points: number;
  level: number;
  streak_days: number;
};

export type Pledge = {
  id: string;
  user_id: string;
  pledge_text: string;
  is_public: boolean;
  state: string | null;
  created_at: string;
  profiles?: { full_name: string | null; avatar_url: string | null };
};
