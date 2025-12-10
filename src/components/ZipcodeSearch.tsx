import { useState } from "react";

function ZipcodeSearch() {
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState("");

  type Address = {
    prefcode: string;
    address1: string;
    address2: string;
    address3: string;
  };

  const searchAddress = async () => {
    setError("");
    setAddress(null);

    if (zipcode.length !== 7) {
      setError("郵便番号は7桁で入力してください");
      return;
    }

    try {
      const res = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`
      );
      const data = await res.json();

      if (!data.results) {
        setError("住所が見つかりませんでした");
        return;
      }

      setAddress(data.results[0]);
    } catch (err) {
      console.error(err);
      setError("通信エラーが発生しました");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 入力欄 */}
      <input
        type="text"
        value={zipcode}
        onChange={(e) =>
          setZipcode(e.target.value.replace(/[^0-9]/g, ""))
        }
        maxLength={7}
        inputMode="numeric"
        placeholder="郵便番号（例：1000001）"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {/* ボタン（天気検索と同じ見た目） */}
      <button
        onClick={searchAddress}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      >
        検索
      </button>

      {/* エラー */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}

      {/* 結果 */}
      {address && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
          {address.address1} {address.address2} {address.address3}
        </div>
      )}
    </div>
  );
}

export default ZipcodeSearch;
