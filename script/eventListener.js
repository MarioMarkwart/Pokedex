/**
 * check the scroll-y-position
 * if reached the bottom and autoload is checked run loadMorePokemon
 */
window.addEventListener('scroll', () => {
    // Calculate the distance from the top of the page to the scroll position
    let scrollTop = window.scrollY;

    // show/hide ScrollToTop-Button
    if (scrollTop > 100) document.getElementById('scrollUp').classList.remove('d-none');
    else document.getElementById('scrollUp').classList.add('d-none');

    // Calculate the total scrollable height
    let windowHeight = window.innerHeight;
    let fullHeight = document.body.offsetHeight;

    // Check if the scroll is within a certain range from the bottom
    if ((scrollTop + windowHeight >= fullHeight) && autoload && !searching) {
        loadMorePokemon();
    }
  })