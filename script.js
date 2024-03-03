// Vareáveis globais de dados, estrutura DOM de acesso:
let img_title = document.getElementById('img_title');
let container_data = document.getElementById('container_data');
// DOM aviso ao úsuario!!!
let aviso_message = document.getElementById('aviso_message');
// API de dados:
const API_URL = 'https://api.jikan.moe/v4';
// Amazena o anime atual buscado na API:
let animeAtual = "";
// Amazena informações do anime selecionado:
const listAnimeAmazenados = [];
// --------------------------------------------------------------------------------
// Vareável que amazena o index, e controla o amazenamento e a função cardDelet...
let i = "";
// Função Delet card, anime selecionado;
const cardDelet = () => {
    const buttonDelete = document.querySelectorAll('.buttonDelete');
    buttonDelete.forEach((cardA, index) => {
        cardA.addEventListener('click', () => {
            const li = cardA.parentNode;
            li.remove();
            listAnimeAmazenados.splice(index, 1);
            i--;
        });
    });
};
// --------------------------------------------------------------------------------
// Realiza a redenrização do anime no DOM, função única de dados:
const cards = function () {
    let card = document.getElementById('card');
    let ultiIndice = (listAnimeAmazenados.length - 1);
    if (ultiIndice !== i) {
        card.innerHTML += `<li class=li><div><img src=${listAnimeAmazenados[ultiIndice].img} /><h3>${listAnimeAmazenados[ultiIndice].title}<p>Rank: ${listAnimeAmazenados[ultiIndice].rank} <br /> Score: ${listAnimeAmazenados[ultiIndice].score} <br />Studios: ${listAnimeAmazenados[ultiIndice].studios}</p></h3></div><button class=buttonDelete>Delet Anime</button></li>`;
        // card.innerHTML += `<li>${listAnimeAmazenados[ultiIndice].title}</li>`;
        i = ultiIndice;
    } else {
        console.log("Anime Index Armazenado...");
    };
    // Função Delet card, anime selecionado pelo index atual;
    cardDelet ();
};

// Amazena o anime em objeto, caso não exista;
const verificaAnimeAmazenadoExixtenteId = (obj) => {
    if (listAnimeAmazenados.length === 0) {
        return listAnimeAmazenados.push(obj);
    };
    let encontrado = false;
    for (let i = 0; i < listAnimeAmazenados.length; i++) {
        if (animeAtual.mal_id === listAnimeAmazenados[i].id) {
            encontrado = true;
            // "Já existe! O anime não será adicionado novamente.";
            aviso_message.innerText = "Anime já adicionado a coleção!";
            aviso_message.style.color = "rgb(134, 31, 198)";
            aviso_message.classList.add("trueFalse");
            break;
        };
    };
    if (!encontrado) {
        listAnimeAmazenados.push(obj);
        aviso_message.innerText = "Anime adicionando á colção...";
        aviso_message.style.color = "rgb(15, 38, 189)";
    };
};

// Salva o anime atual em uma class, passando para outra função via callback:
const FUNCTION_LIST_ANIME_OBJ = (verificaAnimeAmazenadoExixtenteId) => {
    // Class de informações do anime atual:
    class Anime {
        constructor (title, img, id, rank, score, studios) {
            this.title = title;
            this.img = img;
            this.id = id;
            this.rank = rank;
            this.score = score;
            this.studios = studios;
        };
    };
    // Cria nova instancia:
    let informaAnime = new Anime(animeAtual.title, animeAtual.images.jpg.image_url, animeAtual.mal_id, animeAtual.rank, animeAtual.score, animeAtual.studios[0].name);
    verificaAnimeAmazenadoExixtenteId(informaAnime);
    cards()
    // document.getElementById("as_teste").innerHTML += `<img src=${obj.img} />`;
};


// --------------------------------------------------------------------------------
const clearSection = () => {
    container_data.innerHTML = "";
    img_title.innerHTML = "";
};

const containerData = (data) => {
    img_title.innerHTML += `<h2 id="title">&#10156; ${data.title}</h2>`;
    img_title.innerHTML += `<img src=${data.images.jpg.image_url} />`;

    container_data.innerHTML += `<p>Studio: <a href=${data.studios[0].url}>${data.studios[0].name}</a> / Fonte: ${data.source}</p>`;
    container_data.innerHTML += `<p>&#10156; <em>Rank: ${data.rank} / Score: ${data.score}</p></em>`;
    container_data.innerHTML += `<p>Exibido: ${data.aired.string} / Status: ${data.status}</p>`;
    container_data.innerHTML += `<p>Quantidade de eps: ${data.episodes}</p>`;
    container_data.innerHTML += `<p class=qtsEps>Duração de eps: ${data.duration}</p>`;

    container_data.innerHTML += `<p>&#10156; ${data.synopsis}</p>`;
    
    animeAtual = data;
};

const DATA_API = (containerData) => {
    let name_anime = document.getElementById('name_anime').value; // Name Anime;
    clearSection(); // Limpa a tag div para atualização dos dados;
    fetch(`${API_URL}/anime?q=${name_anime}&limit=1`)
    .then(response => response.json())
    .then(data => {
        try {
            containerData(data.data[0]);
        } catch (erro) {
            container_data.innerHTML += "<span class=aviso>&#8646; Erro de busca de dados referente ao nome digitado, por favor digite um nome válido, ou pesquise uma referência de nome usando o copiar e colar cole na caixa de texto…</span>";
        };
    });
};
// Quando realizar a busca do name_anime:
document.getElementById('buscar_anime').addEventListener('click', () => {
    DATA_API(containerData);
});
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

// Quando clicado no botão de amazenar anime atual:
document.getElementById('amazenar_anime').addEventListener('click', () => {
    FUNCTION_LIST_ANIME_OBJ(verificaAnimeAmazenadoExixtenteId);
});
// --------------------------------------------------------------------------------



// Iframe de informações:
const iframe = document.getElementById('iframe').addEventListener("click", () => {
    let container_footer_iframe = document.getElementById('container_footer_iframe');
    if (container_footer_iframe.style.display == 'none') {
        container_footer_iframe.style.display = "block";
        
    } else {
        container_footer_iframe.style.display = "none";
    };
});