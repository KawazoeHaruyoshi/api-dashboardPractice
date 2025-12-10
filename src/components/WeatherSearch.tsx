import { useState } from "react";

function WeatherSearch() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState<number | null>(null);
  const [error, setError] = useState("");

  const searchWeather = async () => {
    setError("");
    setTemp(null);

    if (!city) {
      setError("都市名を入力してください");
      return;
    }

    try {
      // Step 1: 都市名 → 緯度経度
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("都市が見つかりませんでした");
        return;
      }

      const { latitude, longitude } = geoData.results[0];

      // Step 2: 緯度経度 → 天気
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
      );
      const weatherData = await weatherRes.json();

      setTemp(weatherData.current.temperature_2m);
    } catch (err) {
      console.error(err);
      setError("天気情報の取得に失敗しました");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 入力欄 */}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="都市名（例：Tokyo）"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {/* 検索ボタン */}
      <button
        onClick={searchWeather}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      >
        天気を取得
      </button>

      {/* エラー */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}

      {/* 結果 */}
      {temp !== null && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 rounded">
          現在の気温：{temp} ℃
        </div>
      )}
    </div>
  );
}

export default WeatherSearch;
