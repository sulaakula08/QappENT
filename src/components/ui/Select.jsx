import { ChevronDown } from 'lucide-react'

export default function Select({ label, value, onChange, options, placeholder = 'Выберите...' }) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-qapp-dark mb-1.5">{label}</label>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-qapp-dark focus:outline-none focus:ring-2 focus:ring-qapp-blue/20 focus:border-qapp-blue transition-colors"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  )
}
