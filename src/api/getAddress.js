const getAddressFromPostCode = (postcode) => {
  const apiUrl = `https://postcode.teraren.com/postcodes/${postcode}.json`;

  const joinWithoutNullOrUndefined = (...parts) =>
    parts.filter((part) => part != null).join("");

  const normalizeAddress = ({
    prefecture_kana,
    city_kana,
    suburb_kana,
    prefecture,
    city,
    suburb,
    street_address,
    office,
    office_kana,
    office_roman,
    prefecture_roman,
    city_roman,
    suburb_roman,
  }) => {
    return {
      kana: joinWithoutNullOrUndefined(
        prefecture_kana,
        city_kana,
        suburb_kana,
        street_address,
        office_kana
      ),
      kanji: joinWithoutNullOrUndefined(
        prefecture,
        city,
        suburb,
        street_address,
        office
      ),
      roman: joinWithoutNullOrUndefined(
        prefecture_roman,
        city_roman,
        suburb_roman,
        street_address,
        office_roman
      ),
    };
  };

  return fetch(apiUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok.");
      }
      return res.json();
    })
    .then((address) => normalizeAddress(address));
};

export default getAddressFromPostCode;
