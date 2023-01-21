window.addEventListener('DOMContentLoaded', () => {
     const getResource = async (url) => {
          let res = await fetch(url);
          if (!res.ok) {
              throw new Error(`Could not fetch ${url}, status: ${res.status}`);
          }
          return await res.json();
     }

     const id = window.location.search.substring(4);
     const image = document.querySelector('.item__img');
     const name = document.querySelector('.page__title');
     const price = document.querySelector('.item__price');
     const category = document.querySelector('.category');
     const title = document.querySelector('.item__title');
     let product = {};
     let productCategory = '';
     
     getResource('./db/clothes.json').then(
          data => {
               data.clothes.forEach(item => {
                    if(item.id == id) { 
                         image.src = `./img/home_collection/${item.image}`;
                         name.textContent = item.name;
                         price.textContent = `$${item.price}`;
                         category.textContent = item.category;
                         title.textContent = item.name;
                         productCategory = item.category;
                         product = item;
                    }
               });
          }
     );
     getResource('./db/clothes.json').then(
          data => {
               data.clothes.forEach(item => {
                    if(item.id != id && item.category == productCategory) {
                         const alt = item.image.slice(0, -4);
                         const card = document.createElement('div');
                         card.classList.add('collection__item');
                         card.innerHTML = `
                         <a href="./item.html?id=${item.id}" class="collection__item-img">
                              <img src="./img/home_collection/${item.image}" alt="${alt}">
                              <div class="collection__item-img-overlay">
                                   <img src="./img/overlay_arrow.png" alt="overlay_arrow">
                              </div>
                         </a>
                         <h4 class="collection__item-title">${item.name}</h4>
                         <h6 class="collection__item-price">$${item.price}</h6>
                         `;
                         document.querySelector('.collection__grid').append(card);
                    }
               });
          }
     );
});