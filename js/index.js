const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

// carrossel
const slides = document.getElementsByClassName("carrousel-item");
let slidePosition = 0;
const totalSlides = slides.length;

document
	.getElementById("carrousel-button-prev")
	.addEventListener("click", () => {
		moveSlide("previous");
	});
document
	.getElementById("carrousel-button-next")
	.addEventListener("click", () => {
		moveSlide("next");
	});

function hideAllSlides() {
	for (const slide of slides) {
		slide.classList.remove("carrousel-item-visible");
	}
}

function showCurrentSlide() {
	slides[slidePosition].classList.add("carrousel-item-visible");
}

function movePreviousPosition() {
	if (slidePosition > 0) {
		slidePosition--;
	} else {
		slidePosition = totalSlides - 1;
	}
}

function moveNextPosition() {
	if (slidePosition < totalSlides - 1) {
		slidePosition++;
	} else {
		slidePosition = 0;
	}
}

function moveSlide(direction) {
	hideAllSlides();
	if (direction === "previous") {
		movePreviousPosition();
	} else if (direction === "next") {
		moveNextPosition();
	}
	showCurrentSlide();
}

// reservar ingressos
const inputNomeReserva = document.querySelector("#nome-reserva");
const inputEmailReserva = document.querySelector("#email");
const inputIngressosReserva = document.querySelector("#num-ingressos-reserva");
const formReserva = document.querySelector("#formulario-reserva");

formReserva.onsubmit = async function (event) {
	event.preventDefault();

	const inputId = document.querySelector(".modal-botao");

    
	try {
		const novaReserva = {
			owner_name: inputNomeReserva.value,
			owner_email: inputEmailReserva.value,
			number_tickets: inputIngressosReserva.value,
			event_id: inputId.getAttribute("idEvento"),
		};

		const options = {
			method: "POST",
			body: JSON.stringify(novaReserva),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const resposta = await fetch(`${BASE_URL}/bookings`, options);
		const reserva = await resposta.json();
		console.log(reserva);
		formReserva.reset();
        alert("Uhuul! Seu ingresso foi reservado!")
	} catch (error) {
		alert(
			"Ups, parece que tivemos um erro na sua reserva!\nTente novamente :)"
		);
	}
};

//pegar lista de eventos
const eventosIndex = async (index) => {
	try {
		const options = {
			method: "GET",
		};

		const resposta = await fetch(`${BASE_URL}/events`, options);
		const eventos = await resposta.json();
		return eventos.slice(0, index);
	} catch {
		console.log("erro em listar os eventos");
	}
};

eventosIndex(3).then((resp) => {
	const cardsEventos = document.querySelector("#container-eventos");

	console.log(resp);

	cardsEventos.innerHTML = "";
	resp.forEach((conteudo) => {
		cardsEventos.innerHTML += ` <article class="evento card p-5 m-3">
        <h2 id="nome-evento">${conteudo.name} - ${conteudo.scheduled}</h2>
        <h4 id="artistas-evento">${conteudo.attractions}</h4>
        <p id="descricao-evento">${conteudo.description}</p>
        <button idEvento="${conteudo._id}" class="btn btn-primary modal-botao">reservar ingresso</button>
    </article>
        `;
	});

	// modal
	const modal = document.querySelector(".modal");
	const btns = document.querySelectorAll(".btn.btn-primary.modal-botao");
	const span = document.querySelector(".close");

	[].forEach.call(btns, function (el) {
		el.onclick = function () {
			modal.style.display = "block";
		};
	});
	span.onclick = function () {
		modal.style.display = "none";
	};
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};
});
