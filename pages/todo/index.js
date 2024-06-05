window.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById('form');
    const local = await JSON.parse(window.localStorage.getItem('tasks'));
    let taskArray = [];

    if (local == null) { window.localStorage.setItem('tasks', JSON.stringify([])) }

    taskArray = await JSON.parse(window.localStorage.getItem('tasks'));
    render(taskArray)

    const editBtn = document.getElementById('btn-edit')
    const cancelBtn = document.getElementById('btn-cancel')

    cancelBtn.addEventListener("click", () => {
        e.preventDefault();
    })

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        let task = document.getElementById('form-input');
        let description = document.getElementById('input-text-2')

        if (task.value != "" && description.value != "") {
            taskArray.push({ uuid: uuid(), title: task.value, description: description.value })
            task.value = "";
            description.value = "";
            window.localStorage.setItem('tasks', JSON.stringify(taskArray));
            console.log(taskArray)

            render(taskArray);
        }
    })
})

function render(array) {
    const container = document.getElementById('container-tasks');
    container.innerHTML = ""

    array.forEach((el) => {
        const boxTask = document.createElement("li");
        boxTask.classList.add("task-container");

        const divEdit = document.createElement("div");
        divEdit.classList.add('btn-edit-delete-box')


        const buttonEdit = document.createElement("button");
        buttonEdit.classList.add("btn-edit-delete");
        buttonEdit.textContent = "✏️";
        buttonEdit.title = "Editar tarefa"

        const buttonDelete = document.createElement("button");
        buttonDelete.classList.add("btn-edit-delete");
        buttonDelete.textContent = "❌";
        buttonDelete.title = "Deletar tarefa";


        addDeleteListener(el, buttonDelete);
        addListener(el, buttonEdit);

        divEdit.appendChild(buttonEdit);
        divEdit.appendChild(buttonDelete);

        const title = document.createElement('strong');
        const description = document.createElement('p');
        const div = document.createElement('div');



        title.textContent = el.title;
        description.textContent = el.description;
        div.appendChild(title)
        div.appendChild(description);

        boxTask.appendChild(div);
        boxTask.appendChild(divEdit);
        container.appendChild(boxTask);
    })
}

function addDeleteListener(el, button) {
    button.addEventListener('click', async () => {
        let tasks = await JSON.parse(window.localStorage.getItem('tasks'));
        const index = tasks.findIndex((item) => item.uuid === el.uuid);
        if (index > -1) {
            tasks.splice(index, 1);
            window.localStorage.setItem('tasks', JSON.stringify(tasks));
            render(tasks);
        }
    })
}

function addListener(el, button) {
    button.addEventListener('click', async () => {
        let title = document.getElementById('title-edit');
        let desc = document.getElementById('desc-edit');

        title.value = el.title;
        desc.value = el.description;

        const dialog = document.getElementById('edit-dialog');
        dialog.show();

        const editBtn = document.getElementById('btn-edit');

        let tasks = await JSON.parse(window.localStorage.getItem('tasks'));
        console.log(tasks)

        editBtn.addEventListener("click", async () => {
            const newTitle = document.getElementById('title-edit')
            const newDesc = document.getElementById('desc-edit')

            if (newTitle.value !== '' && newDesc.value !== '') {
                let tasks = await JSON.parse(window.localStorage.getItem('tasks'));
                console.log(tasks)

                tasks.forEach((element) => {
                    if (element.uuid === el.uuid) {
                        element.title = newTitle.value;
                        element.description = newDesc.value;
                    }
                })

                window.localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        })
    })
}

function uuid() {

    function randomDigit() {

        if (crypto && crypto.getRandomValues) {

            var rands = new Uint8Array(1);

            crypto.getRandomValues(rands);

            return (rands[0] % 16).toString(16);
        } else {
            return ((Math.random() * 16) | 0).toString(16);
        }
    }

    var crypto = window.crypto || window.msCrypto;

    return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit);
}

console.log(uuid())