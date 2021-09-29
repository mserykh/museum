function mixImages() {
  const imgInnerContainer = document.querySelector('.gallery__inner-container');
  
  let imgPathArr= [];
  
  let i = 0;
  while (i < 15) {
    imgPathArr[i] = `./assets/img/gallery/galery${i + 1}.jpg`;
    i++;
  }
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 1; i--) {
      let j = Math.floor(Math.random() * (i)); 
        [array[i], array[j]] = [array[j], array[i]];
      }
}
  
  shuffle(imgPathArr);
  imgInnerContainer.innerHTML = '';
  imgPathArr.map(image => imgInnerContainer.innerHTML += `<img class="gallery__item" src=${image} alt="Artwork of Louvre collection">`);
}

mixImages();
