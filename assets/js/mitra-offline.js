const searchBtn = document.getElementById('searchBtn');
const searchCity = document.getElementById('searchCity');
const resultBox = document.getElementById('mitraResult');

fetch('data/mitra-offline.json')
  .then(res => res.json())
  .then(data => {
    renderFeatured(data);

    searchBtn.addEventListener('click', () => {
      const city = searchCity.value.toLowerCase().trim();
      resultBox.innerHTML = '';

      const found = data.find(item =>
        item.kota.toLowerCase() === city
      );

      if (found) {
        found.mitra.forEach(m => {
          const card = document.createElement('div');
          card.className = 'mitra-card';
          card.innerHTML = `
  <h3>${m.nama}</h3>
  <p class="mitra-alamat">${m.alamat}</p>
  <a href="${m.maps}" target="_blank" class="btn-primary">
    Lihat di Google Maps
  </a>
`;
          resultBox.appendChild(card);
        });
      } else {
        resultBox.innerHTML = `
          <div class="mitra-empty">
            <p>Maaf, mitra belum tersedia di kota ini.</p>
            <a href="https://wa.me/6285175285640" class="btn-primary">
              Mau jadi mitra Lakoffie?
            </a>
          </div>
        `;
      }
    });

  });
  
  function renderFeatured(data) {
  resultBox.innerHTML = '';
  data.forEach(item => {
    item.mitra.forEach(m => {
      if (m.featured) {
        const card = document.createElement('div');
        card.className = 'mitra-card';
       const imgSrc = m.image
  ? `assets/img/toko/${m.image}`
  : `assets/img/toko/default-toko.jpg`;

card.innerHTML = `
  <img src="${imgSrc}" alt="${m.nama}" class="mitra-img">
  <h3>${m.nama}</h3>
  <p class="mitra-alamat">${m.alamat}</p>
  <a href="${m.maps}" target="_blank" class="btn-primary">
    Lihat di Google Maps
  </a>
`;
        resultBox.appendChild(card);
      }
    });
  });
}