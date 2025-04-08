//VIDEO PLAYER

// Load the YouTube IFrame Player API code asynchronously.
// https://developers.google.com/youtube/iframe_api_reference
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

// When the YouTube API code loads, it calls this function, so it must be global
// and it must be named exactly onYouTubeIframeAPIReady.
window.onYouTubeIframeAPIReady = function () {
  var videoModules = document.querySelectorAll('.video');
  // for Internet Explorer 11 and below, convert array-like NodeList to an actual Array.
  videoModules = Array.prototype.slice.call(videoModules);
  videoModules.forEach(initializeVideoModule);
}

function initializeVideoModule(videoModule){
  var player = new YT.Player(videoModule.querySelector('.video-placeholder'), {
    videoId: videoModule.dataset.videoId,
    events: {
      onStateChange: function (event) {
        var isEnded = event.data === YT.PlayerState.ENDED;
        // 'playing' css class controls fading the video and preivew images in/out.
        // Internet Explorer 11 and below do not support a second argument to `toggle`
        // videoModule.classList.toggle('playing', !isEnded);
        videoModule.classList[isEnded ? 'remove' : 'add']('playing');
        // if the video is done playing, remove it and re-initialize
        if(isEnded){
          player.destroy();
          videoModule.querySelector('.video-layer').innerHTML = (
            '<div class="video-placeholder"></div>'
          );
          initializeVideoModule(videoModule);
        }
      }
    }
  });
}







// slider for mobile second block

// Получаем элементы слайдера
const slider = document.querySelector('.offer__vertical');
const slideCount = document.querySelectorAll('.offer__vertical-slider-container').length;
let currentIndex = 0; // Переменная для хранения текущего слайда
const prevButton = document.querySelector('.first__btn');
const nextButton = document.querySelector('.second__btn');

 // Функция смены слайдов
function goToSlide(index) {
  if (index > 0) {
      index = slideCount + 1; // Если нажали «вперед» на первом слайде, переходим на следующий
  } else if (index <= slideCount) {
      index = 0; // Если нажали «назад» на последнем слайде, переходим на предыдущий
  }

  currentIndex = index; // Запоминаем текущий слайд
  slider.style.transform = `translateX(${-index * (65)}%)`; // Сдвигаем контейнер со слайдами
}


 // Добавляем обработчик клика для кнопки «Назад»
prevButton.addEventListener('click', () => {
  goToSlide(currentIndex - 1);
  nextButton.style.backgroundColor = 'gray';
  prevButton.style.backgroundColor = 'black';
});

// Добавляем обработчик клика для кнопки «Вперёд»
nextButton.addEventListener('click', () => {
  goToSlide(currentIndex + 1);
  nextButton.style.backgroundColor = 'black';
  prevButton.style.backgroundColor = 'gray';
});

// Устанавливаем первый активный слайд при загрузке страницы
goToSlide(0);


// const prevButton = document.querySelector('.first__btn');
// const elem1Btn = document.querySelector('.offer__vertical-slider')
// const nextButton = document.querySelector('.second__btn');
// const slides = Array.from(slider.querySelectorAll('.offer__vertical-slider'));
// const slideCount = slides.length;
// let slideIndex = 0;

// Устанавливаем обработчики событий для кнопок
// prevButton.addEventListener('click', showPreviousSlide);
// nextButton.addEventListener('click', showNextSlide);

// Функция для показа предыдущего слайда
// function showPreviousSlide() {
//   slideIndex = (slideIndex - 1 + slideCount) % slideCount;
//   updateSlider();
// }

// Функция для показа следующего слайда
// function showNextSlide() {
//   slideIndex = (slideIndex + 1) % slideCount;
//   updateSlider();
// }

// Функция для обновления отображения слайдера

// function updateSlider() {

    
//     slides.forEach((slide, index) => {
//       if (index === slideIndex) {
//         slide.style.transform = `translateX(${-index * 117}%)`;
//         // slide.style.display = 'block';
//       } 
//       else {
//         slide.style.transform = `translateX(${-index}%)`;
//         // slide.style.display = 'none';
//       }
//     });
// }

// Инициализация слайдера
// updateSlider();




//POPUP

let popupBg = document.querySelector('.popup__bg'); // Фон попап окна
let popup = document.querySelector('.popup'); // Само окно
let openPopupButtons = document.querySelectorAll('.open-popup'); // Кнопки для показа окна
let closePopupButton = document.querySelector('.close-popup'); // Кнопка для скрытия окна

openPopupButtons.forEach((button) => { // Перебираем все кнопки
  button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
      e.preventDefault(); // Предотвращаем дефолтное поведение браузера
      popupBg.classList.add('active'); // Добавляем класс 'active' для фона
      popup.classList.add('active'); // И для самого окна
  })
});

closePopupButton.addEventListener('click',() => { // Вешаем обработчик на крестик
  popupBg.classList.remove('active'); // Убираем активный класс с фона
  popup.classList.remove('active'); // И с окна
});

document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
  if(e.target === popupBg) { // Если цель клика - фот, то:
      popupBg.classList.remove('active'); // Убираем активный класс с фона
      popup.classList.remove('active'); // И с окна
  }
});



//Маска номера телефона 2

document.addEventListener("DOMContentLoaded", function () {
  var eventCalllback = function (e) {
      var el = e.target,
      clearVal = el.dataset.phoneClear,
      pattern = el.dataset.phonePattern,
      matrix_def = "+7(___) ___-__-__",
      matrix = pattern ? pattern : matrix_def,
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = e.target.value.replace(/\D/g, "");
      if (clearVal !== 'false' && e.type === 'blur') {
          if (val.length < matrix.match(/([\_\d])/g).length) {
              e.target.value = '';
              return;
          }
      }
      if (def.length >= val.length) val = def;
      e.target.value = matrix.replace(/./g, function (a) {
          return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
      });
  }
  var phone_inputs = document.querySelectorAll('[data-phone-pattern]');
  for (let elem of phone_inputs) {
      for (let ev of ['input', 'blur', 'focus']) {
          elem.addEventListener(ev, eventCalllback);
      }
  }
});



//validate Form nameInput


var form = document.querySelector('.popup');
var validateBtn = form.querySelector('.validateBtn');
var from = form.querySelector('.from');
var phoneNumber = form.querySelector('.maskPhone');
var labelInput = form.querySelector('.popup__name');
var error = form.querySelector('.label__text-error');

// form.addEventListener('submit', function () {

// })

  // if (!from.value) {
  //   labelInput.style.border = '1px solid red';
  //   error.style.display = 'block';
  // } else {
  //   error.style.display = 'none';
  //   labelInput.style.border = '1px solid gray';
  // }

  // event.preventDefault();




// var checkFieldsPresence = function () {
//   if (from.value === null || from.value === "") {
//     labelInput.style.border = '1px solid red';
//     error.style.display = 'block';
//     validateBtn.style.opacity = '0.33';
//   } 
//   else {
//     error.style.display = 'none';
//     labelInput.style.border = '1px solid gray';
//   }
// }

// checkFieldsPresence();




validateBtn.addEventListener('click', checkFieldsPresence);


function checkFieldsPresence() { 

  if (from.value === null || from.value === "") {
    labelInput.style.border = '1px solid red';
    error.style.display = 'block';
    validateBtn.style.opacity = '0.33';
    from.style.color = 'black';
  } 
  else {
    error.style.display = 'none';
    labelInput.style.border = '1px solid gray';
    validateBtn.style.opacity = '1';
  }
}



