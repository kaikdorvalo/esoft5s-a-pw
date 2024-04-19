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

        if (task.value != "") {
            taskArray.push(task.value)
            task.value = "";
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
            const p = document.createElement('p');
            p.textContent = el;
            container.appendChild(p)
        })
    }
})