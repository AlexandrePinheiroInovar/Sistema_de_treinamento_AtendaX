import React from 'react';

export const BarChart = ({ data, title, className = "" }) => {
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className={`p-4 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-20 text-sm text-gray-600 dark:text-gray-400 mr-3">
              {item.label}
            </div>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              >
                <span className="text-white text-xs font-medium">
                  {item.value}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PieChart = ({ data, title, className = "" }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  return (
    <div className={`p-4 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#e5e7eb"
              strokeWidth="20"
              className="dark:stroke-gray-600"
            />
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const strokeDasharray = `${percentage} ${100 - percentage}`;
              const strokeDashoffset = -cumulativePercentage;
              const colors = [
                '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'
              ];

              cumulativePercentage += percentage;

              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={colors[index % colors.length]}
                  strokeWidth="20"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-out"
                  transform="rotate(-90 50 50)"
                />
              );
            })}
          </svg>
        </div>
        <div className="ml-6 space-y-2">
          {data.map((item, index) => {
            const colors = [
              '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'
            ];
            return (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {item.label}: {item.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const LineChart = ({ data, title, className = "" }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const minValue = Math.min(...data.map(item => item.value));
  const range = maxValue - minValue || 1;

  return (
    <div className={`p-4 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      <div className="h-40 relative">
        <svg className="w-full h-full" viewBox="0 0 400 160">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05"/>
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <g className="text-gray-400 dark:text-gray-500">
            {[0, 1, 2, 3, 4].map(i => (
              <line
                key={i}
                x1="40"
                y1={20 + (i * 30)}
                x2="380"
                y2={20 + (i * 30)}
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.3"
              />
            ))}
          </g>

          {/* Line */}
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={data.map((item, index) => {
              const x = 40 + (index * (340 / (data.length - 1)));
              const y = 140 - ((item.value - minValue) / range) * 120;
              return `${x},${y}`;
            }).join(' ')}
            className="animate-pulse"
          />

          {/* Area under line */}
          <polygon
            fill="url(#lineGradient)"
            points={[
              ...data.map((item, index) => {
                const x = 40 + (index * (340 / (data.length - 1)));
                const y = 140 - ((item.value - minValue) / range) * 120;
                return `${x},${y}`;
              }),
              `${40 + ((data.length - 1) * (340 / (data.length - 1)))},140`,
              `40,140`
            ].join(' ')}
          />

          {/* Points */}
          {data.map((item, index) => {
            const x = 40 + (index * (340 / (data.length - 1)));
            const y = 140 - ((item.value - minValue) / range) * 120;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#3b82f6"
                stroke="white"
                strokeWidth="2"
                className="hover:r-6 transition-all duration-200"
              />
            );
          })}

          {/* Labels */}
          {data.map((item, index) => {
            const x = 40 + (index * (340 / (data.length - 1)));
            return (
              <text
                key={index}
                x={x}
                y="155"
                textAnchor="middle"
                className="text-xs fill-gray-600 dark:fill-gray-400"
              >
                {item.label}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export const MetricCard = ({ title, value, icon, color = "blue", change, className = "" }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    green: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    orange: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    red: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {change && (
            <p className={`text-sm font-medium mt-1 ${
              change > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {change > 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
      </div>
    </div>
  );
};