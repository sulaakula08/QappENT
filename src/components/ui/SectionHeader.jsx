import Highlight from './Highlight'

export default function SectionHeader({ title, subtitle, step, id, highlight }) {
  return (
    <div id={id} className="mb-10 sm:mb-12 scroll-mt-24">
      {step && (
        <span className="text-4xl sm:text-5xl font-bold text-qapp-blue leading-none block mb-3 animate-fade-in">
          {step}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-bold text-qapp-dark tracking-tight leading-tight">
        {highlight ? (
          <>
            {title.split(highlight)[0]}
            <Highlight>{highlight}</Highlight>
            {title.split(highlight)[1]}
          </>
        ) : title}
      </h2>
      {subtitle && (
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-qapp-gray leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
