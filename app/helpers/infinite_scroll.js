import { PostCard } from '../components/PostCard.js';
import { SearchCard } from '../components/SearchCard.js';
import ajax from './ajax.js';
import api from './wp_api.js';

export async function InfiniteScroll() {
  const d = document;
  const w = window;

  let query = localStorage.getItem('wpSearch');
  let apiUrl;
  let Component;

  w.addEventListener('scroll', async (e) => {
    let { scrollTop, clientHeight, scrollHeight } = d.documentElement;
    let { hash } = w.location;

    // console.log(scrollTop, clientHeight, scrollHeight, hash);

    if (scrollTop + clientHeight >= scrollHeight) {
      api.page++;

      if (!hash || hash === '#/') {
        apiUrl = `${api.POSTS}&page=${api.page}`;
        Component = PostCard;
      } else if (hash.includes('#/search')) {
        apiUrl = `${api.SEARCH}${query}&page=${api.page}`;
        Component = SearchCard;
      } else {
        return false;
      }

      d.querySelector('.loader').style.display = 'block';

      await ajax({
        url: apiUrl,
        cbSuccess: (posts) => {
          // console.log(posts);
          let $html = '';
          posts.forEach((post) => ($html += Component(post)));
          d.querySelector('#main').insertAdjacentHTML('beforeend', $html);
          d.querySelector('.loader').style.display = 'none';
        },
      });
    }
  });
}
