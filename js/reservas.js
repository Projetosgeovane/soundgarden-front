const urlParametros = new URLSearchParams(window.location.search);
const idEvento = urlParametros.get('id');
BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';

const exibirReservas = async () => {
    try {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
                "Content-type": "application/json;"
            }
        };

        const conteudoResultado = document.querySelector('#lista-reservas');
        const nomeEvento = document.querySelector('.my-5 #nome-evento');
        const dataEvento = document.querySelector('#data-time-evento');
        const ingresosTotal = document.querySelector('#ingressos-evento');

        const reservas = await (await fetch(`${BASE_URL}/bookings/event/${idEvento}`, requestOptions)).json()

        reservas.forEach((reserva, index) => {
            if (reserva.event === null) {
                return
            }

            const data = reserva.event.scheduled.slice(0, 10).split('-').reverse().join('/')
            const hora = reserva.event.scheduled.slice(11, 19)

            nomeEvento.innerHTML = reserva.event.name;
            dataEvento.innerHTML = `Data:<b> ${data} ${hora}</b>`;
            ingresosTotal.innerHTML = `Ingressos disponíveis:<b> ${reserva.event.number_tickets}</b>`;

            conteudoResultado.innerHTML +=
                `<tr>
                    <th scope="row" id="ref-reserva">${index +1}</th>
                    <td id="reserva-th" >${reserva.owner_name}</td>
                    <td id="reserva-th" >${reserva.owner_email}</td>
                    <td id="reserva-th" >${reserva.number_tickets}</td>
                    <td>
                        <a href="excluir-Reserva.html?id=${idEvento}&idReserva=${reserva._id}" class="btn btn-danger">excluir</a>
                    </td>
                </tr>`
        });


    } catch {
        console.log('Falha de Conexão Erro 404')

    }
}

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
		console.log(reserva);
		formReserva.reset();
        alert("Uhuul! Seu ingresso foi reservado!")
		document.location.reload(true)
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

const modalDeletar = document.querySelector(".modal-deletar");
const btnsDeletar = document.querySelectorAll(".btn-danger");
btnsDeletar.href = "#"
const btnclose = document.querySelector(".botao-modal-deletar-nao");

[].forEach.call(btnsDeletar, function (el) {
	el.onclick = function () {
		modalDeletar.style.display = "block";
	};
});
btnclose.onclick = function () {
	modalDeletar.style.display = "none";
};
window.onclick = function (event) {
	if (event.target == modalDeletar) {
		modalDeletar.style.display = "none";
	}
};
