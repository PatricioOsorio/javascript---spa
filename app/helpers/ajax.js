export default function ajax(props) {
  let { url, cbSuccess } = props;

  fetch(url)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => cbSuccess(json))
    .catch((error) => {
      let message = error.statusText || 'Ocurró un error en la API';

      document.querySelector('#root').innerHTML = `
        <div class="error">
          <p>Error ${error.status}: ${message}</p>
        </div>
      `;

      console.error(error);
    });
}
