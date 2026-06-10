export default function Highlight({ children, variant = 'blue', className = '' }) {
  const variants = {
    blue: 'bg-qapp-blue-light text-qapp-blue',
    amber: 'bg-amber-100 text-amber-700',
    green: 'bg-green-100 text-green-700',
  }

  return (
    <span className={`px-1.5 py-0.5 rounded-md font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
