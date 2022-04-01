const urlParametros = new URLSearchParams(window.location.search);
const idEvento = urlParametros.get("id");
BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

const exibirReservas = async () => {
	try {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
			headers: {
				"Content-type": "application/json;",
			},
		};

		const conteudoResultado = document.querySelector("#lista-reservas");
		const nomeEvento = document.querySelector(".my-5 #nome-evento");
		const dataEvento = document.querySelector("#data-time-evento");
		const ingresosTotal = document.querySelector("#ingressos-evento");

		const reservas = await (
			await fetch(`${BASE_URL}/bookings/event/${idEvento}`, requestOptions)
		).json();

		reservas.forEach((reserva, index) => {
			if (reserva.event === null) {
				return;
			}

			const data = reserva.event.scheduled
				.slice(0, 10)
				.split("-")
				.reverse()
				.join("/");
			const hora = reserva.event.scheduled.slice(11, 19);

			nomeEvento.innerHTML = reserva.event.name;
			dataEvento.innerHTML = `Data:<b> ${data} ${hora}</b>`;
			ingresosTotal.innerHTML = `Ingressos disponíveis:<b> ${reserva.event.number_tickets}</b>`;

			conteudoResultado.innerHTML += `<tr>
					<th scope="row" id="ref-reserva">${index + 1}</th>
					<td id="reserva-th" >${reserva.owner_name}</td>
					<td id="reserva-th" >${reserva.owner_email}</td>
					<td id="reserva-th" >${reserva.number_tickets}</td>
					<td>
						<button id="${reserva._id}" nome="${reserva.owner_name}" email="${
				reserva.owner_email
			}" 
						tickets="${reserva.number_tickets}" class="btn btn-danger">excluir</button>
					</td>
				</tr>`;
		});

		buscarReservas();
	} catch {
		console.log("Falha de Conexão Erro 404");
	}
};

exibirReservas();

// reservar ingressos
const inputNomeReserva = document.querySelector("#nome-reserva");
const inputEmailReserva = document.querySelector("#email");
const inputIngressosReserva = document.querySelector("#num-ingressos-reserva");
const formReserva = document.querySelector("#formulario-reserva");

formReserva.onsubmit = async function (event) {
	event.preventDefault();

	try {
		const novaReserva = {
			owner_name: inputNomeReserva.value,
			owner_email: inputEmailReserva.value,
			number_tickets: inputIngressosReserva.value,
			event_id: idEvento,
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
		if (resposta.ok) {
			formReserva.reset();
			alert("Uhuul! Seu ingresso foi reservado!");
			document.location.reload(true);
		} else {
			alert(
				"Ups, parece que tivemos um erro na sua reserva!\nTente novamente :)"
			);
		}
	} catch (error) {
		alert(
			"Ups, parece que tivemos um erro na sua reserva!\nTente novamente :)"
		);
	}
};

// modal
const modal = document.querySelector(".modal");
const btns = document.querySelectorAll(".modal-botao");
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

function buscarReservas() {
	const modalDeletar = document.querySelector(".modal-deletar");
	const btnsDeletar = document.querySelectorAll(".btn-danger");
	const nomeModalDeletar = document.querySelector(".modal-body-deletar p1");
	const emailModalDeletar = document.querySelector(".modal-body-deletar p2");
	const ticketsModalDeletar = document.querySelector(".modal-body-deletar p3");
	const btnclose = document.querySelector(".botao-modal-deletar-nao");

	[].forEach.call(btnsDeletar, function (el) {
		el.onclick = function () {
			modalDeletar.style.display = "block";
			idReserva = el.getAttribute("id");
			nomeReserva = el.getAttribute("nome");
			emailReserva = el.getAttribute("email");
			ticketsReserva = el.getAttribute("tickets");

			nomeModalDeletar.innerHTML = `Nome:<b> ${nomeReserva}</b>`;
			emailModalDeletar.innerHTML = `E-mail:<b> ${emailReserva}</b>`;
			ticketsModalDeletar.innerHTML = `Ingressos:<b> ${ticketsReserva}</b><br/><br/>`;
		};
	});
	btnclose.onclick = function () {
		modalDeletar.style.display = "none";
		idReserva = "";
		nomeReserva = "";
		emailReserva = "";
		ticketsReserva = "";
	};
	window.onclick = function (event) {
		if (event.target == modalDeletar) {
			modalDeletar.style.display = "none";
			idReserva = "";
			nomeReserva = "";
			emailReserva = "";
			ticketsReserva = "";
		}
	};
}

const deletarSim = document.querySelector(".botao-modal-deletar-sim");
let idReserva = "";
let nomeReserva = "";
let emailReserva = "";
let ticketsReserva = "";

deletarSim.onclick = async function deletarReserva() {
	try {
		const requestOptionsGet = {
			method: "GET",
			redirect: "follow",
			headers: {
				"Content-type": "application/json;",
			},
		};

		const reserva = await (
			await fetch(`${BASE_URL}/bookings/${idReserva}`, requestOptionsGet)
		).json();
		const ingressosDisponiveis =
			reserva.number_tickets + reserva.event.number_tickets;

		const requestOptionsDelete = {
			method: "DELETE",
			redirect: "follow",
			headers: {
				"Content-type": "application/json;",
			},
		};

		await fetch(`${BASE_URL}/bookings/${idReserva}`, requestOptionsDelete);

		const data = {
			name: reserva.event.name,
			poster: reserva.event.poster,
			attractions: reserva.event.attractions,
			description: reserva.event.description,
			scheduled: reserva.event.scheduled,
			number_tickets: Number(ingressosDisponiveis),
		};

		const requestOptionsPutEvent = {
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};
		const requisicao = await fetch(
			`${BASE_URL}/events/${idEvento}`,
			requestOptionsPutEvent
		);
		const conteudorequisicao = await requisicao.json(data);
		alert("Reserva deletada com sucesso!");
		window.location.href = `reservas.html?id=${idEvento}`;
	} catch {
		alert("Falha na Conexão Erro 404");
	}
};
