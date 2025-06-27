// app/api/stripe/create-link/route.ts

import { NextResponse } from 'next/server'

// This is a mock API route for Stripe Connect onboarding.
// Replace this with real Stripe integration when you're ready.

export async function POST() {
  // Simulate a short delay (optional)
  await new Promise((resolve) => setTimeout(resolve, 500))

  // TODO: Replace with real Stripe Connect logic when ready:
  /*
    1. Install Stripe SDK:
       npm install stripe

    2. Add your Stripe Secret Key to .env.local:
       STRIPE_SECRET_KEY=sk_test_xxx

    3. Initialize Stripe and generate onboarding link:
       import Stripe from 'stripe'
       const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' })

       const accountLink = await stripe.accountLinks.create({
         account: stripe_account_id, // Get this from Supabase
         refresh_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/dashboard`,
         return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/dashboard`,
         type: 'account_onboarding',
       })

       return NextResponse.json({ url: accountLink.url })
  */

  // Return a dummy onboarding URL for development/testing
  return NextResponse.json({
    url: 'https://dashboard.stripe.com/test/connect/onboarding/mock-link',
  })
}
