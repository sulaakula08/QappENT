export default function Card({ children, className = '', hover = false, padding = 'p-6' }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 transition-all duration-300 ${
        hover ? 'hover:border-qapp-blue/30 hover:shadow-card-hover hover:-translate-y-0.5' : ''
      } ${padding} ${className}`}
    >
      {children}
    </div>
  )
}
