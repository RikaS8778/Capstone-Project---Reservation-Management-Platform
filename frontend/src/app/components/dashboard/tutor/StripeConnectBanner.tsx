'use client'

import { useState } from 'react'

export default function StripeConnectBanner() {
  const [isLoading, setIsLoading] = useState(false)

  // Handles the click event to create a Stripe Connect link
  const handleConnectClick = async () => {
    setIsLoading(true)
    try {
      // Send request to backend to generate the onboarding URL
      const res = await fetch('/api/stripe/create-link', {
        method: 'POST',
      })

      const data = await res.json()

      if (data.url) {
        // Redirect to Stripe onboarding URL
        window.location.href = data.url
      } else {
        alert('Failed to generate Stripe link.')
      }
    } catch (err) {
      console.error(err)
      alert('An error occurred while generating the Stripe link.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-yellow-100 border border-yellow-300 p-4 rounded text-sm mb-6">
      <p className="text-yellow-800 mb-2">
        Stripe Connect is not completed. Please connect your account to receive payments.
      </p>
      <button
        onClick={handleConnectClick}
        disabled={isLoading}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        {isLoading ? 'Redirecting...' : 'Connect Stripe'}
      </button>
    </div>
  )
}
