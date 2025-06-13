import React, { useState } from 'react'
import TimezoneSelect from './TimezoneSelect'

export type UserProfileFieldsProps = {
  values?: {
    firstName: string
    lastName: string
    timeZone: string
  }
}

export default function UserProfileFields({ values }: UserProfileFieldsProps) {
  const values_ = values ?? { firstName: '', lastName: '', timeZone: '' }
  const [firstName, setFirstName] = useState(values_.firstName)
  const [lastName, setLastName] = useState(values_.lastName)
  const [timezone, setTimeZone] = useState(
      values_.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone
    )
  return (
    
    <>
      <input
        name="firstName"
        placeholder="First Name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        required
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        name="lastName"
        placeholder="Last Name"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        required
        className="mb-2 p-2 border rounded w-full"
      />
      <TimezoneSelect value={timezone} onChange={(tz) => setTimeZone(tz)} />
    </>
  )
}