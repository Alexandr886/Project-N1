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
      //замена значений в круглом progress - кол-во лет
      years.innerHTML = (input.value / 100 * 10).toFixed(0);
      yearsInWords.innerHTML = declOfNum((input.value / 100 * 10).toFixed(0), ['год', 'года', 'лет']);

      //замена значений в круглом progress - кол-во проектов
      projects.innerHTML = (input.value / 100 * 100).toFixed(0);
      projectsInWords.innerHTML = declOfNum((input.value / 100 * 100).toFixed(0), ['проект', 'проекта', 'проектов']);

   });
}

//функция для склонения слов в progress-кругах
function declOfNum(n, text_arr) {
   n = Math.abs(n) % 100
   var n1 = n % 10
   if (n > 10 && n < 20) {
     return text_arr[2]
   }
   if (n1 > 1 && n1 < 5) {
     return text_arr[1]
   }
   if (n1 == 1) {
     return text_arr[0]
   }
   return text_arr[2]
 }


//--------------Работа с ползунком (slider-range) 
input.addEventListener('mousemove', range);
input.addEventListener('touchmove', range);
input.addEventListener('click', range);
input.addEventListener('touchend', range);
   
function range() {
   let x = input.value;
   let color = 'linear-gradient(90deg, #BFA4FF, #FF4F72, #FFC359 ' + x + '%, #23364C ' + x + '%)';
   input.style.background = color;
}


//----------------выбор цвета у кроссовок
const colors = document.querySelectorAll('.color');

for (let i = 0; i < colors.length; i++) {
   colors[i].addEventListener('click', function() {
      colors[i].classList.toggle('color-active');
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
new Swiper('.slider', {
   //изначально показ только одно слайда и потом через breakpoints добавим
   slidesPerView: '1',
   //расстояние между слайдами
   spaceBetween: 30,
   //вывод пагинации
   pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
      //clickable: true,
   },
   //кнопки-стрелки для прокрутки слайдера
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
   //чтобы срабатывало перетаскивание слайдов мышью.
   simulateTouch: true,
   //слайды круттся по скроллу колеса мыши
   mousewheel: {
      sensitivity: 1,
   },
   //бесконечная прокрутка слайдов
   loop: true,
   breakpoints: {
      768: {slidesPerView: '2',},
      1024: {slidesPerView: '3',},
      1440: {slidesPerView: '4',},
   }
});