import React from 'react';
import { HourlyForecast as HourlyType } from '../types';
import { WeatherIcon } from './Icons';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

interface HourlyForecastProps {
  forecast: HourlyType[];
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecast }) => {
  // Take only the first 48 hours as requested
  const limitedForecast = forecast.slice(0, 48);

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 mb-6">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-400 rounded-full mr-3"></span>
        48-Hour Forecast
      </h2>
      
      {/* Chart Section */}
      <div className="h-32 w-full mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={limitedForecast}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value: number) => [`${value}°C`, 'Temp']}
                labelStyle={{ display: 'none' }}
            />
            <Area 
                type="monotone" 
                dataKey="temp" 
                stroke="#60a5fa" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorTemp)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Scrollable List */}
      <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
        {limitedForecast.map((hour, index) => (
          <div key={index} className="flex-shrink-0 flex flex-col items-center min-w-[70px] space-y-2 p-3 rounded-2xl hover:bg-white/5 transition-colors">
            <span className="text-sm text-blue-200 font-medium whitespace-nowrap">{hour.time}</span>
            <WeatherIcon iconName={hour.icon} className="w-8 h-8 text-white my-1" />
            <span className="text-lg font-bold text-white">{Math.round(hour.temp)}°</span>
            <div className="flex flex-col items-center mt-1 space-y-1">
               <span className="text-xs text-blue-300 flex items-center gap-1">
                 💧 {hour.precipitationChance}%
               </span>
               <span className="text-xs text-slate-400 flex items-center gap-1">
                 💨 {Math.round(hour.windSpeed)}
               </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};