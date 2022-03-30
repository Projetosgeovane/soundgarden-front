BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';

// var requestOptions = {
//     method: 'GET',
//     redirect: 'follow',
//     headers: {
//         "Content-type": "application/json;"
//     }
// };

// let conteudoResultado = document.querySelector('#lista-eventos');

// fetch(`${BASE_URL}/events`, requestOptions)
//     .then(response => response.json())
//     .then((result) => {
//         result.forEach((evento, index) => {
//             // console.log(evento._id)
//             let data = evento.scheduled.slice(0, 10).split('-').reverse().join('/')
//             let hora = evento.scheduled.slice(11, 19)
//             conteudoResultado.innerHTML +=
//                 `<tr>
//                 <th scope="row">${index +1}</th>
//                 <td>${data}<br/>${hora} </td>
//                 <td>${evento.name}</td>
//                 <td>${evento.attractions}</td>
//                 <td>
//                     <a href="reservas.html?id=${evento._id}" class="btn btn-dark">ver reservas</a>
//                     <a href="editar-evento.html?id=${evento._id}" class="btn btn-secondary">editar</a>
//                     <a href="excluir-evento.html?id=${evento._id}" class="btn btn-danger">excluir</a>
//                 </td>
//             </tr>`
//         });
//         // console.log(conteudoResultado)
//     })
//     .then(

//     )
//     .catch(error => console.log('error', error));

const exibirEvento = async () => {
    try {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
                "Content-type": "application/json;"
            }
        };

        let conteudoResultado = document.querySelector('#lista-eventos');

        const eventos = await (await fetch(`${BASE_URL}/events`, requestOptions)).json()
        eventos.forEach((evento, index) => {
            const data = evento.scheduled.slice(0, 10).split('-').reverse().join('/')
            const hora = evento.scheduled.slice(11, 19)
            conteudoResultado.innerHTML +=
                `<tr>
                    <th scope="row">${index +1}</th>
                    <td>${data}<br/>${hora} </td>
                    <td>${evento.name}</td>
                    <td id="atracoes-evento">${evento.attractions}</td>
                    <td>
                        <a href="reservas.html?id=${evento._id}" class="btn btn-dark">ver reservas</a>
                        <a href="editar-evento.html?id=${evento._id}" class="btn btn-secondary">editar</a>
                        <a href="excluir-evento.html?id=${evento._id}" class="btn btn-danger">excluir</a>
                    </td>
                </tr>`
        });


    } catch {
        console.log('Falha de Conexão Erro 404')

    }
}

exibirEvento();
