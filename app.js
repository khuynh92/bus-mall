'use strict';

//creating an array to store all image objects
Product.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var allProducts = Product.allProducts = [];
var totalClicks = -1;
var allNumOfClicks = [];
var allNumTimesShown = [];
var randomColors = [];

function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  Product.allProducts.push(this);
  this.numOfClicks = 0;
  this.numTimesShown = 0;
}

// instantiating new Products with a for loop
for (var i = 0; i < Product.names.length; i++) {
  if (Product.names[i] === 'usb') {
    new Product(Product.names[i], 'images/' + Product.names[i] + '.gif');
  } else {
    new Product(Product.names[i], 'images/' + Product.names[i] + '.jpg');
  }
}

var imgEl = [];
var randomIndex = [.1, .2, .3]; //placeholder numbers so that correct line of code in conditional will run the first time
var previousImages = [.4, .5, .6]; //placeholder numbers so that correct line of code in conditional will run the first time

//for loop to locate image location in HTML and creating event listener for each image
for (var j = 0; j < 3; j++) {
  imgEl[j] = document.getElementById('image-' + (j + 1));
  imgEl[j].addEventListener('click', tallyCounter);
}

//random color for charts
for (var z = 0; z < allProducts.length; z++) {
  var randomNumber1 = Math.floor(Math.random() * 256);
  var randomNumber2 = Math.floor(Math.random() * 256);
  var randomNumber3 = Math.floor(Math.random() * 256);
  var randomColor = 'rgb(' + randomNumber1 + ', ' + randomNumber2 + ', ' + randomNumber3 + ')';
  randomColors.push(randomColor);
}
//function to create random product images that appear on HTML, created with a do while loop that checks for duplicates in same row and also checks if any of the curent iteration of images matches the previous images.
function randomProduct() {
  totalClicks++;
  var totalClicksStringify = JSON.stringify(totalClicks);
  localStorage.setItem('totalClicksData', totalClicksStringify);
  if (totalClicks >= 25) {
    for (var k = 0; k < 3; k++) {
      imgEl[k].removeEventListener('click', tallyCounter);
      imgEl[k].onclick = function () {
        return false;
      };
    }
    console.log('creating data!');
    var ctx1 = document.getElementById('chart1');

    for (var l = 0; l < allProducts.length; l++) {
      allNumOfClicks.push(allProducts[l].numOfClicks);
      allNumTimesShown.push(allProducts[l].numTimesShown - allProducts[l].numOfClicks);
    }
    //random color 
    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: Product.names,
        datasets: [
          {
            label: '# of Votes',
            data: allNumOfClicks,
            backgroundColor: randomColors
          }, {
            label: '# of Times Shown',
            data: allNumTimesShown,
            backgroundColor: 'gray',
          }
        ]
      },
      options: {
        tooltips: { enabled: false },
        title: {
          display: true,
          text: 'Number of Times Product is Chosen'
        },
        scales: {

          xAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }],
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }],

        }
      }
    });
  }
  //creating img based on name of product instance
  for (var m = 0; m < 3; m++) {
    do {
      randomIndex[m] = Math.floor(Math.random() * Product.allProducts.length);
      imgEl[m].src = Product.allProducts[randomIndex[m]].filepath;
    } while ((randomIndex[m] === previousImages[0] || randomIndex[m] === previousImages[1] || randomIndex[m] === previousImages[2]) || randomIndex[0] === randomIndex[1] || randomIndex[0] === randomIndex[2] || randomIndex[1] === randomIndex[2]);
  }
  //display number of times image is shown
  for (var n = 0; n < 3; n++) {
    allProducts[randomIndex[n]].numTimesShown++;
  }
  //changing id from generic to specific id
  for (var o = 0; o < 3; o++) {
    imgEl[o].setAttribute('id', Product.allProducts[randomIndex[o]].name);
  }

  console.log('The random number for image one is: ' + randomIndex[0] + ', The random number for image two is: ' + randomIndex[1] + ', The random number for image three is ' + randomIndex[2]);
  //creating an array for previous images
  for (var p = 0; p < randomIndex.length; p++) {
    previousImages[p] = randomIndex[p];
  }
  var allProductsStringify = JSON.stringify(allProducts);
  localStorage.setItem('storeData', allProductsStringify);
}

function tallyCounter() {
  if (totalClicks === -1) {
    randomProduct();
  }
  if (totalClicks >= 0) {
    //storing which image was clicked in clickedImage
    imgEl[0].onclick = function () {
      var clickedImage = allProducts[previousImages[0]];
      clickedImage.numOfClicks++;
      console.log(allProducts[previousImages[0]].name + ' was clicked');
      randomProduct();
      console.log('Total clicks is: ' + totalClicks);
    };
    imgEl[1].onclick = function () {
      var clickedImage = allProducts[previousImages[1]];
      clickedImage.numOfClicks++;
      console.log(allProducts[previousImages[1]].name + ' was clicked');
      randomProduct();
      console.log('Total clicks is: ' + totalClicks);
    };
    imgEl[2].onclick = function () {
      var clickedImage = allProducts[previousImages[2]];
      clickedImage.numOfClicks++;
      console.log(allProducts[previousImages[2]].name + ' was clicked');
      randomProduct();
      console.log('Total clicks is: ' + totalClicks);
    };
  }
}

(function getLocalStorage() {
  if (localStorage.totalClicksData) {
    var totalClicksStringify = localStorage.getItem('totalClicksData');
    var totalClicksData = JSON.parse(totalClicksStringify);
    totalClicks = totalClicksData;
    totalClicks--;
  }
  if (localStorage.storeData) {
    var allProductsStringify = localStorage.getItem('storeData');
    var storeData = JSON.parse(allProductsStringify);
    allProducts = storeData;
    randomProduct();
    tallyCounter();
  } else {
    tallyCounter();
  }
})();

//function for removing local storage
var buttonEl = document.getElementById('button');
buttonEl.addEventListener('click', function () {
  localStorage.clear();
  location.reload();
});
