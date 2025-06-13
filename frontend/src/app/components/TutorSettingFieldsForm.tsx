import React, { useState } from 'react'
import CurrenciesSelects from './CurrenciesSelect'

export type TutorSettingsFieldsProps = {
  values?: {
    publicId: string
    bookingDeadline: number
    bookingUnit: number
    currency: string
    picturePath?: string
  }
}

export default function TutorSettingsFields({ values }: TutorSettingsFieldsProps) {
  const _values = values ?? {
    publicId: '', 
    bookingDeadline: 1,
    bookingUnit: 30,
    currency: 'CAD',
    picturePath: ''
  }
  const [publicId, setPublicId] = useState(_values.publicId)
  const [bookingDeadline, setBookingDeadline] = useState(_values.bookingDeadline)
  const [bookingUnit, setBookingUnit] = useState(_values.bookingUnit)
  const [currency, setCurrency] = useState(_values.currency)
  const [picturePath, setPicturePath] = useState(_values.picturePath || '')
  return (
    <>
      <input
        name="publicId"
        placeholder="Public ID"
        value={publicId}
        onChange={e => setPublicId(e.target.value)}
        required
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        name="bookingDeadline"
        type="number"
        placeholder="Booking Deadline (days)"
        value={bookingDeadline}
        onChange={e => setBookingDeadline(parseInt(e.target.value))}
        required
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        name="bookingUnit"
        type="number"
        placeholder="Booking Unit (min)"
        value={bookingUnit}
        onChange={e => setBookingUnit(parseInt(e.target.value))}
        required
        className="mb-2 p-2 border rounded w-full"
      />
      <CurrenciesSelects value={currency} onChange={(c) => setCurrency(c)} />
      <input
        name="picturePath"
        placeholder="Picture Path (optional)"
        value={picturePath}
        onChange={e => setPicturePath(e.target.value)}
        className="mb-2 p-2 border rounded w-full"
      />
    </>
  )
}