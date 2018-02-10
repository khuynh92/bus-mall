'use strict';

//creating an array to store all image objects
Product.allProducts = [];

function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  Product.allProducts.push(this);
}

//creating 

new Product('bag', 'images/bag.jpg');
new Product('banana', 'images/banana.jpg');
new Product('bathroom', 'images/bathroom.jpg');
new Product('boots', 'images/boots.jpg');
new Product('breakfast', 'images/breakfast.jpg');
new Product('bubblegum', 'images/bubblegum.jpg');
new Product('chair', 'images/chair.jpg');
new Product('cthulhu', 'images/cthulhu.jpg');
new Product('dog-duck', 'images/dog-duck.jpg');
new Product('dragon', 'images/dragon.jpg');
new Product('pen', 'images/pen.jpg');
new Product('pet-sweep', 'images/pet-sweep.jpg');
new Product('tauntaun','images/tauntaun.jpg');
new Product('unicorn','images/unicorn.jpg');
new Product('usb', 'images/usb.gif');
new Product('water-can', 'images/water-can.jpg');
new Product('wine-glass', 'images/wine-glass.jpg');

var imgEl = [];
var randomIndex = [.1,.2,.3]; //placeholder numbers so that correct line of code in conditional will run
var previousImages =[.4,.5,.6]; //placeholder numbers so that correct line of code in conditional will run


//for loop to locate image location in HTML and creating event listener for each image
for (var i =0; i < 3; i++) {
  imgEl[i] = document.getElementById('image-'+ (i + 1));
  imgEl[i].addEventListener('click', randomProduct);
}

//function to create random product images that appear on HTML
function randomProduct () {
  // do while loop to ensure that none of the images are the same
  do {
    for (var j = 0; j < 3; j++) {
      randomIndex[j] = Math.floor(Math.random() * Product.allProducts.length);
      imgEl[j].src = Product.allProducts[randomIndex[j]].filepath;
    }
  } while (randomIndex[0] === randomIndex[1] || randomIndex[0] === randomIndex[2] || randomIndex[1] === randomIndex[2]);

  //to ensure that no images are from the previous image
  for (var k = 0; k < 3; k++) {
    if (randomIndex[k] === previousImages[0] || randomIndex[k] === previousImages[1] || randomIndex[k] === previousImages[2]) {
      console.log('previous image detected!');
      for (var l = 0; l < 3; l++) {
        do {
          randomIndex[l] = Math.floor(Math.random() * Product.allProducts.length);
          imgEl[l].src = Product.allProducts[randomIndex[l]].filepath;
        } while ((randomIndex[l] === previousImages[0] || randomIndex[l] === previousImages[1] || randomIndex[l] === previousImages[2]) || randomIndex[0] === randomIndex[1] || randomIndex[0] === randomIndex[2] || randomIndex[1] === randomIndex[2]);
      }
    }
  }
  //creating an previous image array to compare with randomIndex
  for (var n = 0; n < randomIndex.length; n++) {
    previousImages[n] = randomIndex[n];
  }
  console.log('The random number for image one is: ' + randomIndex[0] + ', The random number for image two is: ' + randomIndex[1] + ', The random number for image three is ' + randomIndex[2]);
}
randomProduct();