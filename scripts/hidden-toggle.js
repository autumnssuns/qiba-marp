// A function to toggle a .hidden class on an element
function toggleHidden(element) {
  element.classList.toggle('hidden');
}

// Find all elements with the class .hidden,
// and add a click event listener to each one
function onLoad() {
  document.querySelectorAll('.hidden').forEach(function (hiddenElement) {
    hiddenElement.addEventListener('click', function () {
      toggleHidden(hiddenElement);
    });
  });
}

// Run the onLoad function when the page loads
document.addEventListener('DOMContentLoaded', onLoad);
