window.addEventListener("DOMContentLoaded", async () => {
    const titleH1 = document.getElementById('page-title');
    const title = document.querySelector('title');
    const pokeInfo = document.getElementById('poke-info');
    const imgDiv = document.getElementById('evo-img');

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const evolution = urlParams.get('evolucao');

    titleH1.innerHTML = `Página do ${evolution}`;
    title.innerHTML = `Página do ${evolution}`;
    pokeInfo.innerHTML = `Informações sobre ${evolution}`

    let urls = [];
    let counter = 0;

    fetch(`https://pokeapi.co/api/v2/pokemon/${evolution}`)
        .then(async (res) => {
            const response = await res.json();
            const object = Object.values(response.sprites);
            let urlArray = object.filter((el) => typeof el === 'string')
            urls = [urlArray[2], urlArray[3], urlArray[0], urlArray[1]];
            setImage(urls, counter);

        })
        .catch((error) => {
            console.error(error);
        })


    imgDiv.addEventListener('click', () => {
        setImage(urls, counter);
    })


    function setImage(urls, count) {
        counter >= urls.length - 1 ? counter = 0 : counter++;

        const img = document.createElement('img');
        img.src = urls[count];
        img.alt = 'pokemon image';

        console.log(urls[counter])

        imgDiv.innerHTML = '';
        imgDiv.appendChild(img);

    }
})





