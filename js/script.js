'use strict'

// VARIABLES
let quantity = 0
let inCartNumber = 0;
let lightboxThumbNr = 1



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

largePrew.addEventListener('click', function () {
    lightBigPrew.style.backgroundImage = `url(../images/image-product-${lightboxThumbNr}.jpg)`
    lightThumbs[lightboxThumbNr-1].classList.add('lightbox__thumbnail--active')
    lightbox.classList.remove('hidden')
})

thumbnailContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.product-gallery__thumb-prew')
    
    if(!clicked) return

    console.log(clicked)
    thumbnails.forEach(t => t.classList.remove('product-gallery__thumb-active'))
    clicked.classList.add('product-gallery__thumb-active')

    largePrew.style.backgroundImage = `url(../images/image-product-${clicked.dataset.thumb}.jpg)`
    lightboxThumbNr = clicked.dataset.thumb
})


// Add to cart
const btnToCart = document.querySelector('.btn-to-cart')
const cartNumber = document.querySelector('.user-nav__cart-number')

btnToCart.addEventListener('click', function () {
    if(quantity) {
        inCartNumber += quantity
        cartNumber.textContent = inCartNumber
        cartNumber.classList.remove('hidden')

        quantity = 0
        quantityField.textContent = quantity
    }
})

// Cart pop-up
const cartBtn = document.querySelector('.user-nav__icon-cart')
const cartPopUp = document.querySelector('.cart-pop-up')
cartBtn.addEventListener('click', function () {
    cartPopUp.classList.remove('hidden')
})

window.addEventListener('click', function (e) {
    const clickedCart = e.target.closest('.user-nav__icon-cart')
    const clickedCartPopUp = e.target.closest('.cart-pop-up')
    
    if(!clickedCart && !clickedCartPopUp && !cartPopUp.classList.contains('hidden')) {
        cartPopUp.classList.add('hidden')
        
    }
})


// LIGHTBOX
const lightbox = document.querySelector('.lightbox')
const lightBigPrew = document.querySelector('.lightbox__large-prew')
const lightThumbContainer = document.querySelector('.lightbox__thumbnails-container')
const lightThumbs = document.querySelectorAll('.lightbox__thumbnail')
const btnClose = document.querySelector('.lightbox__close-btn')
const btnPrevious = document.querySelector('.lightbox__control--previous')
const btnNext = document.querySelector('.lightbox__control--next')

const viewImage = function (number) {
    lightThumbs.forEach(t => t.classList.remove('lightbox__thumbnail--active'))
    lightThumbs[number-1].classList.add('lightbox__thumbnail--active')
    lightBigPrew.style.backgroundImage = `url(../images/image-product-${number}.jpg)`
}

btnClose.addEventListener('click', function () {
    lightbox.classList.add('hidden')
    lightThumbs.forEach(t => t.classList.remove('lightbox__thumbnail--active'))
})