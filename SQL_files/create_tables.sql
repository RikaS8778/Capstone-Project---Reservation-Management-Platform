-- CREATE TABLE t1 (
--   a integer PRIMARY KEY,
--   b integer,
--   c integer,
--   FOREIGN KEY (b, c) REFERENCES other_table (c1, c2)
-- );

-- CREATE TABLE products (
--     product_no integer PRIMARY KEY,
--     name text,
--     price numeric
-- );

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text,
  last_name text,
  email text NOT NULL UNIQUE,
  role integer NOT NULL,
  time_zone text,
  tutor_id uuid REFERENCES users(id),
  reated_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz,
  is_deleted boolean DEFAULT false
);
COMMENT ON TABLE users IS 'Registered users including tutors and students';
COMMENT ON COLUMN users.role IS '1: tutor, 2: student';
COMMENT ON COLUMN users.tutor_id IS 'If role = 2 (student), tutor_id is MUST';

CREATE TABLE tutor_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id uuid NOT NULL REFERENCES users(id),
  picture_path text,
  public_id VARCHAR(50) UNIQUE NOT NULL,
  booking_deadline integer NOT NULL,
  booking_unit integer NOT NULL DEFAULT 30,
  currency VARCHAR(3) NOT NULL,
  stripe_account_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz,
  is_deleted boolean DEFAULT false
);
COMMENT ON COLUMN tutor_settings.public_id IS 'Unique public identifier used to define the tutor''s class page or signup route.';

CREATE TABLE availabilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id uuid NOT NULL REFERENCES users(id),
  available_from timestamptz NOT NULL,
  available_to timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz,
  is_deleted boolean DEFAULT false
);

CREATE TABLE ticket_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id uuid NOT NULL REFERENCES users(id),
  type integer NOT NULL,
  quantities integer NOT NULL DEFAULT 1,
  price money NOT NULL,
  lesson_duration integer NOT NULL,
  visibility integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz,
  is_deleted boolean DEFAULT false
);
COMMENT ON COLUMN ticket_types.type IS '1: one-time, 2: monthly';
COMMENT ON COLUMN ticket_types.visibility IS '1: public, 2: private';

CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id text NOT NULL,
  ticket_type_id uuid NOT NULL REFERENCES ticket_types(id),
  student_id uuid NOT NULL REFERENCES users(id),
  amount numeric(10, 2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  status integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
COMMENT ON COLUMN payments.status IS '1: succeeded, 2: failed';

CREATE TABLE ticket_type_visible_students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_type_id uuid NOT NULL REFERENCES ticket_types(id),
  student_id uuid NOT NULL REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz,
  is_deleted boolean DEFAULT false
);

CREATE TABLE tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES users(id),
  ticket_type_id  uuid NOT NULL REFERENCES ticket_types(id),
  payment_id uuid REFERENCES payments(id),
  expire_at date NOT NULL,
  is_used boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz,
  is_deleted boolean DEFAULT false
);

CREATE TABLE reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id uuid NOT NULL REFERENCES users(id),
  student_id uuid NOT NULL REFERENCES users(id),
  start_at timestamptz NOT NULL,
  end_at timestamptz NOT NULL,
  ticket_id uuid DEFAULT NULL REFERENCES tickets(id),
  status integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz,
  is_deleted boolean DEFAULT false
);
COMMENT ON COLUMN reservations.status IS '1: confirmed, 2: canceled, 3: rescheduled';

CREATE TABLE tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token text UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
  email text,
  expires_at timestamptz,
  used_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);