export default function Logo({ size = 36 }) {
  return (
    <div
      className="rounded-full bg-qapp-blue flex items-center justify-center shadow-sm transition-transform hover:scale-105"
      style={{ width: size, height: size }}
    >
      <span
        className="text-white font-extrabold leading-none select-none"
        style={{ fontSize: size * 0.52, fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        Q
      </span>
    </div>
  )
}
