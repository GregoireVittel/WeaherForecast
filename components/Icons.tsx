import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  Snowflake, 
  CloudFog, 
  CloudSun,
  Moon,
  Wind,
  Droplets,
  Thermometer
} from 'lucide-react';

interface WeatherIconProps {
  iconName: string;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ iconName, className = "w-6 h-6" }) => {
  const name = iconName.toLowerCase();

  if (name.includes('storm')) return <CloudLightning className={className} />;
  if (name.includes('snow')) return <Snowflake className={className} />;
  if (name.includes('rain') || name.includes('drizzle')) return <CloudRain className={className} />;
  if (name.includes('fog') || name.includes('mist')) return <CloudFog className={className} />;
  if (name.includes('partly') || name.includes('few clouds')) return <CloudSun className={className} />;
  if (name.includes('cloud')) return <Cloud className={className} />;
  if (name.includes('clear') || name.includes('sunny')) return <Sun className={className} />;
  
  return <Sun className={className} />;
};

export const AttributeIcon: React.FC<{ type: 'wind' | 'humidity' | 'rain' | 'temp', className?: string }> = ({ type, className = "w-5 h-5" }) => {
    switch (type) {
        case 'wind': return <Wind className={className} />;
        case 'humidity': return <Droplets className={className} />;
        case 'rain': return <CloudRain className={className} />;
        case 'temp': return <Thermometer className={className} />;
        default: return <div />;
    }
};