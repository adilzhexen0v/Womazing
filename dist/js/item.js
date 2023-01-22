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
                         image.src = `./img/collection/${item.image}`;
                         name.textContent = item.name;
                         document.querySelector('title').textContent = `${item.name} - Womazing`;
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
                              <img src="./img/collection/${item.image}" alt="${alt}">
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

     const cartBtn = document.querySelector('.item__cart-btn');
     let cart = [];
     if (localStorage.getItem('clothes')) {
          cart = JSON.parse(localStorage.getItem('clothes'));
     }

     const pushToLocalStorage = () => {
          localStorage.removeItem('clothes');
          localStorage.setItem('clothes', JSON.stringify(cart));
     }
     const addNewProductToCart = (obj, cnt) => {
          obj.count = +cnt;
          cart.push(obj);
          pushToLocalStorage();
     }
     const increaseCountOfProduct = (countOfProduct) => {
          cart.forEach(item => {
               if(item.id == id) {
                    item.count += +countOfProduct;
               }
          });
          pushToLocalStorage();
     }
     const hasProduct = () => {
          let check = 0;
          cart.forEach(item => {
               if (item.id == id) {
                    check++;
               }
          });
          return check;
     }
     const modal = document.querySelector('.shadow');
     const modalText = document.querySelector('.modal__body-block-text h6');
     const modalImage = document.querySelector('.modal__body-block img');
     const modalCloseBtns = document.querySelectorAll('.modal__close');
     const showModal = (cnt) => {
          modalText.textContent = `${product.name}, ${cnt}шт.`;
          modalImage.src = `./img/collection/${product.image}`;
          modal.style.display = 'flex';
     }
     const hideModal = () => {
          modal.style.display = 'none';
          location.reload();
     }

     modalCloseBtns.forEach(close => {
          close.addEventListener('click', hideModal);
     });

     cartBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const productCount = document.querySelector('.item__cart-input').value;
          if (hasProduct() > 0) {
               increaseCountOfProduct(productCount);
          } else {
               addNewProductToCart(product, productCount);
          }
          showModal(productCount);
     });

     const itemSizes = document.querySelectorAll('.item__size-item');
     const changeSize = (idx) => {
          itemSizes.forEach(item => {
               item.classList.remove('active-size');
          });
          itemSizes[idx].classList.add('active-size');
     }
     itemSizes.forEach((size, i) => {
          size.addEventListener('click', () => {
               changeSize(i);
          });
     });  
     const itemColors = document.querySelectorAll('.item__colors-item');
     const changeColor = (idx) => {
          itemColors.forEach(item => {
               item.classList.remove('active-color');
          });
          itemColors[idx].classList.add('active-color');
     }
     itemColors.forEach((color, i) => {
          color.addEventListener('click', () => {
               changeColor(i);
          });
     });  
});