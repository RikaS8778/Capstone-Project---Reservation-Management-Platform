ALTER TABLE users
ADD COLUMN tutor_id uuid REFERENCES users(id);

COMMENT ON COLUMN users.tutor_id IS 'If role = 2 (student), this stores the assigned tutor_id';


ALTER TABLE tutor_settings
ADD COLUMN public_id VARCHAR(50) UNIQUE NOT NULL;

COMMENT ON COLUMN tutor_settings.public_id IS 'Unique public identifier used to define the tutor''s class page or signup route.';


ALTER TABLE tokens
ALTER COLUMN token SET DEFAULT encode(gen_random_bytes(16), 'hex');

ALTER TABLE tokens
ALTER COLUMN email DROP NOT NULL;


ALTER TABLE users
ALTER COLUMN first_name DROP NOT NULL,
ALTER COLUMN last_name DROP NOT NULL,
ALTER COLUMN time_zone DROP NOT NULL,
ALTER COLUMN time_zone DROP DEFAULT;



-- Have to update create tabeles with the following changes: starting from here
ALTER TABLE tutor_settings ADD COLUMN message text;
COMMENT ON COLUMN tutor_settings.message IS 'A short self-intro or instructions from tutor';

ALTER TABLE ticket_types ADD COLUMN name text;
COMMENT ON COLUMN ticket_types.name IS 'Optional name for tutor to identify the ticket plan';
-- Have to update create tabeles with the following changes: end  


ALTER TABLE tutor_settings
ADD COLUMN stripe_onboarding_completed boolean DEFAULT false,
ADD COLUMN stripe_verified_at timestamptz;
