const inputTag = document.querySelector(".input");
const addBtn = document.querySelector(".add-btn");
const bigDiv = document.querySelector('.task-div');
let count = 0;
let doneOrNot = false;
let todoList = [];

function addItemToList(item) {
    todoList.push(item);
    updateLocalStorage();
}

function removeItemFromList(index) {
    if (index >= 0 && index < todoList.length) {
        todoList.splice(index, 1);
        updateLocalStorage();
    }
}

function updateLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function loadTodoList() {
    const storedList = localStorage.getItem('todoList');
    if (storedList) {
        todoList = JSON.parse(storedList);

        todoList.forEach((item) => {
            renderTask(item);
        });
    }
}

function renderTask(item) {
    count++;
    const singleDiv = document.createElement("div");
    const taskInText = document.createElement("h4");
    const countText = document.createElement("h4");
    const doneBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const devider3 = document.createElement("div");
    countText.innerHTML = count + "  .  "
    taskInText.innerText = item;
    doneBtn.innerHTML = "<i class='fa fa-check'></i>";
    deleteBtn.innerHTML = "<i class='fa fa-trash'></i>";
    editBtn.innerHTML = "<i class='fa fa-pencil'></i>";
    bigDiv.appendChild(countText)
    singleDiv.appendChild(taskInText);
    singleDiv.appendChild(doneBtn)
    singleDiv.appendChild(deleteBtn);
    singleDiv.appendChild(editBtn);
    bigDiv.appendChild(singleDiv);
    bigDiv.appendChild(devider3);

    taskInText.classList.add('task-text')
    countText.classList.add('task-text')
    devider3.classList.add("devider-3")
    singleDiv.classList.add("single-div")
    doneBtn.classList.add("done-btn");
    deleteBtn.classList.add("delete-btn");
    editBtn.classList.add("edit-btn");

    doneBtn.addEventListener('click', function () {
        if (doneOrNot) {
            doneOrNot = false;
            taskInText.classList.remove("checked-text");
        } else {
            doneOrNot = true;
            taskInText.classList.add("checked-text");
        }
    })
    deleteBtn.addEventListener('click', function () {
        if (bigDiv.contains(singleDiv)) {
            bigDiv.removeChild(singleDiv);
        }
        if (bigDiv.contains(countText)) {
            bigDiv.removeChild(countText);
        }
        if (bigDiv.contains(devider3)) {
            bigDiv.removeChild(devider3);
        }

        const index = todoList.indexOf(item);
        if (index !== -1) {
            removeItemFromList(index);
        }
    })
    editBtn.addEventListener('click', function () {
        const editInput = document.createElement('input');
        const editSaveBtn = document.createElement('button');

        singleDiv.removeChild(taskInText);

        singleDiv.appendChild(editInput).classList.add("edit-input")
        singleDiv.appendChild(editSaveBtn).classList.add("edit-save-btn")

        editSaveBtn.innerHTML = "Save";
        editInput.value = taskInText.innerHTML;

        if (singleDiv.contains(editInput) && singleDiv.contains(editSaveBtn)) {
            editSaveBtn.addEventListener('click', function () {
                singleDiv.removeChild(editInput);
                singleDiv.removeChild(editSaveBtn);
                singleDiv.appendChild(taskInText);
                taskInText.innerHTML = editInput.value;

                const index = todoList.indexOf(item);
                if (index !== -1) {
                    todoList[index] = editInput.value;
                    updateLocalStorage();
                }
            })
        }
    })
}

loadTodoList();

addBtn.addEventListener('click', function () {
    if (inputTag !== null && inputTag.value !== "") {
        addItemToList(inputTag.value);
        renderTask(inputTag.value);

        inputTag.value = "";
    }
})
