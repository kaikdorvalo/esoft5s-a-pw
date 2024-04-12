window.addEventListener("DOMContentLoaded", async () => {
    const local = await JSON.parse(window.localStorage.getItem("visitorsCounter"));
    const footer = document.getElementById('footer');
    const p = document.createElement('p');
    const date = new Date();
    const formatedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`;
    if (local != null) {
        local.count++;
        local.lastVisit = formatedDate;

        window.localStorage.setItem("visitorsCounter", JSON.stringify(local));
        p.textContent = `Essa página foi visitada ${local.count} vezes. A última visita foi: ${local.lastVisit}`;
        p.classList.add('counter')
        footer.appendChild(p);
    } else {
        window.localStorage.setItem("visitorsCounter", JSON.stringify({ count: 0, lastVisit: '' }));
        p.textContent = `Essa página foi visitada 0 vezes. A última visita foi: ${formatedDate}`;
        p.classList.add('counter');
        footer.appendChild(p);
    }

})