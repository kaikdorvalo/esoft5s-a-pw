window.addEventListener("DOMContentLoaded", async () => {
    const local = await JSON.parse(window.localStorage.getItem("visitorsCounter"));
    const footer = document.getElementById('footer');
    console.log(local)
    const date = new Date();
    if (local) {
        local.count++;
        local.lastVisit = `${date.getDay().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`;

        window.localStorage.setItem("visitorsCounter", JSON.stringify(local));
        const p = document.createElement('p');
        p.textContent = `Essa página foi visitada ${local.count} vezes. A última visita foi: ${local.lastVisit}`;
        p.classList.add('counter')
        footer.appendChild(p);
    } else {
        window.localStorage.setItem("visitorsCounter", JSON.stringify({ count: 0, lastVisit: '' }));
    }

})