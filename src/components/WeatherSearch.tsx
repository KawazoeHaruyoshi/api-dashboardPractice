import { useState } from "react";
import { TextField, Button, Stack, Alert } from "@mui/material";

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
    <Stack spacing={2}>
      <TextField
        label="都市名（例：Tokyo）"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <Button variant="contained" onClick={searchWeather}>
        天気を取得
      </Button>

      {error && <Alert severity="error">{error}</Alert>}

      {temp !== null && (
        <Alert severity="info">現在の気温： {temp} ℃</Alert>
      )}
    </Stack>
  );
}

export default WeatherSearch;
