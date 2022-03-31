const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";


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

eventosIndex(18).then((resp) => {
	const cardsEventos = document.querySelector("#container-eventos");

	console.log(resp);

	cardsEventos.innerHTML = "";
	resp.forEach((conteudo) => {
		const data = conteudo.scheduled.slice(0, 10).split("-").reverse().join("/");
		const hora = conteudo.scheduled.slice(11, 16);

		cardsEventos.innerHTML += ` <article class="evento card p-5 m-3">
        <h2 id="nome-evento">${conteudo.name}</h2>
		<h2 id="data-hora-evento">${data} </br> ${hora}</h2>
        <h4 id="artistas-evento">${conteudo.attractions}</h4>
        <p id="descricao-evento">${conteudo.description}</p>
        <button id-evento="${conteudo._id}" class="btn btn-primary modal-botao">reservar ingresso</button>
    </article>
        `;
	});

	// modal
	const modal = document.querySelector(".modal");
	const abre = document.querySelectorAll(".btn.btn-primary.modal-botao");
	const fecha = document.querySelector(".close");
	const enviar = document.querySelector("#botao-enviar");

	abre.forEach(el => {
		el.addEventListener("click", () => {
			modal.style.display = "block";
			enviar.setAttribute("id-evento", `${el.getAttribute("id-evento")}`);
		});
	});
	fecha.onclick = function () {
		modal.style.display = "none";
	};
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};

	
});

// reservar ingressos
const inputNomeReserva = document.querySelector("#nome-reserva");
const inputEmailReserva = document.querySelector("#email");
const inputIngressosReserva = document.querySelector("#num-ingressos-reserva");
const formReserva = document.querySelector("#formulario-reserva");

formReserva.onsubmit = async (event) => {
	event.preventDefault();
	const enviar = document.querySelector("#botao-enviar");

	try {
		const novaReserva = {
			owner_name: inputNomeReserva.value,
			owner_email: inputEmailReserva.value,
			number_tickets: inputIngressosReserva.value,
			event_id: enviar.getAttribute("id-evento"),
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
		if(resposta.ok) {
			formReserva.reset();
			alert("Uhuul! Seu ingresso foi reservado!");
		} else {
			alert("Ups, parece que tivemos um erro na sua reserva!\nTente novamente :)");
		}
	} catch (error) {
		alert(
			"Ups, parece que tivemos um erro na sua reserva!\nTente novamente :)"
		);
	}
};
