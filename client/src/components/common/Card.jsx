function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${
        hover ? 'card-hover' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;