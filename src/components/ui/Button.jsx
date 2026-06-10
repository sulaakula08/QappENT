export default function Button({ children, variant = 'primary', size = 'md', className = '', onClick, ...props }) {
  const base = 'inline-flex items-center justify-center font-medium transition-all duration-200'
  const variants = {
    primary: 'bg-qapp-blue text-white hover:bg-qapp-blue-dark hover:shadow-md active:scale-[0.98]',
    secondary: 'bg-white text-qapp-dark border border-gray-200 hover:border-qapp-blue/40 hover:bg-gray-50',
    ghost: 'text-qapp-gray hover:text-qapp-dark hover:bg-gray-50',
    outline: 'border border-qapp-blue text-qapp-blue hover:bg-qapp-blue-light',
    pill: 'bg-qapp-blue text-white hover:bg-qapp-blue-dark',
  }
  const sizes = {
    sm: 'px-4 py-1.5 text-sm rounded-lg',
    md: 'px-5 py-2.5 text-sm rounded-xl',
    lg: 'px-8 py-3 text-base rounded-xl',
  }
  const pillSizes = {
    sm: 'px-4 py-1.5 text-xs rounded-full',
    md: 'px-5 py-2 text-sm rounded-full',
    lg: 'px-6 py-2.5 text-sm rounded-full',
  }

  const sizeClass = variant === 'pill' ? pillSizes[size] : sizes[size]

  return (
    <button
      className={`${base} ${variants[variant]} ${sizeClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
