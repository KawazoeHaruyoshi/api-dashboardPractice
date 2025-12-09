import { useState } from "react";
import { TextField, Button, Stack, Alert } from "@mui/material";

function ZipcodeSearch() {
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState<Address |null>(null);
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
    <Stack spacing={2}>
      <TextField
        label="郵便番号（7桁）"
        variant="outlined"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
      />

      <Button variant="contained" onClick={searchAddress}>
        検索
      </Button>

      {error && <Alert severity="error">{error}</Alert>}

      {address && (
        <Alert severity="success">
          {address.address1} {address.address2} {address.address3}
        </Alert>
      )}
    </Stack>
  );
}

export default ZipcodeSearch;
