'use client'

import { useFormContext } from 'react-hook-form'
import { useState } from 'react'
import CurrenciesSelect from './CurrenciesSelect'

export default function TutorSettingFieldsForm() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext()
  const [file, setFile] = useState<File | null>(null)

  const currency = watch('currency')

  return (
    <>
      <div className="mb-4">
        <label htmlFor="publicId" className="text-start block mb-1 font-medium">Public ID</label>
        <input
          id="publicId"
          {...register('publicId', {
            required: 'Public ID is required',
            pattern: {
              value: /^[a-z0-9-]+$/,
              message: 'Only lowercase letters, numbers, and hyphens are allowed',
            },
          })}
          placeholder="e.g. talk-badies"
          className="p-2 border rounded w-full"
        />
        <p className="text-xs text-gray-500 mb-1 text-start mt-1.5">
          * Please enter a class identifier that is easy for your students to recognize. <br />
          &nbsp;&nbsp; It should contain only lowercase letters, numbers, and hyphens.
        </p>
        {errors.publicId && (
          <p className="text-red-600 text-sm mt-1">{errors.publicId.message as string}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="bookingDeadline" className="block mb-1 font-medium text-start">Booking Deadline (days)</label>
        <input
          id="bookingDeadline"
          type="number"
          {...register('bookingDeadline', {
            required: 'Booking deadline is required',
            min: { value: 0, message: 'Booking deadline must be 0 or more' },
          })}
          className="p-2 border rounded w-full"
        />
        <p className="text-xs text-gray-500 mb-1 text-start mt-1.5">
          * This controls how many days in advance students can book a lesson.<br />
          &nbsp;&nbsp; If you set it to 3, students can book lessons up to 3 days in advance.
        </p>
        {errors.bookingDeadline && (
          <p className="text-red-600 text-sm mt-1">{errors.bookingDeadline.message as string}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="bookingUnit" className="text-start block mb-1 font-medium">Booking Unit (min)</label>
        <select
          id="bookingUnit"
          {...register('bookingUnit', { required: 'Booking unit is required' })}
          className="p-2 border rounded w-full"
        >
          <option value={15}>15 minutes</option>
          <option value={30}>30 minutes</option>
          <option value={60}>60 minutes</option>
        </select>
        <p className="text-xs text-gray-500 mb-1 text-start mt-1.5">
          * This controls how lesson slots are shown.<br />
          &nbsp;&nbsp;Picking 15 means students can book at 1:00, 1:15, 1:30, and so on.
        </p>
        {errors.bookingUnit && (
          <p className="text-red-600 text-sm mt-1">{errors.bookingUnit.message as string}</p>
        )}
      </div>

      <CurrenciesSelect
        value={currency}
        onChange={(c) => setValue('currency', c)}
      />

      <div className="mb-4">
        <label htmlFor="discription" className="block mb-1 font-medium text-start">Message</label>
        <textarea
          id="discription"
          placeholder='e.g. Hello, I am a tutor and I can help you with your studies. We discuss about the articles, books, and other materials that you need to study.'
          {...register('discription', {
            required: 'Description is required',
          })}
          className="p-2 border rounded w-full h-32"
        />
        <p className="text-xs text-gray-500 mb-1 text-start mt-1.5">
          * It will be displayed on student&apos;s dashboard.
        </p>
        {errors.discription && (
          <p className="text-red-600 text-sm mt-1">{errors.discription.message as string}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="text-start block mb-1 font-medium">Picture (optional)</label>
        <p className="text-xs text-gray-500 mb-1 text-start mt-1.5">
          * You can upload a profile picture here. It will be displayed on student&apos;s dashboard.
        </p>

        <label className="block w-2/6 mx-auto px-4 py-2 bg-gray-200 text-gray-800 text-center rounded hover:bg-gray-300 transition mt-4 mb-2">
          {file ? '✔ File Selected' : 'Choose a File'}
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              if (file) {
                setValue('file', file); 
                setFile(file);          
              }
            }}
            className="hidden"
          />
        </label>

        {file && (
          <p className="mt-1 text-sm text-gray-600">
            Selected: {file.name}
          </p>
        )}
      </div>
    </>
  )
}
