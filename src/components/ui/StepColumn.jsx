export default function StepColumn({ step, title, description, children }) {
  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-4xl sm:text-5xl font-bold text-qapp-blue leading-none tracking-tight">
            {step}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-qapp-dark leading-tight">{title}</h3>
        </div>
        <p className="text-sm sm:text-[15px] text-qapp-gray leading-relaxed">{description}</p>
      </div>
      {children}
    </div>
  )
}
