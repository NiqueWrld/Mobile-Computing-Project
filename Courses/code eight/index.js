let lastScrollTop = 0;
const header = document.getElementById("header");
const main = document.getElementsByClassName("parent-container");

window.addEventListener("scroll", function() {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // Scroll down
    header.style.top = "-100px"; // Adjust this value according to the height of your header
    main.style.marginTop = "100px";
  } else {
    // Scroll up
    header.style.top = "0";
    main.style.marginTop = "0";
  }

  lastScrollTop = currentScroll;
});