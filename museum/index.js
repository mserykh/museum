const progressVideo = document.querySelector('.controls__progress-bar');
  
progressVideo.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${value}%, #C4C4C4 ${value}%)`
})
 
const volumeChange = document.querySelector('.controls__volume-slider');
  
volumeChange.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${value}%, #C4C4C4 ${value}%)`
})
 

