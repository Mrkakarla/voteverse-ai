INSERT INTO learning_modules (title, title_hi, description, icon, color, order_index, xp_reward, estimated_minutes) VALUES
('What is Democracy?', 'Loktantra kya hai?', 'Understand the foundations of democratic governance', 'temple', '#6366f1', 1, 100, 8),
('Voter Registration', 'Matdata panjikaran', 'Step-by-step guide to registering as a voter', 'list', '#22c55e', 2, 150, 10),
('How Elections Work', 'Chunav kaise hote hain?', 'From candidate nomination to result declaration', 'vote', '#f59e0b', 3, 200, 15),
('The EVM & VVPAT', 'EVM aur VVPAT', 'Understanding electronic voting machines', 'monitor', '#3b82f6', 4, 175, 12),
('Your Voting Rights', 'Aapke matdan adhikar', 'Rights and protections at the polling booth', 'scale', '#ec4899', 5, 125, 8),
('Spotting Fake News', 'Farzi khabar pehchanna', 'How to verify claims before sharing', 'search', '#ef4444', 6, 200, 12),
('Model Code of Conduct', 'Aachar sanhita', 'Rules governing elections and candidates', 'file-text', '#8b5cf6', 7, 150, 10),
('After the Vote: Results', 'Matganana', 'How votes are counted and results certified', 'bar-chart', '#06b6d4', 8, 175, 12);

INSERT INTO badges (name, description, icon, color, xp_value, trigger_condition) VALUES
('First Login', 'Welcome to VoteVerse!', 'star', '#f59e0b', 50, 'first_login'),
('Voter Registered', 'Completed voter registration check', 'check', '#22c55e', 100, 'voter_status_check'),
('Democracy Scholar', 'Completed first learning module', 'book', '#6366f1', 150, 'first_module'),
('Simulator Pro', 'Completed the full election simulation', 'gamepad', '#3b82f6', 300, 'simulator_complete'),
('Truth Seeker', 'Used fake news checker 5 times', 'search', '#ef4444', 200, 'fakechecker_5'),
('First Voter', 'Made the voting pledge', 'vote', '#ec4899', 100, 'pledge_created'),
('7-Day Streak', 'Logged in 7 days in a row', 'flame', '#f97316', 250, 'streak_7'),
('Community Voice', 'Shared pledge on social media', 'megaphone', '#8b5cf6', 150, 'pledge_shared'),
('Quiz Master', 'Scored 100% on any quiz', 'trophy', '#f59e0b', 200, 'quiz_perfect'),
('Civic Champion', 'Completed all 8 learning modules', 'award', '#22c55e', 500, 'all_modules');
