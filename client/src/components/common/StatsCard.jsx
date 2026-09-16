function StatsCard({ title, value, icon, color = 'red', subtitle }) {
  const colorClasses = {
    red: 'from-red-500 to-red-600',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    purple: 'from-purple-500 to-purple-600',
    indigo: 'from-indigo-500 to-indigo-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800 truncate">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1 truncate">{subtitle}</p>
          )}
        </div>
        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
            colorClasses[color] || colorClasses.red
          } flex items-center justify-center text-white text-2xl shadow-md transition-transform duration-300 group-hover:scale-110 flex-shrink-0`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatsCard;