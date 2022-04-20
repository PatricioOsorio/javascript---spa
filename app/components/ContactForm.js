export function ContactForm() {
  const d = document;
  const $form = d.createElement('form');
  const $styles = d.querySelector('#dynamic-styles');

  $form.classList.add('contact-form');

  $styles.innerHTML = `
  .contact-form {
    padding: 1rem;
    margin: auto auto;
    background-color: var(--foreground-secondary);
    border-radius: var(--radius);
    width: 80%;
  }
  
  .contact-form > * {
    padding: 0.5rem;
    margin: 0.5rem auto;
    width: 100%;
    display: block;
  }
  
  .contact-form textarea {
    resize: none;
  }
  
  .contact-form__loader {
    text-align: center;
  }
  
  .contact-form__response {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }
  
  .contact-form [required]:valid {
    border: 2px solid var(--success);
  }
  
  .contact-form [required]:invalid {
    border: 2px solid var(--danger);
  }
  
  .contact-form-error {
    margin-top: -1rem;
    font-size: 80%;
    background-color: var(--danger);
    color: var(--text-color-regular);
    transition: background-color 0.25s var(--easeInOut);
  }
  
  .contact-form-error.active {
    display: block;
    animation: show-message 1s 1 normal 0s var(--easeInOut) both;
  }
  
  .none {
    display: none;
  }
  
  @keyframes show-message {
    0% {
      visibility: hidden;
      opacity: 0;
    }
    100% {
      visibility: visible;
      opacity: 1;
    }
  }
  `;

  $form.innerHTML = `
    <label for="name">Nombre</label>
    <input
      type="text"
      name="name"
      id="nameI"
      placeholder="Juan..."
      title="Solo se aceptan letras y espacios en blanco"
      required
      pattern="^[a-zA-Z ñÑáéíóúÁÉÍÓÚ]*$"
    />
    <label for="email">Correo electronico</label>
    <input
      type="email"
      name="email"
      id="emailI"
      placeholder="juan@example.com"
      pattern="^[a-z0-9A-Z._]+@[a-z0-9A-Z._]+\\.[a-z]{2,5}$"
      title="Ingrese correo válido"
      required
    />
    <label for="subject">Asunto</label>
    <input
      type="text"
      name="subject"
      id="subjectI"
      placeholder="Quiero tratar..."
      required
      title="Asunto requerido"
    />
    <label for="comments">Comentarios</label>
    <textarea
      name="comments"
      id="commentsI"
      placeholder="Comentarios..."
      required
      cols="45"
      rows="5"
      data-pattern="^.{1,255}$"
      title="No debe exceder los 255 caracteres"
    ></textarea>
    <input class="button" type="submit" value="Enviar" />
    <div class="contact-form__loader none">
      <img class="dynamic-icon" src="assets/svg/loader.svg" alt="Cargando" />
    </div>
    <div class="contact-form__response none">
      <p>Los datos se han enviado</p>
    </div>
  `;

  function formValidator() {
    const $form = d.querySelector('.contact-form');
    let $inputs = d.querySelectorAll('.contact-form [required]');

    // console.log($inputs);

    $inputs.forEach((input) => {
      let $span = d.createElement('span');
      $span.id = input.name;
      $span.textContent = input.title;
      $span.classList.add('contact-form-error', 'none');
      input.insertAdjacentElement('afterend', $span);
    });

    d.addEventListener('keyup', (e) => {
      if (e.target.matches('.contact-form [required]')) {
        let $input = e.target;
        let pattern = $input.pattern || $input.dataset.pattern;

        // console.log('$input:' + $input);
        // console.log('pattern: ' + pattern);

        if (pattern && $input.value !== '') {
          // console.log('El input tiene patron');
          // console.log(`$input.name: "${$input.name}"`);

          let regex = new RegExp(pattern);
          return !regex.exec($input.value)
            ? d.getElementById($input.name).classList.add('active')
            : d.getElementById($input.name).classList.remove('active');
        }
        if (!pattern) {
          return $input.value === ''
            ? d.getElementById($input.name).classList.add('active')
            : d.getElementById($input.name).classList.remove('active');
        }
      }
    });

    d.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Enviando formulario');
      const $loader = d.querySelector('.contact-form__loader');
      const $response = d.querySelector('.contact-form__response');

      $loader.classList.remove('none');

      fetch('https://formsubmit.co/ajax/patriciomiguel_12@hotmail.com', {
        method: 'POST',
        body: new FormData(e.target),
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((json) => {
          console.log(json);

          $loader.classList.add('none');
          $response.classList.remove('none');
          $response.innerHTML = `<p>${json.message}</p>`;
          $form.reset();
        })
        .catch((err) => {
          console.error(err);
          let message = err.statusText || 'Ocurrio un error';
          $response.innerHTML = `<p>Error: ${err.status}: ${message}</p>`;
        })
        .finally(() =>
          setTimeout(() => {
            $response.classList.add('none');
            $response.innerHTML = '';
          }, 3000)
        );
    });
  }

  setTimeout(() => formValidator(), 100);

  return $form;
}
