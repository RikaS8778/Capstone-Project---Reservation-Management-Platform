# Capstone-Project---Reservation-Management-Platform

This app supports lesson reservation &amp; ticket management for tutors with small business.

1. Project Title:  
   Schedulia – Ticket-Based Lesson Booking & Payment Platform

2. Problem Statement:  
   Independent tutors often rely on manual communication through email or chat apps to schedule lessons and accept payments. This process is time-consuming, error-prone, and lacks centralized management. There's a need for a simple platform that allows tutors to manage bookings and payments in one place, while giving students an easy way to purchase tickets and reserve sessions.

3. Overview of the Application’s Functionality:  
   Schedulia is a web-based platform that enables individual tutors to manage online or in-person lesson schedules and accept payments through a ticket-based system. Tutors can register available time slots and create one-time or monthly ticket plans. Each plan generates a unique URL that tutors share with students. Students can use this link to sign up, purchase a ticket, and immediately book a lesson. All reservations are automatically confirmed, and tutors can cancel or reschedule as needed. The platform includes a student dashboard to view tickets and reservations, and a tutor dashboard for managing availability, bookings, and ticket plans.

4. Technology Stack:

   - Frontend: Next.js, TypeScript, Tailwind CSS ( API routes + Supabase SDK , easily retrieve data from front end)
   - Authentication & Database: Supabase(PostgreSQL)
   - Backend (for payment): Express.js (Node.js on Render)

   * If doesn’t have much time, I’ll use Next.js API Routes instead of Express.js.

   - Payment API: Stripe (Connect Standard)
   - Hosting: Vercel (Frontend), Render (Webhook API)

5. Features to be Implemented:  
   **Core Features**

   - Tutor registration via invitation token
   - Stripe Connect onboarding for tutors
   - Create ticket plans (one-time / monthly)
   - Shareable ticket purchase links
   - Supabase Auth (student and tutor roles)
   - Student login and ticket purchase via Stripe Checkout
   - Tutor calendar and available time slot registration
   - Student can book lessons immediately after ticket purchase
   - Booking rules based on tutor's timezone and advance restriction
   - Reservation overview (student/tutor dashboards)

   **Additional Features (if time allows)**

   - Email or in-app notifications ( Or Slack / Discord integration )
   - Expired ticket override for tutors
   - Past ticket history with filter
   - Contact form integration (Google Forms)

   **■Features by Role■**

   **Tutor Features:**

   - Sign up via invitation link (one-time token)
   - Connect a Stripe Standard account for direct payments
   - Create ticket plans (one-time or monthly)
   - Set price, duration, recurrence (for monthly)
   - Generate reusable purchase URLs for each plan
   - Register available lesson slots (date + time range)
   - Set minimum number of days before booking (advance notice rule)
   - View and manage student reservations
   - Cancel or reschedule if needed
   - Override expired monthly tickets when booking manually

   **Student Features:**

   - Sign up via plan-specific link from tutor
   - Login via Supabase Auth
   - Purchase tickets through Stripe Checkout (login required)
   - View ticket history (active, used, expired)
   - Browse available time slots from the tutor
   - Only valid times are shown (based on ticket duration and notice rules)
   - Book a lesson directly from available slots (no approval step)
   - See list of confirmed upcoming reservations

   **Shared Features (Common Modules):**

   - Supabase Auth for login and role-based access control
   - Role-based dashboard layout (tutor vs student)
   - Token-based URL logic (for registration and ticket purchase)
   - Timezone-aware date handling (tutor’s timezone used for booking logic)
   - Automatic ticket issuance after payment (via Stripe webhook)
   - Booking immediately confirmed when student selects a time
   - Logout, profile update, and session management
   - Responsive layout with Tailwind CSS
   - Stripe Connect setup and payment tracking
   - (Optional) Contact form via Google Forms

6. User Stories:

   - As a tutor, I want to create ticket plans so that I can offer flexible lesson options to students.
   - As a student, I want to purchase a ticket via a link so that I can quickly book lessons without account setup complexity.
   - As a tutor, I want to define available time slots and booking rules so that I can control my teaching schedule.
   - As a student, I want to see only valid booking slots so that I don’t accidentally book invalid dates.
   - As an admin, I want to manually create invitation tokens so that I can control who registers as a tutor.

7. High-level architecture diagram  
   ![image](https://github.com/user-attachments/assets/f26571b0-9d11-4d1f-8c2d-1383fab9b08c)

8. ERD  
   ![image](https://github.com/user-attachments/assets/7073144c-362d-4e55-8d40-13f8f925e8ee)
