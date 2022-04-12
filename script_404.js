//---------------------------------МОДАЛКА для 404.html
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach (button => {
   button.addEventListener('click', () => {
      const modal = document.querySelector(button.dataset.modalTarget)
      openCloseModal(modal);
   })
})

overlay.addEventListener('click', () => {
   const modals = document.querySelectorAll('.modal.active');
   modals.forEach(modal => {
      openCloseModal(modal);
   })
})

closeModalButtons.forEach(button => {
   button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      openCloseModal(modal);
   })
})

function openCloseModal(modal) {
   if (modal == null) return
   modal.classList.toggle('active');
   overlay.classList.toggle('active');
   document.body.classList.toggle('block')
}