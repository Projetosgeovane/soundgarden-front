const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

const inputNome = document.querySelector('#nome');
const inputBanner = document.querySelector('#banner');
const inputAtracoes = document.querySelector('#atracoes');
const inputDescricao = document.querySelector('#descricao');
const inputData = document.querySelector('#data');
const inputLotacao = document.querySelector('#lotacao');
const form = document.querySelector('.col-6');

const buscarId = () => {
    const url = new URL(window.location.href)
    const id = url.searchParams.get('id')
    return id
}

const buscarApi = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };

    const requisicao = await fetch(`${BASE_URL}/events/` + buscarId(), options)
    const conteudorequisicao = await requisicao.json()
    return conteudorequisicao
}




const updateApi = async (data) => {
    const options = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };
    const requisicao = await fetch(`${BASE_URL}/events/` + buscarId(), options)
    const conteudorequisicao = await requisicao.json()
    return conteudorequisicao
}

const convertDateTime = (dateTime) => {
    
    convertDate = new Date(dateTime);
    return convertDate.toISOString();
}

form.onsubmit = async (evento) => {
    try {
        evento.preventDefault()

        const data = {
            name: inputNome.value,
            poster: inputBanner.value,
            attractions: inputAtracoes.value.split(','),
            description: inputDescricao.value,
            scheduled: convertDateTime(inputData.value),
            number_tickets: Number(inputLotacao.value),

        }

        const conteudorequisicao = await updateApi(data)
        console.log(conteudorequisicao);


        alert('Evento atualizado com sucesso!')
        window.location.pathname = "/admin.html"
    } catch {
        console.log('erro');
        alert("Erro ao atualizar evento!")
    }

}

const buscarDados = async () => {
    const conteudorequisicao = await buscarApi();

    const date = new Date(conteudorequisicao.scheduled);

    inputNome.value = conteudorequisicao.name;
    inputBanner.value = conteudorequisicao.poster;
    inputAtracoes.value = conteudorequisicao.attractions;
    inputDescricao.value = conteudorequisicao.description;
    inputData.value = date.toLocaleString();
    inputLotacao.value = conteudorequisicao.number_tickets;

}


buscarDados()