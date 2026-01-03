import React from 'react';
import { DailyForecast as DailyType } from '../types';
import { WeatherIcon } from './Icons';

interface DailyForecastProps {
  forecast: DailyType[];
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ forecast }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
        <span className="w-1 h-6 bg-yellow-400 rounded-full mr-3"></span>
        7-Day Forecast
      </h2>
      
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
            <div className="flex items-center space-x-4 w-1/3">
                <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full">
                     <WeatherIcon iconName={day.icon} className="w-6 h-6 text-white" />
                </div>
                <div>
                    <p className="font-bold text-white">{day.day}</p>
                    <p className="text-xs text-blue-200">{day.date}</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center">
                 <div className="text-sm text-blue-100 flex items-center gap-1 bg-blue-500/20 px-2 py-1 rounded-md">
                    💧 {day.rainChance}% Rain
                 </div>
            </div>

            <div className="w-1/3 flex justify-end items-center gap-4">
                <div className="flex flex-col items-end">
                    <span className="text-white font-bold text-lg">{Math.round(day.maxTemp)}°</span>
                    <span className="text-white/50 text-sm">{Math.round(day.minTemp)}°</span>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};