
import { stripeSupportedCurrencies } from '@/utils/stripeSupportedCurrencies'
import { useState } from 'react'

type CurrenciesSelectProps = {
  value: string,
  onChange: (value: string) => void  
}

export default function CurrenciesSelects({ value, onChange }: CurrenciesSelectProps) {
  const [currency, setCurrency] = useState(value)

  return (
    <div className='mb-4'>
      <label htmlFor="currency" className="text-start block mb-1 font-medium">Currency</label>
      <select
        value={currency}
        onChange={(e) => {
          setCurrency(e.target.value)
          onChange(e.target.value)
        }}
        className="w-full border rounded px-3 py-2"
      >
        {stripeSupportedCurrencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  )
}
