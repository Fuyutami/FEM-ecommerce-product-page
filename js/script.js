'use strict'

// VARIABLES
let quantity = 0
let inCartNumber = 0;



// Quantity controls
const btnAdd = document.querySelector('.quantity-controls__add')
const btnSubstract = document.querySelector('.quantity-controls__substract')
const quantityField = document.querySelector('.quantity-controls__amount')

btnAdd.addEventListener('click', function () {
    quantity++
    quantityField.textContent = quantity
})

btnSubstract.addEventListener('click', function () {
    if(quantity > 0) {
        quantity--
        quantityField.textContent = quantity
    }
})


// Product gallery
const largePrew = document.querySelector('.product-gallery__large-preview')
const thumbnailContainer = document.querySelector('.product-gallery__thumbnails')
const thumbnails = document.querySelectorAll('.product-gallery__thumb-prew')


thumbnailContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.product-gallery__thumb-prew')
    
    if(!clicked) return

    console.log(clicked)
    thumbnails.forEach(t => t.classList.remove('product-gallery__thumb-active'))
    clicked.classList.add('product-gallery__thumb-active')

    largePrew.style.backgroundImage = `url(../images/image-product-${clicked.dataset.thumb}.jpg)`
})


// Add to cart
const btnToCart = document.querySelector('.btn-to-cart')
const cartNumber = document.querySelector('.user-nav__cart-number')

btnToCart.addEventListener('click', function () {
    if(quantity) {
        inCartNumber += quantity
        cartNumber.textContent = inCartNumber
        cartNumber.classList.remove('hidden')
    }
})