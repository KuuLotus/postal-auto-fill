import React, { useEffect, useState } from "react";
import getAddressFromPostCode from "../api/getAddress";

const AddressInputForm = () => {
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState({ kana: "", kanji: "", roman: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (postcode.length === 7) {
      getAddressFromPostCode(postcode)
        .then((address) => {
          console.log(address);
          setAddress(address);
          setError("");
        })
        .catch((e) => {
          setError("住所情報を取得できませんでした。");
          console.log(e);
        });
    }
  }, [postcode]);

  return (
    <div>
      <div>
        <label>郵便番号:</label>
        <input
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="1234567"
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>住所（カナ）:</label>
        <input type="text" value={address.kana} readOnly />
      </div>
      <div>
        <label>住所（漢字）:</label>
        <input type="text" value={address.kanji} readOnly />
      </div>
      <div>
        <label>住所（ローマ字）:</label>
        <input type="text" value={address.roman} readOnly />
      </div>
    </div>
  );
};

export default AddressInputForm;
