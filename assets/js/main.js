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

// Old Modals
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

function skipToImage(nextid) {
  buildModal(nextid, 'vipstructures');
}

// New Modals
function buildModal(currentid){

  let id = currentid;
  let numModals = document.getElementById("numModals").innerText;
  let currentpage = document.getElementById("currentPage").innerText;
  var modal = document.getElementById("modal");

  let fillHTML = '<div class="justifyContentCenterRow"><div class="dotsContainer">';
  
  for (i=0; i<id-1; i++){
    fillHTML +='<span class="dots" onclick="skipToImage('+(i+1)+')">○</span>' //Empty circles until the current id
    console.log(i);
  }

  fillHTML += '<span class="dots">●</span>'; //Filled circle on the current id
  
  for (j=id; j<numModals; j++){
    fillHTML +='<span class="dots" onclick="skipToImage('+(j+1)+')">○</span>' //Empty circles until the last modal
  }

  fillHTML += '</div><div class="modal-content2"><div class="closecontainer"><span class="close">&times;</span></div>'
  
  if(id != numModals){
  fillHTML += '<span class="rightarrow" onclick="buildModal('+(id+1)+')">&#8594;</span>'
  }
  else{
    fillHTML += '<span class="rightarrow" onclick="buildModal('+(1)+')">&#8594;</span>'
  }

  fillHTML += modalarray[currentpage][(id-1)]; //This should be accessing an array to get the images

  if(id > 1){
    fillHTML += '/></div><span class="leftarrow" onclick="buildModal('+(id-1)+')">&#8592;</span></div></div>';
  }
  else{
    fillHTML += '/></div><span class="leftarrow" onclick="buildModal('+(numModals)+')">&#8592;</span></div></div>';
  }

  modal.className = "modal";
  modal.style = "display:block;";
  modal.innerHTML = fillHTML;
}

document.onclick= function(e) { // Close modals
  var className = e.target.className;
  if(className === "modal" ||  className === "justifyContentCenterRow" || className === "modal-content2" || className === "modal-image-container" || className === "closecontainer" || className === "close"){
    var modal = document.getElementById("modal");
    modal.style = "display: none;"
    modal.innerHTML = "";
  }
}