import { timeZonesNames } from '@vvo/tzdb'
import { useState } from 'react'

type TimezoneSelectProps = {
  value: string,
  onChange: (value: string) => void  
}

export default function TimezoneSelect({ value, onChange }: TimezoneSelectProps) {
  const [timezone, setTimezone] = useState(value)

  return (
    <div>
      <label className="block mb-1 text-sm font-medium">Timezone</label>
      <select
        value={timezone}
        onChange={(e) => {
          setTimezone(e.target.value)
          onChange(e.target.value)
        }}
        className="w-full border rounded px-3 py-2"
      >
        {timeZonesNames.map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>
    </div>
  )
}
