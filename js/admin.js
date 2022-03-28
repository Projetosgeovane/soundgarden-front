let url = window.location.pathname;
let arquivoHtml = url.substring(url.lastIndexOf('/') + 1);
BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';



if (arquivoHtml === 'admin.html') {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            "Content-type": "application/json;"
        }
    };

    let conteudoResultado = document.querySelector('#lista-eventos');

    fetch(`${BASE_URL}/events`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            result.forEach((evento, index) => {
                // console.log(evento._id)
                let data = evento.scheduled.slice(0, 10).split('-').reverse().join('/')
                let hora = evento.scheduled.slice(11, 19)
                conteudoResultado.innerHTML +=
                    `<tr>
                    <th scope="row">${index +1}</th>
                    <td>${data}<br/>${hora} </td>
                    <td>${evento.name}</td>
                    <td>${evento.attractions}</td>
                    <td>
                        <a href="reservas.html" class="btn btn-dark">ver reservas</a>
                        <a href="editar-evento.html" class="btn btn-secondary">editar</a>
                        <a href="excluir-evento.html" class="btn btn-danger">excluir</a>
                    </td>
                </tr>`
            });
            // console.log(conteudoResultado)
        })
        .then(

        )
        .catch(error => console.log('error', error));
}

// if (url.includes('/excluir-evento.html/:6240c5efb8b5fc9f101a0307')) {
//     console.log("kkk")
// }

// console.log(url.includes('/:'))