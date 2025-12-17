fetch('data/artikel.json')
  .then(res => res.json())
  .then(data => {

    renderSegment(data, 'edukasi', 'edukasiList');
    renderSegment(data, 'tips', 'tipsList');
    renderSegment(data, 'lain', 'lainList');

    document.getElementById('searchInput')
      .addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          searchArtikel(data);
        }
      });
  });

function renderSegment(data, kategori, targetId) {
  const box = document.getElementById(targetId);
  data.filter(a => a.kategori === kategori)
      .forEach(a => box.appendChild(card(a)));
}

function card(a) {
  const div = document.createElement('div');
  div.className = 'artikel-card';
  div.innerHTML = `
    <h3>${a.judul}</h3>
    <a href="${a.url}" class="btn-secondary">Baca Artikel</a>
  `;
  return div;
}

function searchArtikel(data) {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const result = data.filter(a =>
    a.judul.toLowerCase().includes(q) ||
    a.kategori.includes(q) ||
    a.tag.join(' ').includes(q)
  );

  document.getElementById('searchResult').style.display = 'block';
  const list = document.getElementById('searchList');
  const note = document.getElementById('notFound');

  list.innerHTML = '';
  note.textContent = '';

  if (result.length) {
    result.forEach(a => list.appendChild(card(a)));
  } else {
    note.textContent = 'Maaf, artikel yang kamu cari tidak tersedia.';
    data.sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .forEach(a => list.appendChild(card(a)));
  }
}