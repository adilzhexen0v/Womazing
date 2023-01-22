window.addEventListener('DOMContentLoaded', () => {
     const tabsItems = document.querySelectorAll('.header__item');
     const tabsDots = document.querySelectorAll('.header__slider-dot');
     
     const showTab = (idx) => {
          tabsItems.forEach(item => {
               item.classList.remove('header__item-show', 'header__item-fade');
          });
          tabsItems[idx].classList.add('header__item-show', 'header__item-fade');

          tabsDots.forEach(dot => {
               dot.classList.remove('active');
          });
          tabsDots[idx].classList.add('active');          
     }

     tabsDots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
               showTab(index);
          })
     });
     showTab(0);
     const sliderContainer = document.querySelector('.team__slider-container');
     const sliderItems = document.querySelectorAll('.team__slider-item');
     const sliderDots = document.querySelectorAll('.team__slider-dot');
     const sliderLeftArrow = document.querySelector('.team__slider-arrow-left');
     const sliderRightArrow = document.querySelector('.team__slider-arrow-right');
     console.log(sliderRightArrow);
     let sliderOffset = 0;
     let sliderItemWidth = window.getComputedStyle(sliderItems[0]).width.slice(0, -2);
     const moveSlider = (offset, width) => {
          const moveWidth = +offset * +width;
          sliderContainer.style.transform = `translateX(-${moveWidth}px)`;
          showOrHideSliderArrows();
          showCorrectDot(offset);
     }

     const showOrHideSliderArrows = () => {
          if (sliderOffset === 0) {
               sliderLeftArrow.style.display = 'none';
          } else {
               sliderLeftArrow.style.display = 'block';
          }

          if (sliderOffset === sliderItems.length - 1) {
               sliderRightArrow.style.display = 'none';
          } else {
               sliderRightArrow.style.display = 'block';
          }
     }

     showOrHideSliderArrows();

     const showCorrectDot = (i) => {
          sliderDots.forEach(dot => {
               dot.classList.remove('active');
          });
          sliderDots[i].classList.add('active');
     }

     sliderDots.forEach((dot, i) => {
          dot.addEventListener('click', () => {
               sliderOffset = i;
               moveSlider(sliderOffset, sliderItemWidth);
          });
     });

     sliderLeftArrow.addEventListener('click', () => {
          sliderOffset--;
          moveSlider(sliderOffset, sliderItemWidth);
     });
     sliderRightArrow.addEventListener('click', () => {
          sliderOffset++;
          moveSlider(sliderOffset, sliderItemWidth);
     });

     const getResource = async (url) => {
          let res = await fetch(url);
          if (!res.ok) {
              throw new Error(`Could not fetch ${url}, status: ${res.status}`);
          }
          return await res.json();
     }

     getResource('./db/clothes.json').then(
          data => {
               for (let i = 0; i < 3; i++) {
                    const item = data.clothes[i];
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
                    document.querySelector('.collection__list').append(card);
               }
          }
     );
});
