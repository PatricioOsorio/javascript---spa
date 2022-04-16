export function Menu() {
  const $menu = document.createElement('nav');
  $menu.classList.add('menu');
  $menu.innerHTML = `
    <a href="#/">Inicio</a>
    <a href="#/search">Busqueda</a>
    <a href="#/contact">Contacto</a>
  `;

  return $menu;
}
