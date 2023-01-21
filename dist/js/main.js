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

     // let indexCurrentTab = 0;
     // setInterval(() => {
     //      showTab(indexCurrentTab);
     //      indexCurrentTab++;
     //      if (indexCurrentTab === tabsItems.length) {
     //           indexCurrentTab = 0;
     //      }
     // }, 10000);
});
