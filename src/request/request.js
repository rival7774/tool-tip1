export const urlProducts = 'https://fakestoreapi.com/products/';
export const request = async ({
  url,
  method = 'GET',
  body
}, resp, rej) => {
  try {
    const resJson = await fetch(url, {
      method,
      body: JSON.stringify(body)
    });
    const res = await resJson.json();

    if (resp) {
      resp(res);
    }

    return res;
  } catch (err) {
    if (rej) {
      rej(err);
    }
    console.error('There was a problem with the fetch operation:', err);
  }
};
