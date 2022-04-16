import { Header } from './components/Header.js';
import { Loader } from './components/Loader.js';
import ajax from './helpers/ajax.js';
import api from './helpers/wp_api.js';

export default function App() {
  const d = document;
  const $root = d.querySelector('#root');

  $root.appendChild(Header());
  $root.appendChild(Loader());

}
