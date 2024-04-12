window.addEventListener("DOMContentLoaded", async () => {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const evolution = urlParams.get('evolucao');

    const title = document.getElementById('page-title');
    title.innerHTML = `Página do ${evolution}`;

    const pokeInfo = document.getElementById('poke-info');
    pokeInfo.innerHTML = `Informações sobre ${evolution}`

    const imgDiv = document.getElementById('evo-img');

    let urls = [];
    let counter = 0;

    fetch(`https://pokeapi.co/api/v2/pokemon/${evolution}`)
        .then(async (res) => {
            const response = await res.json();
            console.log(response.sprites);
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





