export default function InputField({ label, type = 'text', value, onChange, min, max, suffix, className = '' }) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-qapp-dark mb-1.5">{label}</label>}
      <div className="relative">
        <input
          type={type}
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-qapp-dark focus:outline-none focus:ring-2 focus:ring-qapp-blue/20 focus:border-qapp-blue transition-colors"
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-qapp-gray">{suffix}</span>
        )}
      </div>
    </div>
  )
}
