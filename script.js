window.addEventListener('scroll', function() {
   let header = document.querySelector('.header');
   header.style.padding = 5 + 'px ' + 40 + 'px';
})


//--------------Работа с progress-кругами
const circles = document.querySelectorAll('.progress-ring__circle');
//переменная input объявлена глобально, т.к. используется для круглого прогресса и для горизонтального
const input = document.querySelector('.slider-range');

for (const circle of circles) {
   const r = circle.r.baseVal.value;
   const circumference = 2 * Math.PI * r;
   const years = document.querySelector('.info__years');
   const yearsInWords = document.querySelector('.info__years-in-words');
   const projects = document.querySelector('.info__projects');
   const projectsInWords = document.querySelector('.info__projects-in-words');

   circle.style.strokeDasharray = `${circumference} ${circumference}`;
   circle.style.strokeDashoffset = circumference;

   function setProgress(percent) {
      const offset = circumference - percent / 100 * circumference;
      circle.style.strokeDashoffset = offset;
   }

   setProgress(input.value);

   input.addEventListener('input', function () {
      setProgress(input.value);
      years.innerHTML = (input.value / 100 * 10).toFixed(0);
      if (years.innerHTML == 1) {
         yearsInWords.innerHTML = 'Год'
      }
      else if (years.innerHTML == 2 || years.innerHTML == 3 || years.innerHTML == 4) {
         yearsInWords.innerHTML = 'Года'
      }
      else {yearsInWords.innerHTML = 'Лет'};

      projects.innerHTML = (input.value / 100 * 100).toFixed(0);
      if (projects.innerHTML == 1 || projects.innerHTML == 21 || projects.innerHTML == 31 || projects.innerHTML == 41 || projects.innerHTML == 51 || projects.innerHTML == 61 || projects.innerHTML == 71 || projects.innerHTML == 81 || projects.innerHTML == 91) {
         projectsInWords.innerHTML = 'Проект'
      }
      else if (projects.innerHTML == 2 || projects.innerHTML == 3 || projects.innerHTML == 4 || projects.innerHTML == 22 || projects.innerHTML == 23 || projects.innerHTML == 24 || projects.innerHTML == 32 || projects.innerHTML == 33 || projects.innerHTML == 34 || projects.innerHTML == 42 || projects.innerHTML == 43 || projects.innerHTML == 44 || projects.innerHTML == 52 || projects.innerHTML == 53 || projects.innerHTML == 54 || projects.innerHTML == 62 || projects.innerHTML == 63 || projects.innerHTML == 64 || projects.innerHTML == 72 || projects.innerHTML == 73 || projects.innerHTML == 74 || projects.innerHTML == 82 || projects.innerHTML == 83 || projects.innerHTML == 84 || projects.innerHTML == 92 || projects.innerHTML == 93 || projects.innerHTML == 94) {
         projectsInWords.innerHTML = 'Проекта'
      }
      else {projectsInWords.innerHTML = 'Проектов'}
   });
}


//--------------Работа с ползунком (slider-range) 
input.addEventListener('mousemove', range);
input.addEventListener('touchmove', range);
   
function range() {
   let x = input.value;
   let color = 'linear-gradient(90deg, #BFA4FF, #FF4F72, #FFC359 ' + x + '%, #23364C ' + x + '%)';
   input.style.background = color;
}


//----------------выбор цвета у кроссовок
const colors = document.querySelectorAll('.color__in');

for (let i = 0; i < colors.length; i++) {
   colors[i].addEventListener('click', function() {
      let colorBorders = document.querySelectorAll('.color__out');
      colorBorders[i].classList.toggle('color__out_active')
   })
}


//---------------like для кроссовка
const likes = document.querySelectorAll('.like__svg');

for (let i = 0; i < likes.length; i++) {
   likes[i].addEventListener('click', function () {
      likes[i].classList.toggle('like-red');
   })
}


//-----------------слайдер
const images = document.querySelectorAll('.card');
const sliderLine = document.querySelector('.slider-line');
let count = 0;
let width = 270; //240px сама карточка товара + 30px это gap;
let currentSlide = document.querySelector('.slider-info__current');

function init() {
   sliderLine.style.width = width * images.length + 'px';
   rollSlider();
}

window.addEventListener('resize', init);
init();

document.querySelector('.slider-prev').addEventListener('click', function() {
   count--;
   if (count < 0) {
      count = images.length - 1;
   };

   //вывод текущего слайда при нажатии на кнопку "предыдущий"
   i = count + 1;
   if (i < 10) {
      currentSlide.innerHTML = '0' + i;
   }
   else {
      currentSlide.innerHTML = i;
   }

   rollSlider();
})

document.querySelector('.slider-next').addEventListener('click', function() {
   count++;
   if (count >= images.length) {
      count = 0;
   }

   //вывод текущего слайда при нажатии на кнопку "следующий"
   i = count + 1;
   if (i < 10) {
      currentSlide.innerHTML = '0' + i;
   }
   else {
      currentSlide.innerHTML = i;
   }

   rollSlider();
})

function rollSlider() {
   sliderLine.style.transform = 'translate(-' + count*width + 'px)';
}

//вывод текущего слайда при загрузке страницы
if (count < 10) {
   currentSlide.innerHTML = '0' + (count + 1);
}
else {
   currentSlide.innerHTML = count + 1;
}

//--------вывод кол-ва слайдов
const lastSlider = document.querySelector('.slider-info__last');
if (images.length < 10) {
   lastSlider.innerHTML = '0' + images.length;
}
else {
   lastSlider.innerHTML = images.length;
}


//---------------------------------МОДАЛКА для index.html
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach (button => {
   button.addEventListener('click', () => {
      const modal = document.querySelector(button.dataset.modalTarget)
      openModal(modal);
   })
})

overlay.addEventListener('click', () => {
   const modals = document.querySelectorAll('.modal.active');
   modals.forEach(modal => {
         closeModal(modal);
   })
})

closeModalButtons.forEach(button => {
   button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      closeModal(modal);
   })
})

function openModal(modal) {
   if (modal == null) return
   modal.classList.add('active');
   overlay.classList.add('active');
}

function closeModal(modal) {
   if (modal == null) return
   modal.classList.remove('active');
   overlay.classList.remove('active');
}