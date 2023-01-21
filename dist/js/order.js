window.addEventListener('DOMContentLoaded', () => {
     const radioButtonsOuter = document.querySelectorAll('.order__radio-outer');
     const radioButtonsInner = document.querySelectorAll('.order__radio-inner');
     
     const checkRadioButton = (index) => {
          radioButtonsInner.forEach(btn => {
               btn.classList.remove('active');
          });
          radioButtonsInner[index].classList.add('active');
     }
     radioButtonsOuter.forEach((btnOuter, i) => {
          btnOuter.addEventListener('click', () => {
               checkRadioButton(i);
          });
     });

     const formInputs = document.querySelectorAll('.order__form-input');
     const formSubmit = document.querySelector('.order__payment-btn');
     const validateForm = () => {
          let countOfErrors = 0;
          const errors = document.querySelectorAll('.order__form-error');
          errors.forEach(err => {
               err.remove();
          });
          formInputs.forEach(input => {
               if(input.value.length === 0) {
                    input.insertAdjacentHTML('afterend', '<h6 class="order__form-error">Заполните это поле</h6>');
                    countOfErrors++;
               }
          });
          if (countOfErrors === 0) {
               return false;
          } 
          return true;
     }

     const modal = document.querySelector('.shadow');
     const modalCloseBtns = [
          document.querySelector('.fa-times'),
          document.querySelector('.modal__body-btn')
     ];
     const openModal = () => {
          modal.style.display = 'flex';
     }
     const closeModal = () => {
          modal.style.display = 'none';
          location.reload();
     }
     modalCloseBtns.forEach(closeBtn => {
          closeBtn.addEventListener('click', closeModal);
     })
     formSubmit.addEventListener('click', (e) => {
          if(validateForm()) {
               e.preventDefault();
          } else {
               openModal();
          }
     });
});