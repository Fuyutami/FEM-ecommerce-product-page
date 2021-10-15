'use strict'

// VARIABLES
const productId = 1
const cart = []
let quantity = 0
let inCartNumber = 0;
let lightboxThumbNr = 1



// Product gallery
const largePrew = document.querySelector('.product-gallery__large-preview')
const thumbnailContainer = document.querySelector('.product-gallery__thumbnails')
const thumbnails = document.querySelectorAll('.product-gallery__thumb-prew')
let currThumb = thumbnails[0];

largePrew.addEventListener('click', function () {
    lightboxThumbNr = currThumb.dataset.thumb
    lightBigPrew.style.backgroundImage = `url(../images/image-product-${lightboxThumbNr}.jpg)`
    lightThumbs[lightboxThumbNr-1].classList.add('lightbox__thumbnail--active')
    lightbox.classList.remove('hidden')
  
    
})

thumbnailContainer.addEventListener('click', function (e) {
    currThumb = e.target.closest('.product-gallery__thumb-prew')
    
    if(!currThumb) return

    console.log(currThumb)
    thumbnails.forEach(t => t.classList.remove('product-gallery__thumb-active'))
    currThumb.classList.add('product-gallery__thumb-active')

    largePrew.style.backgroundImage = `url(../images/image-product-${currThumb.dataset.thumb}.jpg)`
    
})


// Lightbox
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

btnNext.addEventListener('click', function () {
    if(lightboxThumbNr < lightThumbs.length) {
        lightboxThumbNr++
        viewImage(lightboxThumbNr)
    }
})

btnPrevious.addEventListener('click', function () {
    if(lightboxThumbNr > 1) {
        lightboxThumbNr--
        viewImage(lightboxThumbNr)
    }
})

lightThumbContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.lightbox__thumbnail')
    if(!clicked|| +clicked.dataset.thumb === lightboxThumbNr) return
    lightboxThumbNr = +clicked.dataset.thumb
    viewImage(+clicked.dataset.thumb)
})


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



// Add to cart button
const btnToCart = document.querySelector('.btn-to-cart')
const cartNumber = document.querySelector('.user-nav__cart-number')

btnToCart.addEventListener('click', function () {
    if(quantity) {
        inCartNumber += quantity

        const item = new Product(productId, quantity)
        addToCart(item)
        updateCartView()
        updateCartIcon()
       
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
    console.log(!clickedCartPopUp)
    if(!clickedCart && !clickedCartPopUp && !cartPopUp.classList.contains('hidden')) {
        cartPopUp.classList.add('hidden')
    }
})


// Cart
const addToCart = function (product) {
    console.log(cart)

    for (let i = 0; i < cart.length; i++) {
        if(cart[i].id === product.id) {
            cart[i].quantity = cart[i].quantity + product.quantity
            return
        }
    }
    cart.push(product)
}

const updateCartView = function () {
    const cartMainCont = document.querySelector('.cart-pop-up__main')
    cartMainCont.innerHTML = ''

    if(!cart.length) {
        cartMainCont.insertAdjacentHTML("afterbegin", `<span class="cart-pop-up__empty-msg">Your cart is empty.</span>`)
        return
    }

    const markup = `
    <div class="cart-pop-up__list-container">
        <list class="cart-pop-up__list"></list>
    </div>
    <button class="btn">Checkout</button>
    `
    cartMainCont.insertAdjacentHTML("afterbegin", markup)

    const cartList = document.querySelector('.cart-pop-up__list')

    cart.forEach(item => {
    const itemMarkup = `
      <li class="cart-pop-up__item">
        <div class="cart-pop-up__thumb">
          <img src="images/image-product-${item.id}-thumbnail.jpg" alt="">
        </div>
        <div class="cart-pop-up__details">
          <p class="cart-pop-up__item-title">${item.title}</p>
          <span class="cart-pop-up__quantity">$${Number.parseFloat(item.priceDollars).toFixed(2)} x ${item.quantity}</span>
          <span class="cart-pop-up__price">$${Number.parseFloat(item.priceDollars * item.quantity).toFixed(2)}</span>
        </div>
        <div class="cart-pop-up__icon-bin" data-id="${item.id}">
          <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
        </div>
      </li>
    `
    cartList.insertAdjacentHTML("afterbegin", itemMarkup)

    const bin = document.querySelector('.cart-pop-up__icon-bin')

    bin.addEventListener('click', function () {
        setTimeout(() => {
            removeItem(cart[bin.dataset.id-1])
        }, 10);
    })
    })  
}

const removeItem = function (item) {
    inCartNumber -= item.quantity
    cart.splice(item.id-1, 1)
    updateCartView()
    updateCartIcon()
}

const updateCartIcon = function () {
    cartNumber.textContent = inCartNumber
    if(!inCartNumber) cartNumber.classList.add('hidden')
    else cartNumber.classList.remove('hidden')
}



// Products
const products = {
    1: {
        title: "Fall limited Edition Sneakers",
        priceDollars: 125,
    }
}

class Product {
    id
    title
    priceDollars
    quantity
    constructor(id, quantity) {
        this.id = id
        this.quantity = quantity
        this._getData()
    }
    _getData() {
        this.title = products[1].title
        this.priceDollars = products[1].priceDollars
    }
}




