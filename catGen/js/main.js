  let button1 = document.getElementById('newCat');
  button1.addEventListener('click', () => {
      
      // let i = Math.floor(Math.random() * dataText.length);
      // let quote = document.querySelector('blockquote');
      // quote.innerText = dataText[i].text;
      
      let quote = document.querySelector('blockquote');
      quote.innerText = getCatText();

      let i2 = Math.floor(Math.random() * dataImg.length);
      let img = document.querySelector('img');
      img.src = 'img/Pictures of Cats/' + dataImg[i2].img;
  });

  function getCatText() {
    const seed = Math.random();
    let selected = document.getElementById('select').value;
    const filteredData = dataText.filter(quote => quote.tag === selected);
    if (selected != 'All') {
      const i = (Math.floor(seed * filteredData.length));
      return filteredData[i].text;
    } else {
      const i = (Math.floor(seed * dataText.length));
      return dataText[i].text;
    }
  };

function saveCat() {
    let savedImg = document.getElementById('newcat').src;
    let savedText = document.getElementById('newquote').innerText;

    let savedCat = {img:savedImg, quote:savedText};
    // const savedCat = [{"img": savedImg}, {"quote": savedText}];
    return savedCat;
    
}

  const catFactory = (obj) => {
    const makeCat=
    ` <div class="qpbottom">
        <img src= ${obj.img} alt="cat" /> 
        <blockquote class="quote"> ${obj.quote} </blockquote>
        <button class="circle" onClick="this.parentElement.remove();"> <nobr> X </nobr> </button>
      </div>
    `;
    return makeCat;
  }

  function displayCat() {
    let parentNode = document.getElementById('saved');
    parentNode.insertAdjacentHTML('afterbegin', catFactory(saveCat()));
  }

  let button2 = document.getElementById('saveCat');
  button2.addEventListener('click', () => {  displayCat(); });