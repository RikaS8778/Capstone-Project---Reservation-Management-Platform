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
    bookingUnit: '',
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
      <div className="mb-4">
        <label htmlFor="publicId" className="text-start block mb-1 font-medium">Public ID</label>
        <input
          id="publicId"
          name="publicId"
          value={publicId}
          placeholder='e.g. talk-badies'
          onChange={e => setPublicId(e.target.value)}
          required
          className="p-2 border rounded w-full"
        />
        <p className="text-xs text-gray-500 mb-1 text-start mt-1.5">
          * Please enter a class identifier that is easy for your students to recognize.  
        </p>
      </div>

      <div className="mb-4">
        <label htmlFor="bookingDeadline" className="block mb-1 font-medium text-start">Booking Deadline (days)</label>
        <input
          id="bookingDeadline"
          name="bookingDeadline"
          type="number"
          value={bookingDeadline}
          onChange={e => setBookingDeadline(parseInt(e.target.value))}
          required
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="bookingUnit" className="text-start block mb-1 font-medium">Booking Unit (min)</label>
        <select
          id="bookingUnit"
          name="bookingUnit"
          value={bookingUnit}
          onChange={(e) => setBookingUnit(parseInt(e.target.value))}
          required
          className="p-2 border rounded w-full"
        >
          <option value={15}>15 minutes</option>
          <option value={30}>30 minutes</option>
          <option value={60}>60 minutes</option>
        </select>
        <p className="text-xs text-gray-500 mb-1 text-start mt-1.5">
          * This controls how lesson slots are shown. Picking 15 means students can book at 1:00, 1:15, 1:30, and so on.
        </p>
      </div>
      

      <CurrenciesSelects
        value={currency}
        onChange={(c) => setCurrency(c)}
      />

      {/* <div className="mb-4">
        <label htmlFor="picturePath" className="text-start block mb-1 font-medium">Picture Path (optional)</label>
        <input
          id="picturePath"
          name="picturePath"
          value={picturePath}
          onChange={e => setPicturePath(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div> */}
    </>
  )
}