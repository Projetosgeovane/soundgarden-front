// modal
const modal = document.querySelector(".modal");
const btns = document.querySelectorAll(".modal-botao"); 
const span = document.querySelector(".close");

[].forEach.call(btns, function(el) {
  el.onclick = function() {
      modal.style.display = "block";
  }
})
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// carrossel
const slides = document.getElementsByClassName("carrousel-item")
let slidePosition = 0
const totalSlides = slides.length

document.getElementById("carrousel-button-prev").addEventListener("click", () => {
    moveSlide("previous")
})
document.getElementById("carrousel-button-next").addEventListener("click", () => {
    moveSlide("next")
})

function hideAllSlides() {
    for(const slide of slides) {
        slide.classList.remove("carrousel-item-visible")
    }
}

function showCurrentSlide() {
    slides[slidePosition].classList.add("carrousel-item-visible")
}

function movePreviousPosition() {
    if(slidePosition > 0) {
        slidePosition--
    } else {
        slidePosition = totalSlides - 1
    }
}

function moveNextPosition() {
    if(slidePosition < totalSlides - 1) {
        slidePosition++
    } else {
        slidePosition = 0
    }
}

function moveSlide(direction) {
    hideAllSlides()
    if(direction === "previous") {
        movePreviousPosition()
    } else if(direction === "next") {
        moveNextPosition()
    }
    showCurrentSlide()
}