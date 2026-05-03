-- USERS & AUTH
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  state TEXT,
  district TEXT,
  language_preference TEXT DEFAULT 'en',
  voter_id TEXT,
  voter_status TEXT DEFAULT 'unknown',
  date_of_birth DATE,
  is_first_time_voter BOOLEAN DEFAULT false,
  xp_points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  last_active_date DATE,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();

CREATE TABLE public.learning_modules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_hi TEXT,
  title_te TEXT,
  title_ta TEXT,
  description TEXT,
  icon TEXT,
  color TEXT,
  order_index INTEGER,
  xp_reward INTEGER DEFAULT 50,
  estimated_minutes INTEGER DEFAULT 5,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id UUID REFERENCES learning_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  order_index INTEGER,
  xp_reward INTEGER DEFAULT 20,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.user_lesson_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  module_id UUID REFERENCES learning_modules(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  score INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

CREATE TABLE public.quizzes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  explanation TEXT,
  difficulty TEXT DEFAULT 'medium',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.quiz_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  selected_option_id TEXT,
  is_correct BOOLEAN,
  attempted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.simulation_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  election_type TEXT DEFAULT 'general',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  completion_percentage INTEGER DEFAULT 0,
  steps_completed JSONB DEFAULT '[]',
  mock_vote_data JSONB,
  xp_earned INTEGER DEFAULT 0
);

CREATE TABLE public.chat_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT DEFAULT 'New Conversation',
  language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  sources JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.fact_check_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  input_text TEXT NOT NULL,
  input_url TEXT,
  credibility_score INTEGER,
  verdict TEXT,
  explanation TEXT,
  sources JSONB,
  checked_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  xp_value INTEGER DEFAULT 0,
  trigger_condition TEXT,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE public.user_badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

CREATE TABLE public.pledges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  pledge_text TEXT DEFAULT 'I pledge to vote in the upcoming election.',
  is_public BOOLEAN DEFAULT true,
  state TEXT,
  district TEXT,
  has_voted BOOLEAN DEFAULT false,
  voted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.booth_searches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  voter_id TEXT,
  results JSONB,
  searched_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.user_notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  type TEXT DEFAULT 'reminder',
  is_read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE fact_check_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE pledges ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulation_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users see own conversations" ON chat_conversations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users see own messages" ON chat_messages FOR ALL USING (
  conversation_id IN (SELECT id FROM chat_conversations WHERE user_id = auth.uid())
);
CREATE POLICY "Users see own progress" ON user_lesson_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Badges viewable by all" ON user_badges FOR SELECT USING (true);
CREATE POLICY "Users earn own badges" ON user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Public pledges visible" ON pledges FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "Users manage own pledges" ON pledges FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users see own simulations" ON simulation_sessions FOR ALL USING (auth.uid() = user_id);

CREATE INDEX idx_profiles_state ON profiles(state);
CREATE INDEX idx_pledges_state ON pledges(state, is_public);
CREATE INDEX idx_chat_messages_conversation ON chat_messages(conversation_id);
CREATE INDEX idx_user_progress_user ON user_lesson_progress(user_id);
CREATE INDEX idx_notifications_user ON user_notifications(user_id, is_read);
