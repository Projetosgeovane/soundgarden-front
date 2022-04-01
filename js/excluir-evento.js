const urlParametros = new URLSearchParams(window.location.search);
const idEvento = urlParametros.get("id");
const formDeletar = document.querySelector("form");
BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

const deletarEvento = async () => {
	const requestOptions = {
		method: "DELETE",
		redirect: "follow",
		headers: {
			"Content-type": "application/json; charset=UTF-8 ",
		},
	};

	try {
		await fetch(`${BASE_URL}/events/${idEvento}`, requestOptions);
		alert("Evento excluído com sucesso!");
		window.location.href = "admin.html";
	} catch {
		alert("ID Não encontrado!");
	}
};

const exibirEvento = async () => {
	try {
		const requestOptions = {
			method: "GET",
			redirect: "follow",
			headers: {
				"Content-type": "application/json; charset=UTF-8 ",
			},
		};

		const evento = await (
			await fetch(`${BASE_URL}/events/${idEvento}`, requestOptions)
		).json();

		const data = evento.scheduled.slice(0, 10).split("-").reverse().join("/");
		const hora = evento.scheduled.slice(11, 19);
		document.querySelector("#nome").value = evento.name;
		document.querySelector("#banner").value = evento.poster;
		document.querySelector("#atracoes").value = evento.attractions;
		document.querySelector("#descricao").value = evento.description;
		document.querySelector("#data").value = `${data} ${hora}`;
		document.querySelector("#lotacao").value = evento.number_tickets;
	} catch {
		alert("ID Não encontrado!");
	}
};

formDeletar.onsubmit = (event) => {
	event.preventDefault();
	deletarEvento();
};

exibirEvento();