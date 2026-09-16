function EmptyState({ icon, title, description, action }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center scale-in">
      {icon && (
        <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl text-gray-400">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
      )}
      {action}
    </div>
  );
}

export default EmptyState;