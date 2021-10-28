// //GLOBAL CART WHILE HTML IS OPEN
// var cartArray = [];
// localStorage.setItem("cartArray", JSON.stringify(cartArray));
// localStorage.setItem("cartArray",[]); //console.log(localStorage.getItem("cartArray"));




// FOOD ITEM OBJ
function foodItem(category, amount, options, price, imgsrc){
    this.category=category;
    this.amount=amount;
    this.options=options;
    this.price=price;
    this.imgsrc = imgsrc;
}



// CART
function updateCartLabel(){
  cartArray = JSON.parse(localStorage.getItem("cartArray") || "[]");
  var cartSize = cartArray.length;
  // console.log("This much in cart: "+cartSize);
  if (cartSize > 0){
    $('#cartNavItem').text("Cart ("+cartSize+")");
  } else {
    $('#cartNavItem').text("Cart");
  }
}
updateCartLabel();




// DROP DOWN UPDATE PICTURE
$('#glz').change(function(){
  if(this.value == 0){
    $('.food-img')[0].src = "img/product-page/pumpkinspice.png";
  } else {
    $('.food-img')[0].src = "img/product-page/pumpkinspice-"+this.value+".png";
  }
});



// DROP DOWN UPDATE PRICE
$('#amt').change(function(){
  // console.log(this.value);
  if(this.value == "1"){
    $('.price').text("$3.99");
  } else if (this.value == "3") {
    $('.price').text("$10.99");
  } else if (this.value == "6") {
    $('.price').text("$20.99");
  } else if (this.value == "12") {
    $('.price').text("$40.99");
  }
});



// ADD TO CART ACTION
$('.cart-btn').click(function(){
  var cinnaroll = new foodItem(
    "Pumkin Spice Cinnamon Roll",
    $('#amt').val(),
    $('#glz').val(),
    $('.price').text(),
    $('.food-img').attr('src')
  );

  cartArray = JSON.parse(localStorage.getItem("cartArray") || "[]");
  cartArray.push(cinnaroll);
  localStorage.setItem("cartArray", JSON.stringify(cartArray));

  updateCartLabel();
  moveBanner();
});

// ADD TO WISH ACTION
$('.wish-btn').click(function(){
  var cinnaroll = new foodItem(
    "Pumkin Spice Cinnamon Roll",
    $('#amt').val(),
    $('#glz').val(),
    $('.price').text(),
    $('.food-img').attr('src')
  );

  wishArray = JSON.parse(localStorage.getItem("wishArray") || "[]");
  wishArray.push(cinnaroll);
  localStorage.setItem("wishArray", JSON.stringify(wishArray));
  moveBannerWish();
});


// ADD TO CART ANIMATION
function generateBanner(){
  $('body').append(`
    <div id="banner">
      <div id="bannertext">
        Item has been added to cart!
      </div>
    </div>
    `);
}
generateBanner();
function moveBanner(){
  $('#banner').animate({
        right: "+=325px",
      }, 300);
  $('#banner').delay(1000).animate({
        right: "-=325px",
      }, 300);
}

// ADD TO WISH ANIMATION
function generateBannerWish(){
  $('body').append(`
    <div id="bannerWish">
      <div id="bannertext">
        Item has been added to wishlist!
      </div>
    </div>
    `);
}
generateBannerWish();
function moveBannerWish(){
  console.log("move banner wish");

  $('#bannerWish').animate({
        right: "+=325px",
      }, 300);
  $('#bannerWish').delay(1000).animate({
        right: "-=325px",
      }, 300);
}
// function deleteBanner(){
//   $('#banner').delay(3000).remove();
// }


function clearCart(){
  localStorage.setItem("cartArray", JSON.stringify([]));
  cartTotal();
}

function clearWish(){
  localStorage.setItem("wishArray", JSON.stringify([]));
}



