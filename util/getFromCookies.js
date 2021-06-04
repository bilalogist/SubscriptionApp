export const getFromCookie = (cookies) => {
  if (cookies) {
    let cookie = {};
    let cookiesSplit = cookies.split(";");
    cookiesSplit.forEach((value, index) => {
      let broker = value.split("=");
      broker[0] = broker[0].replace(" ", "");
      cookie[broker[0]] = broker[1];
    });
    return cookie;
  } else return null;
};
