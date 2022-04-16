export function PostCard(props) {
  let { id, _embedded, title, date, slug } = props;

  let dateFormated = new Date(date).toLocaleString();
  let urlPoster = _embedded['wp:featuredmedia']
    ? _embedded['wp:featuredmedia'][0].media_details.sizes.medium_large
        .source_url
    : 'app/assets/error.svg';

  document.addEventListener('click', (e) => {
    if (!e.target.matches('.post-card a')) return false;
    
    localStorage.setItem('wpPostId', e.target.dataset.id);
  });

  return `
    <article class="post-card">
      <img src="${urlPoster}" alt="${title.rendered}" />
      <h2>${title.rendered}</h2>
      <p>
        <time datetime="${date}">${dateFormated}</time>
        <a href="#/${slug}" data-id="${id}">Ver publicacion</a>
      </p>
    </article>
  `;
}
