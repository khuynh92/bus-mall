'use strict';

//creating an array to store all image objects
Product.allProducts = [];
var totalClicks = 0;
function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  Product.allProducts.push(this);
  this.numOfClicks = 0;
  this.numTimesShown = 0;

}

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
var previousImages = [.4,.5,.6]; //placeholder numbers so that correct line of code in conditional will run


//for loop to locate image location in HTML and creating event listener for each image
for (var i =0; i < 3; i++) {
  imgEl[i] = document.getElementById('image-'+ (i + 1));
  imgEl[i].addEventListener('click', randomProduct);
}

//function to create random product images that appear on HTML, created with a do while loop that checks for duplicates in same row and also checks if any of the curent iteration of images matches the previous images.


function randomProduct () {

  for (var i = 0; i < 3; i++) {
    do {
      randomIndex[i] = Math.floor(Math.random() * Product.allProducts.length);
      imgEl[i].src = Product.allProducts[randomIndex[i]].filepath;
    } while ((randomIndex[i] === previousImages[0] || randomIndex[i] === previousImages[1] || randomIndex[i] === previousImages[2]) || randomIndex[0] === randomIndex[1] || randomIndex[0] === randomIndex[2] || randomIndex[1] === randomIndex[2]);
  }

  //creating an array for previous images
  for (var j = 0; j < randomIndex.length; j++) {
    previousImages[j] = randomIndex[j];
  }
  console.log('The random number for image one is: ' + randomIndex[0] + ', The random number for image two is: ' + randomIndex[1] + ', The random number for image three is ' + randomIndex[2]);

  //adding number of clicks to object instance

  //counting number of clicks
  for (var k = 0; k < 3; k++) {
    imgEl[k].onclick = function() {
      totalClicks++;
      console.log('Total Clicks is: ' + totalClicks);
    };
  }

  //stopping code when total clicks is 25
  if (totalClicks === 25) {
    alert('you did it!');
  }
}

randomProduct();
