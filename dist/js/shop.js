window.addEventListener('DOMContentLoaded', () => {
     const getResource = async (url) => {
          let res = await fetch(url);
          if (!res.ok) {
              throw new Error(`Could not fetch ${url}, status: ${res.status}`);
          }
          return await res.json();
     }

     const showClothes = (arr, list) => {
          arr.forEach(item => {
               const alt = item.image.slice(0, -4);
               const card = document.createElement('div');
               card.classList.add('collection__item');
               card.innerHTML = `
               <a href="./item.html?id=${item.id}" class="collection__item-img">
                    <img src="./img/collection/${item.image}" alt="${alt}">
                    <div class="collection__item-img-overlay">
                         <img src="./img/overlay_arrow.png" alt="overlay_arrow">
                    </div>
               </a>
               <h4 class="collection__item-title">${item.name}</h4>
               <h6 class="collection__item-price">$${item.price}</h6>
               `;
               list.append(card);
          });
     }

     const clothesList = document.querySelector('.collection__grid');
     getResource('./db/clothes.json').then(
          data => {
               showClothes(data.clothes, clothesList);
          }
     )
});