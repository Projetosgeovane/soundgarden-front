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
                    <th scope="row">${index +1}</th>
                    <td>${reserva.owner_name}</td>
                    <td>${reserva.owner_email}</td>
                    <td>${reserva.number_tickets}</td>
                    <td>
                        <a href="excluir-reserva.html?id=${reserva._id}" class="btn btn-danger">excluir</a>
                    </td>
                </tr>`
        });


    } catch {
        console.log('Falha de Conexão Erro 404')

    }
}

exibirReservas();