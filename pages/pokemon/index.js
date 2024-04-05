const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const evolution = urlParams.get('evolucao');

const title = document.getElementById('page-title');
title.innerHTML = `Página do ${evolution}`;

const pokeInfo = document.getElementById('poke-info');
pokeInfo.innerHTML = `Informações sobre ${evolution}`

fetch(`https://pokeapi.co/api/v2/pokemon/${evolution}`)
    .then(async (res) => {
        const response = await res.json();
        console.log(response)
        const imgDiv = document.getElementById('evo-img');

        imgDiv.innerHTML = `
            <img src="${response.sprites.front_default}" alt="imagem do pokemon">
        `
    })
