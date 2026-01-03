import { GoogleGenAI } from "@google/genai";
import { WeatherData } from "../types";

const processWeatherResponse = (text: string): WeatherData => {
  try {
    // Clean up markdown code blocks if present
    let cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    // Attempt to find the first '{' and last '}' to handle potential conversational prefix/suffix
    const firstBrace = cleanText.indexOf('{');
    const lastBrace = cleanText.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanText = cleanText.substring(firstBrace, lastBrace + 1);
    }

    return JSON.parse(cleanText) as WeatherData;
  } catch (error) {
    console.error("Failed to parse weather JSON:", error);
    throw new Error("Failed to parse weather data format.");
  }
};

export const fetchWeather = async (): Promise<WeatherData> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Find the current weather, hourly forecast (next 48 hours), and daily forecast (next 7 days) for Croissy-sur-Seine, France.
    
    You MUST return the data in strict JSON format matching the following structure. Do not include any markdown formatting or conversational text outside the JSON.
    
    Structure:
    {
      "location": "Croissy-sur-Seine",
      "current": {
        "temp": number (Celsius),
        "condition": string (short description),
        "precipitationChance": number (0-100),
        "windSpeed": number (km/h),
        "humidity": number (0-100),
        "cloudCover": number (0-100),
        "icon": string (one of: "sunny", "cloudy", "rain", "storm", "snow", "fog", "partly-cloudy")
      },
      "hourly": [
        {
          "time": string (e.g. "14:00"),
          "timestamp": number (unix timestamp),
          "temp": number,
          "condition": string,
          "precipitationChance": number,
          "windSpeed": number,
          "humidity": number,
          "cloudCover": number,
          "icon": string
        }
        ... (48 entries)
      ],
      "daily": [
        {
          "day": string (e.g. "Monday"),
          "date": string (e.g. "Oct 25"),
          "minTemp": number,
          "maxTemp": number,
          "condition": string,
          "rainChance": number,
          "icon": string
        }
        ... (7 entries)
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Note: responseSchema is avoided here because googleSearch sometimes produces text that isn't perfectly strict JSON schema compliant immediately, 
        // relying on prompt engineering for JSON output is often more robust with search tools active.
      },
    });

    const text = response.text;
    if (!text) throw new Error("No data received from Gemini.");

    const weatherData = processWeatherResponse(text);

    // Extract grounding metadata if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks) {
        weatherData.groundingSources = groundingChunks
            .map((chunk: any) => chunk.web)
            .filter((web: any) => web?.uri && web?.title);
    }

    return weatherData;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};