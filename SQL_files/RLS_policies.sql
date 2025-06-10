-- users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users
  FOR UPDATE
  USING (auth.uid() = id);


-- reservations

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students and tutors can view their reservations"
  ON reservations
  FOR SELECT
  USING (
    auth.uid() = student_id OR auth.uid() = tutor_id);

CREATE POLICY "Students can insert their own reservation"
  ON reservations
  FOR INSERT
  WITH CHECK (
    auth.uid() = student_id OR auth.uid() = tutor_id);

CREATE POLICY "Only tutors can update reservations"
  ON reservations
  FOR UPDATE
  USING (auth.uid() = tutor_id);


--tickets
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own tickets and tutors can view tickets of students assigned to them"
  ON tickets
  FOR SELECT
  USING (
    auth.uid() = student_id OR
    auth.uid() IN (
      SELECT users.tutor_id
      FROM users
      WHERE users.id = tickets.student_id
    )
  );

--ticket_types
ALTER TABLE ticket_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tutors can view their ticket types"
  ON ticket_types
  FOR SELECT USING (auth.uid() = tutor_id);

CREATE POLICY "Tutors can create their ticket types"
  ON ticket_types
  FOR INSERT WITH CHECK (auth.uid() = tutor_id);

CREATE POLICY "Tutors can update their ticket types"
  ON ticket_types
  FOR UPDATE USING (auth.uid() = tutor_id)
  WITH CHECK (auth.uid() = tutor_id);


--availabilities
ALTER TABLE availabilities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tutors can view their availability"
  ON availabilities
  FOR SELECT USING (auth.uid() = tutor_id);

CREATE POLICY "Tutors can insert their availability"
  ON availabilities
  FOR INSERT WITH CHECK (auth.uid() = tutor_id);

CREATE POLICY "Tutors can update their availability"
  ON availabilities
  FOR UPDATE USING(auth.uid() = tutor_id)
  WITH CHECK (auth.uid() = tutor_id);
