const imgInnerContainer = document.querySelector('.gallery__inner-container');

function shuffle(array) {
  for (let i = array.length - 1; i > 1; i--) {
    let j = Math.floor(Math.random() * (i)); 
      [array[i], array[j]] = [array[j], array[i]];
    }
}

function mixImages() {
  let imgPathArr= [];
  
  let i = 0;
  while (i < 15) {
    imgPathArr[i] = `./assets/img/gallery/galery${i + 1}.jpg`;
    i++;
  }
  
  shuffle(imgPathArr);
  imgInnerContainer.innerHTML = '';
  imgPathArr.map(image => imgInnerContainer.innerHTML += `<img class="gallery__item" src=${image} alt="Artwork of Louvre collection">`);
}

mixImages();

const scroll = window.requestAnimationFrame || 
               function(callback) {
                 window.setTimeout(callback, 1000 / 60);
               };
const galleryItems = document.querySelectorAll('.gallery__item');


function isItemInViewport(item) {
  const rect = item.getBoundingClientRect();
  return (
    (rect.top <= 0 && rect.bottom >= 0)
    ||
    (rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}

function checkVisibility() {
  Array.prototype.forEach.call(galleryItems, function(item) {
    if (isItemInViewport(item)) {
      item.classList.add('show');
    } else {
      item.classList.remove('show');
    }
  });

  scroll(checkVisibility);
}

checkVisibility();
