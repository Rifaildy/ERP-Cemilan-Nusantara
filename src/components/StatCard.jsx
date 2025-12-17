const StatCard = ({ title, value, sub, color, icon: Icon, trend }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
    indigo: "bg-indigo-50 text-indigo-600",
    purple: "bg-purple-50 text-purple-600",
    yellow: "bg-yellow-50 text-yellow-600",
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        {sub && (
          <p
            className={`text-xs mt-2 font-medium ${
              trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-400"
            }`}
          >
            {sub}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${colors[color] || colors.blue}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  )
}

export default StatCard
