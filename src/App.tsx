import ZipcodeSearch from "./components/ZipcodeSearch";
import WeatherSearch from "./components/WeatherSearch";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          API ダッシュボード
        </h1>

        {/* カード全体のグリッド */}
        <div className="grid grid-cols-1 gap-6">

          {/* --- 郵便番号検索カード --- */}
          <div id="zipcode" className="bg-white shadow-md rounded-xl p-5 border">
            <h2 className="text-xl font-semibold mb-4">郵便番号検索</h2>
            <ZipcodeSearch />
          </div>

          {/* --- 天気検索カード --- */}
          <div id="weather" className="bg-white shadow-md rounded-xl p-5 border">
            <h2 className="text-xl font-semibold mb-4">天気検索</h2>
            <WeatherSearch />
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
