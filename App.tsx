import React, { useEffect, useState } from 'react';
import { fetchWeather } from './services/weatherService';
import { WeatherData, FetchStatus } from './types';
import { CurrentWeather } from './components/CurrentWeather';
import { HourlyForecast } from './components/HourlyForecast';
import { DailyForecast } from './components/DailyForecast';
import { Loader2, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeather = async () => {
      setStatus(FetchStatus.LOADING);
      try {
        const result = await fetchWeather();
        setData(result);
        setStatus(FetchStatus.SUCCESS);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch weather data. Please try again.");
        setStatus(FetchStatus.ERROR);
      }
    };

    loadWeather();
  }, []);

  if (status === FetchStatus.LOADING) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-4">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
        <h2 className="text-xl font-semibold">Analyzing Atmosphere...</h2>
        <p className="text-slate-400 mt-2">Connecting to Croissy-sur-Seine via Gemini</p>
      </div>
    );
  }

  if (status === FetchStatus.ERROR) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Weather Unavailable</h2>
        <p className="text-slate-400 mb-6 text-center max-w-md">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-mono text-blue-300">LIVE UPDATE</span>
            </div>
            <div className="text-right">
                <p className="text-xs text-slate-500">Powered by Gemini AI</p>
            </div>
        </header>

        <CurrentWeather current={data.current} location={data.location} />
        
        <HourlyForecast forecast={data.hourly} />
        
        <DailyForecast forecast={data.daily} />

        {/* Footer with Grounding Sources */}
        {data.groundingSources && data.groundingSources.length > 0 && (
          <footer className="mt-12 pt-8 border-t border-white/10 text-center md:text-left">
            <h3 className="text-sm font-semibold text-slate-400 mb-2">Sources</h3>
            <ul className="flex flex-wrap gap-4 justify-center md:justify-start">
              {data.groundingSources.slice(0, 3).map((source, idx) => (
                <li key={idx}>
                  <a 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 hover:underline truncate max-w-[200px] block"
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </footer>
        )}
      </div>
    </div>
  );
};

export default App;