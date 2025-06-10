ALTER TABLE users
ADD COLUMN tutor_id uuid REFERENCES users(id);
COMMENT ON COLUMN users.tutor_id IS 'If role = 2 (student), this stores the assigned tutor_id';
