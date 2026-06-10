import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-100 rounded-xl overflow-hidden bg-white">
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            <span className="font-medium text-qapp-dark text-sm sm:text-base">{item.title}</span>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${open === i ? 'rotate-180' : ''}`} />
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-sm text-qapp-gray border-t border-gray-50">
              <ul className="mt-3 space-y-2">
                {item.items.map((sub, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-qapp-blue mt-2 shrink-0" />
                    {sub}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
