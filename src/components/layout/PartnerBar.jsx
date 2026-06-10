import { PARTNER_LOGOS } from '../../data/mockData'

export default function PartnerBar() {
  return (
    <div className="border-b border-gray-50 bg-white">
      <div className="container-qapp py-6 sm:py-8">
        <div className="flex items-center justify-center gap-8 sm:gap-12 lg:gap-16 flex-wrap opacity-70">
          {PARTNER_LOGOS.map((logo) => (
            <div key={logo} className="flex items-center justify-center">
              <span className="text-lg sm:text-xl font-bold text-gray-400 tracking-wide">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
