const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = 'https://api.escuelajs.co/api/v1';

function fetchData(urlApi) {
  return new Promise((resolve, reject) => {
    let xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlApi, true);
    xhttp.onreadystatechange = function (event) {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          resolve(JSON.parse(xhttp.responseText));
        } else {
          reject(new Error(`Error ${xhttp.status}: ${xhttp.statusText}`));
        }
      }
    }
    xhttp.send();
  });
}

fetchData(`${API}/products`)
  .then(data1 => {
    console.log(data1[0]);
    return fetchData(`${API}/products/${data1[0].id}`);
  })
  .then(data2 => {
    console.log(data2.title);
    return fetchData(`${API}/categories/${data2?.category?.id}`);
  })
  .then(data3 => {
    console.log(data3.name);
  })
  .catch(error => {
    console.error(error);
  });