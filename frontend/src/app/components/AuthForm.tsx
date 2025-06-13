'use client'
import { useState } from 'react'

type AuthFormProps = {
  title: string
  buttonLabel: string
  onSubmit: (email: string, password: string) => Promise<void>
  error?: string
  GoogleButton?: React.ReactNode
}

export default function AuthForm({
  title,
  buttonLabel,
  onSubmit,
  error,
  GoogleButton,
}: AuthFormProps) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await onSubmit(form.email, form.password)
    setSubmitting(false)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">{title}</h1>
      <div className="border border-gray-300 p-8 rounded shadow-lg bg-white w-full max-w-md">
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border bg-gray-100 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 border bg-gray-100 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={submitting}
          >
            {buttonLabel}
          </button>
        </form>
        {GoogleButton && (
          <>
            <div className="text-center my-4 text-gray-500">OR</div>
            {GoogleButton}
          </>
        )}
      </div>
    </div>
  )
}