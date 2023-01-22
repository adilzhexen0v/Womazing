window.addEventListener('DOMContentLoaded', () => {
     const cartTable = document.querySelector('.cart__table-products');
     let cart = [];
     if (localStorage.getItem('clothes')) {
          cart = JSON.parse(localStorage.getItem('clothes'));
     }
     const getDataFromLocalStorage = () => {
          return JSON.parse(localStorage.getItem('clothes'));
     }

     const renderProduct = (obj) => {
          const alt = obj.image.substring(4);
          const div = document.createElement('div');
          div.classList.add('cart__row');
          div.innerHTML = `
               <div class="cart__column cart__column-name">
                    <div class="cart__product-close">
                         <i class="fa fa-times"></i>
                    </div>
                    <div class="cart__product-img">
                         <img src="./img/collection/${obj.image}" alt="${alt}">
                    </div>
                    <div class="cart__product-name">
                         ${obj.name}
                    </div>
               </div>
               <div class="cart__column cart__column-price">${obj.price}$</div>
               <div class="cart__column cart__column-count">
                    <div class="id" style="display: none">${obj.id}</div>
                    <div class="cart__product-btn decrease">-</div>
                    <div class="cart__product-count">${+obj.count}</div>
                    <div class="cart__product-btn increase">+</div>
               </div>
               <div class="cart__column cart__column-total">${+obj.price * +obj.count}$</div>
          `;
          cartTable.append(div);
     }

     const renderCart = () => {
          cartTable.innerHTML = '';
          cart.forEach(item => {
               renderProduct(item);
          });
     }
     renderCart();

     const totalBlock = document.querySelector('.cart__buy-price span');
     const calculateTotalPrice = () => {
          let total = 0;
          cart.forEach(item => {
               total += +item.price * +item.count;
          });
          totalBlock.textContent = `${total}$`
     }
     calculateTotalPrice();

     const pushToLocalStorage = () => {
          localStorage.removeItem('clothes');
          localStorage.setItem('clothes', JSON.stringify(cart));
          getDataFromLocalStorage();
          renderCart();
          calculateTotalPrice();
          addClickListeners();
     }
     const increaseCountOfProduct = (id) => {
          cart.forEach(item => {
               if(item.id == id) {
                    item.count++;
               }
          });
          pushToLocalStorage();
     }
     const decreaseCountOfProduct = (id) => {
          cart.forEach(item => {
               if(item.id == id && item.count != 1) {
                    item.count--;
               }
          });
          pushToLocalStorage();
     }
     const deleteProduct = (id) => {
          cart.forEach((item, index) => {
               if(item.id == id) {
                    cart.splice(index, 1);
               }
          });
          pushToLocalStorage();
     }



     const addClickListeners = () => {
          const ids = document.querySelectorAll('.id');
          const idsOfProducts = [];
          ids.forEach(item => {
               idsOfProducts.push(+item.textContent);
          });
          const decreaseBtns = document.querySelectorAll('.decrease');
          decreaseBtns.forEach((dbtn, index) => {
               dbtn.addEventListener('click', () => {
                    decreaseCountOfProduct(idsOfProducts[index]);
               });
          });

          const increaseBtns = document.querySelectorAll('.increase');
          increaseBtns.forEach((ibtn, index) => {
               ibtn.addEventListener('click', () => {
                    increaseCountOfProduct(idsOfProducts[index]);
               });
          });

          const deleteBtns = document.querySelectorAll('.fa-times');
          deleteBtns.forEach((delbtn, index) => {
               delbtn.addEventListener('click', () => {
                    deleteProduct(idsOfProducts[index]);
               });
          });
     }
     addClickListeners();

});