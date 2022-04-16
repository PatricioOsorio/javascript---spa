import { Header } from './components/Header.js';
import { Main } from './components/Main.js';
import { Loader } from './components/Loader.js';
import { Router } from './components/Router.js';

export default function App() {
  const $root = document.querySelector('#root');

  $root.innerHTML = null;

  $root.appendChild(Header());
  $root.appendChild(Main());

  $root.appendChild(Loader());

  Router();
}
