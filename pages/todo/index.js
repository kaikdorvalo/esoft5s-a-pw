window.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById('form');
    const local = await JSON.parse(window.localStorage.getItem('tasks'));
    let taskArray = [];

    if (local == null) { window.localStorage.setItem('tasks', JSON.stringify([])) }

    taskArray = await JSON.parse(window.localStorage.getItem('tasks'));
    render(taskArray)
    console.log(taskArray)

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        let task = document.getElementById('form-input');
        let description = document.getElementById('input-text-2')

        if (task.value != "" && description.value != "") {
            taskArray.push({ title: task.value, description: description.value })
            task.value = "";
            description.value = "";
            window.localStorage.setItem('tasks', JSON.stringify(taskArray));
            console.log(taskArray)

            render(taskArray);
        }
        // alert(1)
    })


    function render(array) {
        const container = document.getElementById('container-tasks');
        container.innerHTML = ""

        array.forEach((el) => {
            const title = document.createElement('strong');
            const description = document.createElement('p');
            const div = document.createElement('div');
            title.textContent = el.title;
            description.textContent = el.description;
            div.appendChild(title)
            div.appendChild(description);
            container.appendChild(div)
        })
    }
})