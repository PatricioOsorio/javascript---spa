export function Post(props) {
  let { title, date, content } = props;
  let dateFormated = new Date(date).toLocaleString();

  return `
    <section class="post-page">
      <aside>
        <h2>${title.rendered}</h2>
        <time datetime="${date}">${dateFormated}</time>
      </aside>
      <hr />
      <article>${content.rendered}</article>
    </section>
  `;
}
