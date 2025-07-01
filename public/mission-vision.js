const mission = document.querySelector('.mv-mission');
const vision = document.querySelector('.mv-vision');

document.getElementById('btn-mission').addEventListener('click', () => switchSlide('mission'));
document.getElementById('btn-vision').addEventListener('click', () => switchSlide('vision'));

function switchSlide(type) {
  const isMissionActive = mission.classList.contains('active');

  if (type === 'mission' && !isMissionActive) {
    // Hide vision, show mission
    vision.classList.remove('active');
    vision.classList.add('exit-right');

    setTimeout(() => {
      vision.classList.remove('exit-right');
      mission.classList.add('active');
    }, 600);
  }

  if (type === 'vision' && isMissionActive) {
    // Hide mission, show vision
    mission.classList.remove('active');
    mission.classList.add('exit-left');

    setTimeout(() => {
      mission.classList.remove('exit-left');
      vision.classList.add('active');
    }, 600);
  }
}
