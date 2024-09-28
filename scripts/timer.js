// A script to find all sections with the class "timer-[time]" and create a countdown timer for each one

// slide is a <section> element
// Once location changed, check if the current slide has a timer, and automatically start it

let moveSlide = null;

window.navigation.addEventListener('navigate', (event) => {
  if (moveSlide) {
    clearInterval(moveSlide);
  }

  const targetUrl = event.destination.url;
  const slideNumber = parseInt(targetUrl.split('#')[1]);
  // Find section with id
  const slide = document.getElementById(`${slideNumber}`);

  // Check if the slide class contains timer
  const hasTimer = slide.classList.contains('timer');
  if (!hasTimer) {
    console.log('No timer found');
    return;
  }
  // Find timer-[time] class
  const timerClass = Array.from(slide.classList).find((className) =>
    className.includes('timer-')
  );
  let time = parseInt(timerClass.split('-')[1]);
  console.log('Timer found:', time);

  // Add timer element to the slide
  // absolutely positioned on top of the slide like a progress bar
  const timerElement = document.createElement('div');
  timerElement.classList.add('timer-counter');
  timerElement.style.transition = `width ${time}s linear`;
  slide.appendChild(timerElement);

  // Start the timer after the slide is loaded
  // The timer will be a progress bar that fills up in time

  const timer = setTimeout(() => {
    timerElement.style.width = '0%';
    clearInterval(timer);
  }, 1);

  const isAutoMove = slide.classList.contains('timer-auto');

  if (!isAutoMove) return;
  // Once the timer is done, navigate to the next slide
  moveSlide = setInterval(() => {
    window.location.hash = `#${slideNumber + 1}`;
    clearInterval(moveSlide);
  }, time * 1000);
});
