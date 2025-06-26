'use client'

import { useFormContext } from 'react-hook-form'
import TimezoneSelect from './TimezoneSelect'

export default function UserProfileFieldForm() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext()

  const timezone = watch('timezone')

  return (
    <>
      <div className="mb-4">
        <label htmlFor="first_name" className="block font-medium text-start mb-1">
          First Name
        </label>
        <input
          id="first_name"
          {...register('first_name', {
            required: 'First name is required',
            pattern: {
              value: /^[A-Za-z]+$/,
              message: 'Only alphabet characters are allowed',
            },
          })}
          className="p-2 border rounded w-full"
        />
        {errors.first_name && (
          <p className="text-red-600 text-sm mt-1">{errors.first_name.message as string}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="last_name" className="block font-medium text-start mb-1">
          Last Name
        </label>
        <input
          id="last_name"
          {...register('last_name', {
            required: 'Last name is required',
            pattern: {
              value: /^[A-Za-z]+$/,
              message: 'Only alphabet characters are allowed',
            },
          })}
          className="p-2 border rounded w-full"
        />
        {errors.last_name && (
          <p className="text-red-600 text-sm mt-1">{errors.last_name.message as string}</p>
        )}
      </div>

      <div className="mb-4">
        <TimezoneSelect
          value={timezone}
          onChange={(tz) => setValue('timezone', tz)}
        />
        {errors.timezone && (
          <p className="text-red-600 text-sm mt-1">{errors.timezone.message as string}</p>
        )}
      </div>
    </>
  )
}
