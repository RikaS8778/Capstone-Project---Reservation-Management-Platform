// app/(auth)/(tutor)/dashboard/ticket-types/form.tsx
'use client'

import { useState } from 'react'
import { createTicketType } from './actions'
import { useRouter } from 'next/navigation'
import { FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'


export default function TicketTypeForm() {
  const [form, setForm] = useState(
    { name: '', 
      type: '1', // 1: one-time, 2: monthly
      quantities: '1',
      price: '',
      lesson_duration: '60', // in minutes
      visibility: '1' // 1: public, 2: private
    })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const router = useRouter()
  const [quantitiesIsDisabled, setQuantitiesIsDisabled] = useState(true)
  const defaultClassNameForQuantities = 'w-full p-2 border mt-1 bg-gray-100'
  const [ClassNameForQuantities, setClassNameForQuantities] = useState(defaultClassNameForQuantities)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await createTicketType(form)
    if (result?.success === false) {
      setErrors(result.errors)
    } else {
      router.push('/tutor/dashboard/ticket-types')
    }
  }

  const quantitiesControl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    let _quantities = form.quantities 
    if(value === '2') {
        setQuantitiesIsDisabled(false)
        setClassNameForQuantities('w-full p-2 border mt-1')
    } else if (value === '1') {
        setQuantitiesIsDisabled(true)
        setClassNameForQuantities(defaultClassNameForQuantities)
        _quantities = '1'; // reset quantities to 1 if one-time
    }
    setForm({ ...form, type: e.target.value, quantities: _quantities })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormLabel>Ticket Name</FormLabel>
      <input
        name="name"
        placeholder="e.g., Basic class 60"
        required
        className="w-full p-2 border mt-1"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      {errors?.name && <p className="text-sm text-red-500">{errors.name[0]}</p>}
      <FormLabel>Ticket Type</FormLabel>
      <RadioGroup
        className="w-full gap-4"
        row
        name="type"
        value={form.type}
        onChange={quantitiesControl}
      >
        <FormControlLabel value='1' control={<Radio />} label="One Time" />
        <FormControlLabel value='2' control={<Radio />} label="Monthly" />
      </RadioGroup>
      {errors?.type && <p className="text-sm text-red-500">{errors.type[0]}</p>}
      <FormLabel>Quantities</FormLabel>
      <input
        name="quantities"
        type="number"
        placeholder="Quantities (if you chose monthly, it will be the number of lessons per month)"
        min="1"
        required
        disabled={quantitiesIsDisabled}
        className={ClassNameForQuantities}
        value={form.quantities}
        onChange={(e) => setForm({ ...form, quantities: e.target.value })}
      />
      {errors?.quantities && <p className="text-sm text-red-500">{errors.quantities[0]}</p>}
      <FormLabel>Price (per ticket type)</FormLabel>
      <input
        name="price"
        type="number"
        placeholder="Set Price (in your currency)"
        min="0"
        required
        className="w-full p-2 border mt-1"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      {errors?.price && <p className="text-sm text-red-500">{errors.price[0]}</p>}
      <FormLabel>Lesson Duration (per lesson) </FormLabel>
      <input
        name="lesson_duration"
        type="number"
        placeholder="Lesson Duration(minutes)"
        required
        className="w-full p-2 border"
        value={form.lesson_duration}
        onChange={(e) => setForm({ ...form, lesson_duration: e.target.value })}
      />
      {errors?.lesson_duration && <p className="text-sm text-red-500">{errors.lesson_duration[0]}</p>}
      <FormLabel>Visibility</FormLabel>
      <RadioGroup
        className="w-full"
        row
        name="visibility"
        value={form.visibility}
        onChange={(e) => setForm({ ...form, visibility: e.target.value })}
      >
        <FormControlLabel value='1' control={<Radio />} label="Public" />
        <FormControlLabel value="2" control={<Radio />} label="Private" />
      </RadioGroup>
      {errors?.visibility && <p className="text-sm text-red-500">{errors.visibility[0]}</p>}
      <button type="submit" className="w-full bg-blue-500 text-white p-2">
        Create
      </button>
    </form>
  )
}
