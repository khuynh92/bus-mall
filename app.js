'use strict';

//creating an array to store all image objects
var allProducts = Product.allProducts = [];
var totalClicks = 0;

function Product(name, filepath, numOfClicks, numTimesShown) {
  this.name = name;
  this.filepath = filepath;
  Product.allProducts.push(this);
  this.numOfClicks = 0;
  this.numTimesShown = 0;

}

new Product('bag', 'images/bag.jpg', 0, 0);
new Product('banana', 'images/banana.jpg', 0, 0);
new Product('bathroom', 'images/bathroom.jpg', 0, 0);
new Product('boots', 'images/boots.jpg', 0, 0);
new Product('breakfast', 'images/breakfast.jpg', 0, 0);
new Product('bubblegum', 'images/bubblegum.jpg', 0, 0);
new Product('chair', 'images/chair.jpg', 0, 0);
new Product('cthulhu', 'images/cthulhu.jpg', 0, 0);
new Product('dog-duck', 'images/dog-duck.jpg', 0, 0);
new Product('dragon', 'images/dragon.jpg', 0, 0);
new Product('pen', 'images/pen.jpg', 0, 0);
new Product('pet-sweep', 'images/pet-sweep.jpg', 0, 0);
new Product('tauntaun','images/tauntaun.jpg', 0, 0);
new Product('unicorn','images/unicorn.jpg', 0, 0);
new Product('usb', 'images/usb.gif', 0, 0);
new Product('water-can', 'images/water-can.jpg', 0, 0);
new Product('wine-glass', 'images/wine-glass.jpg', 0, 0);

var imgEl = [];
var randomIndex = [.1,.2,.3]; //placeholder numbers so that correct line of code in conditional will run the first time
var previousImages = [.4,.5,.6]; //placeholder numbers so that correct line of code in conditional will run the first time


//for loop to locate image location in HTML and creating event listener for each image
for (var i =0; i < 3; i++) {
  imgEl[i] = document.getElementById('image-'+ (i + 1));
  imgEl[i].addEventListener('click', tallyCounter);
}

//function to create random product images that appear on HTML, created with a do while loop that checks for duplicates in same row and also checks if any of the curent iteration of images matches the previous images.

function randomProduct () {

  //creating img based on name of product instance
  for (var i = 0; i < 3; i++) {
    do {
      randomIndex[i] = Math.floor(Math.random() * Product.allProducts.length);
      imgEl[i].src = Product.allProducts[randomIndex[i]].filepath;
    } while ((randomIndex[i] === previousImages[0] || randomIndex[i] === previousImages[1] || randomIndex[i] === previousImages[2]) || randomIndex[0] === randomIndex[1] || randomIndex[0] === randomIndex[2] || randomIndex[1] === randomIndex[2]);
  }

  //changing id from generic to specific id
  for (var l = 0; l < 3; l++) {
    imgEl[l].setAttribute('id', Product.allProducts[randomIndex[l]].name);
  }

  console.log('The random number for image one is: ' + randomIndex[0] + ', The random number for image two is: ' + randomIndex[1] + ', The random number for image three is ' + randomIndex[2]);

  //creating an array for previous images
  for (var j = 0; j < randomIndex.length; j++) {
    previousImages[j] = randomIndex[j];
  }
  tallyCounter();
}

function tallyCounter() {
  var clickedImage = 0;
  //storing which image was clicked in clickedImage
  imgEl[0].onclick = function () {
    clickedImage = allProducts[previousImages[0]];
    clickedImage.numOfClicks++;
    totalClicks++;
    console.log(allProducts[previousImages[0]].name + ' was clicked');
    console.log('Total clicks is: ' + totalClicks);
    randomProduct();
  };
  imgEl[1].onclick = function () {
    clickedImage = allProducts[previousImages[1]];
    clickedImage.numOfClicks++;
    totalClicks++;
    console.log(allProducts[previousImages[1]].name + ' was clicked');
    console.log('Total clicks is: ' + totalClicks);
    randomProduct();
  };
  imgEl[2].onclick = function () {
    clickedImage = allProducts[previousImages[2]];
    clickedImage.numOfClicks++;
    totalClicks++;
    console.log(allProducts[previousImages[2]].name + ' was clicked');
    console.log('Total clicks is: ' + totalClicks);
    randomProduct();
  };

}

randomProduct();