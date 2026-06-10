export default function MiniChart({ data, height = 120 }) {
  const max = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className="flex items-end gap-2 sm:gap-3" style={{ height }}>
      {data.map((item) => (
        <div key={item.label} className="flex-1 flex flex-col items-center gap-1.5">
          <span className="text-xs font-semibold text-qapp-dark">{item.value}%</span>
          <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: height - 36 }}>
            <div
              className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-500 ${item.color || 'bg-qapp-blue'}`}
              style={{ height: `${(item.value / max) * 100}%` }}
            />
          </div>
          <span className="text-[10px] sm:text-xs text-qapp-gray text-center leading-tight">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
