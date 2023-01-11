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
     // let indexCurrentTab = 0;
     // setInterval(() => {
     //      showTab(indexCurrentTab);
     //      indexCurrentTab++;
     //      if (indexCurrentTab === tabsItems.length) {
     //           indexCurrentTab = 0;
     //      }
     // }, 10000);
});