function displayItems(){
  cartArray = JSON.parse(localStorage.getItem("cartArray") || "[]");
  var cartSize = cartArray.length;

  $('.cart-items').text("");

  for (let i = 0; i < cartSize; ++i) {
    // console.log(t(cartArray[i].category));
    $('.cart-items').append(`
      <div class="added-item">
        <div class="image-cropper">
          <img class="added-img" src="`+ (cartArray[i].imgsrc) +`">
        </div>
        <div class="added-information">
          <div class="added-title">`+
            (cartArray[i].category)+`
          </div>
          <div class="added-misc">`+
            "x"+(cartArray[i].amount)+", "+(cartArray[i].options)+`
          </div>
          <div class="added-controls">
            <a href="#" onclick=removeItem(`+i+`)>Remove</a>
            <a href="#">Duplicate</a>
            <a href="#" onclick="saveToWish(cartArray[`+i+`]); removeItem(`+i+`);">Save to Wishlist</a>
          </div>
        </div>
        <div class="added-price">`+
          (cartArray[i].price)+`
        </div>
      </div>
      `);
  }
  if (cartSize == 0){
    $('.cart-items').append(`
      <span class="empty-info">
      Your cart is empty!
      </span>
      `);
  }

  // WISH LIST

  wishArray = JSON.parse(localStorage.getItem("wishArray") || "[]");
  var wishSize = wishArray.length;

  $('.cart-items').append(`
    <div id="wishlist">
      <span class="breadcrumb">
        <!-- <a class="breadcrumb" href="">Everything</a>  -->
        Wishlist&nbsp;&nbsp;&nbsp;
        <a class="clearbtn" href="" onclick="clearWish();" >Clear</a>
        <!-- Everything / Cinnamon Rolls -->
      </span>
      <br>
    </div>
    `);

  for (let i = 0; i < wishSize; ++i) {
    // console.log(t(cartArray[i].category));
    $('.cart-items').append(`
      <div class="added-item">
        <div class="image-cropper">
          <img class="added-img" src="`+ (wishArray[i].imgsrc) +`">
        </div>
        <div class="added-information">
          <div class="added-title">`+
            (wishArray[i].category)+`
          </div>
          <div class="added-misc">`+
            "x"+(wishArray[i].amount)+", "+(wishArray[i].options)+`
          </div>
          <div class="added-controls">
            <a href="#" onclick=removeWishItem(`+i+`)>Remove from Wishlist</a>
            <a href="#">Move to Cart</a>
          </div>
        </div>
        <div class="added-price2">`+
          (wishArray[i].price)+`
        </div>
      </div>
      `);
  }

  if (wishSize == 0){
    $('.cart-items').append(`
      <span class="empty-info">
      Your wish list is empty!
      </span>
      `);
  }

}
displayItems();


function saveToWish(item){
  wishArray = JSON.parse(localStorage.getItem("wishArray") || "[]");
  wishArray.push(item);
  localStorage.setItem("wishArray", JSON.stringify(wishArray));
  displayItems();
}


function removeItem(index){ //remove element from food cart
  console.log("Removing index "+index);
  cartArray = JSON.parse(localStorage.getItem("cartArray") || "[]");
  // var removed = cartArray.splice(index); //remove one element starting from given index
  //for some reason splice doesn't work, so i rewrote the cartArray
  var cartSize = cartArray.length;
  var newArray = [];
  for (let i = 0; i < cartSize; ++i) {
    if(index != i){
      newArray.push(cartArray[i])
    }
  }

  localStorage.setItem("cartArray", JSON.stringify(newArray));
  updateCartLabel();
  displayItems();
  cartTotal();

}

function removeWishItem(index){ //remove element from food cart
  console.log("Removing index "+index);
  cartArray = JSON.parse(localStorage.getItem("wishArray") || "[]");
  // var removed = cartArray.splice(index); //remove one element starting from given index
  //for some reason splice doesn't work, so i rewrote the cartArray
  var wishSize = wishArray.length;
  var newArray = [];
  for (let i = 0; i < wishSize; ++i) {
    if(index != i){
      newArray.push(wishArray[i])
    }
  }

  localStorage.setItem("wishArray", JSON.stringify(newArray));
  displayItems();

}


function cartTotal(){
  cartArray = JSON.parse(localStorage.getItem("cartArray") || "[]");
  var cartSize = cartArray.length;

  var sum = 0;
  console.log(sum);
  $('.added-price').each(function(){
      currency = $(this).text();
      number = Number(currency.replace(/[^0-9.-]+/g,""));
      sum += number;  // Or this.innerHTML, this.innerText
  });
  $('.cart-total').text("$"+round(sum,2))
  $('#cart-count').text(cartSize)
  // console.log(sum);
}
cartTotal();



// rounding function taken from https://www.jacklmoore.com/notes/rounding-in-javascript/
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}







// carousel START

// var slideIndex = 1;
// showDivs(slideIndex);
//
// function plusDivs(n) {
//   showDivs(slideIndex += n);
// }
//
// function currentDiv(n) {
//   showDivs(slideIndex = n);
// }
//
// function showDivs(n) {
//   var i;
//   var x = document.getElementsByClassName("mySlides");
//   var dots = document.getElementsByClassName("demo");
//   if (n > x.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = x.length}
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" w3-white", "");
//   }
//   x[slideIndex-1].style.display = "block";
//   dots[slideIndex-1].className += " w3-white";
// }
// carousel();
// function carousel() {
//   var i;
//   var x = document.getElementsByClassName("mySlides");
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";
//   }
//   slideIndex++;
//   if (slideIndex > x.length) {slideIndex = 1}
//   x[slideIndex-1].style.display = "block";
//   setTimeout(carousel, 2000); // Change image every 2 seconds
// }

// carousel END
