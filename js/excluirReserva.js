const urlParametros = new URLSearchParams(window.location.search);
const idReserva = urlParametros.get('id');
const formDeletarReserva = document.querySelector('form');
const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';


formDeletarReserva.onsubmit = async (event) => {
    try {
        event.preventDefault();

        const requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
            headers: {
                "Content-type": "application/json;"
            }
        };

        await fetch(`${BASE_URL}/bookings/${idReserva}`, requestOptions)
        alert("Evento excluído com sucesso!")
        location.replace(document.referrer);

    } catch {
        alert("ID Não encontrado!")
    }
}

const exibirReserva = async () => {
    try {

        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
                "Content-type": "application/json;"
            }
        };

        const reserva = await (await fetch(`${BASE_URL}/bookings/${idReserva}`, requestOptions)).json()

        document.querySelector('#nome').value = reserva.owner_name;
        document.querySelector('#email').value = reserva.owner_email;
        document.querySelector('#ingressos').value = reserva.number_tickets;
    } catch {
        alert("ID Não encontrado!")
    }
}

exibirReserva();
