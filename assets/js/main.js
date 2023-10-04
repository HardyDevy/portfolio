(function() {
  "use strict";

  /** Easy selector helper function */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /** Easy event listener function */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /** Easy on scroll event listener */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('#portfolio-grid');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.item',
      });

      let portfolioFilters = select('#filters a', true);

      on('click', '#filters a', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('active');
        });
        this.classList.add('active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /** Animation on scroll */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

$(".modalbtn").on("click", function() { // when item with class of modalbtn is clicked, fire function
  var modal = $(this).data("modal"); // sets modal var equal to data attribute
  $(modal).show(); // opens up modal (much code hidden here by jQuery)
});

$(".modal").on("click", function(e) { // sets up click function
  var className = e.target.className; // var className set to event target
  if(className === "modal" ||  className === "justifyContentCenterRow" || className === "modal-content2" || className === "modal-image-container" || className === "closecontainer" || className === "close"){
    $(this).closest(".modal").hide(); // if click on one of those, then hide the modal
  }
});

function nextImage(int) {
  let id = int;
  var modal = document.getElementById(id);
  modal.style="display: none;";
  int+=1;
  let id2 = int;
  var modal = document.getElementById(id2);
  if (modal === null){
    int = 1;
    let id2 = int;
    var modal = document.getElementById(id2);
  }
  modal.style="display: block;";
}

function previousImage(int) {
  let id = int;
  var modal = document.getElementById(id);
  modal.style="display: none;";
  int-=1;
  var NumModalsStr = document.getElementById("numModals");
  let numModals = NumModalsStr.innerText;
  if (int < 1){int = numModals}
  let id2 = int.toString();
  var modal2 = document.getElementById(id2);
  modal2.style="display: block;";
}

function skipToImage(currentid, nextid) {
  let id = currentid;
  var modal = document.getElementById(id);
  modal.style="display: none;";

  let id2 = nextid;
  var modal = document.getElementById(id2);
  modal.style="display: block;";
}