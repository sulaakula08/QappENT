export default function StatusTimeline({ items }) {
  return (
    <div className="space-y-0">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3 relative">
          {i < items.length - 1 && (
            <div
              className={`absolute left-[7px] top-5 w-0.5 h-[calc(100%-4px)] ${
                item.state === 'done' ? 'bg-qapp-blue' : 'bg-gray-200'
              }`}
            />
          )}
          <div className="relative z-10 mt-1 shrink-0">
            {item.state === 'done' && (
              <div className="w-4 h-4 rounded-full bg-qapp-blue" />
            )}
            {item.state === 'current' && (
              <div className="w-4 h-4 rounded-full border-2 border-qapp-blue bg-white" />
            )}
            {item.state === 'pending' && (
              <div className="w-4 h-4 rounded-full border-2 border-gray-200 bg-white" />
            )}
          </div>
          <div className={`flex-1 flex items-center justify-between pb-5 ${item.state === 'pending' ? 'opacity-50' : ''}`}>
            <span className={`text-sm ${item.state === 'pending' ? 'text-qapp-gray' : 'text-qapp-dark font-medium'}`}>
              {item.label}
            </span>
            <span className={`text-sm ${item.state === 'current' ? 'text-qapp-blue font-medium' : 'text-qapp-gray'}`}>
              {item.date}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
