const hiddenLoader = () =>
  (document.querySelector('.loader').style.display = 'none');

export default async function ajax(props) {
  let { url, cbSuccess } = props;

  await fetch(url)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => cbSuccess(json))
    .catch((error) => {
      let message = error.statusText || 'Ocurró un error en la API';

      document.querySelector('#main').innerHTML = `
        <div class="error">
          <p>Error ${error.status}: ${message}</p>
        </div>
      `;

      hiddenLoader();

      console.error(error);
    });
}
