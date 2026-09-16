function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  fullWidth = false,
}) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

  const variants = {
    primary:
      'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:-translate-y-0.5 hover:shadow-red-500/30',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    outline: 'border-2 border-red-500 text-red-600 hover:bg-red-50',
    ghost: 'text-gray-600 hover:bg-gray-100',
    danger:
      'bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-lg hover:-translate-y-0.5',
    success:
      'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg hover:-translate-y-0.5',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;