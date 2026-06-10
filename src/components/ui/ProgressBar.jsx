export default function ProgressBar({ value, max = 100, color = 'blue', size = 'md', showLabel = false }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  const colors = {
    blue: 'bg-qapp-blue',
    green: 'bg-green-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
  }
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-3' }

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs text-qapp-gray mb-1">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`${heights[size]} ${colors[color]} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
