import React from 'react';
import { WeatherCondition } from '../types';
import { WeatherIcon, AttributeIcon } from './Icons';

interface CurrentWeatherProps {
  current: WeatherCondition;
  location: string;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ current, location }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 mb-6 text-white shadow-xl relative overflow-hidden">
        {/* Background Decorative Blob */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-3xl font-bold tracking-wide mb-1">{location}</h1>
          <p className="text-blue-200 text-lg capitalize">{current.condition}</p>
          <div className="mt-4 flex items-center justify-center md:justify-start">
            <span className="text-8xl font-thin tracking-tighter">
              {Math.round(current.temp)}°
            </span>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
            <WeatherIcon iconName={current.icon} className="w-32 h-32 text-yellow-300 drop-shadow-lg" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
        <div className="flex flex-col items-center p-3 bg-white/5 rounded-xl">
          <div className="flex items-center space-x-2 text-blue-200 mb-1">
            <AttributeIcon type="wind" />
            <span className="text-sm font-medium">Wind</span>
          </div>
          <span className="text-xl font-semibold">{current.windSpeed} <span className="text-sm text-white/60">km/h</span></span>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-white/5 rounded-xl">
          <div className="flex items-center space-x-2 text-blue-200 mb-1">
            <AttributeIcon type="humidity" />
            <span className="text-sm font-medium">Humidity</span>
          </div>
          <span className="text-xl font-semibold">{current.humidity}<span className="text-sm text-white/60">%</span></span>
        </div>

        <div className="flex flex-col items-center p-3 bg-white/5 rounded-xl">
          <div className="flex items-center space-x-2 text-blue-200 mb-1">
            <AttributeIcon type="rain" />
            <span className="text-sm font-medium">Rain</span>
          </div>
          <span className="text-xl font-semibold">{current.precipitationChance}<span className="text-sm text-white/60">%</span></span>
        </div>

        <div className="flex flex-col items-center p-3 bg-white/5 rounded-xl">
            <div className="flex items-center space-x-2 text-blue-200 mb-1">
                <Cloud className="w-5 h-5" />
                <span className="text-sm font-medium">Clouds</span>
            </div>
            <span className="text-xl font-semibold">{current.cloudCover}<span className="text-sm text-white/60">%</span></span>
        </div>
      </div>
    </div>
  );
};

import { Cloud } from 'lucide-react';