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