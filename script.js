const addTaskInput = document.getElementById('addTaskInput');
const addTaskBtn = document.getElementById('addTask');
const saveTaskBtn = document.getElementById('saveTask');


showTask();
addTaskBtn.addEventListener('click', () => {
    addTaskInputVal = addTaskInput.value;

    let webTask = localStorage.getItem('localTask');
    if (addTaskInputVal.trim() != 0) {
        if (webTask === null) {
            taskObjc = [];
        } else {
            taskObjc = JSON.parse(webTask);
        }
        taskObjc.push(addTaskInputVal);
        localStorage.setItem('localTask', JSON.stringify(taskObjc));
        addTaskInput.value = '';
        showTask();
    }
});

// Show Task
function showTask() {
    let webTask = localStorage.getItem('localTask');
    if (webTask === null) {
        taskObjc = [];
    } else {
        taskObjc = JSON.parse(webTask);
    }

    let html = '';
    let addTaskList = document.getElementById('addTaskList');
    taskObjc.forEach((item, index) => {
        html += `
            <tr>
            <th scope="row">${index+1}</th>
            <td>${item}</td>
            <td class="edit"><a href="#" id="editTask" onclick ="edittask(${index})"><i class="bi bi-pencil-square"></i>Edit</a></td>
            <td class="delete"><a href="#" id="deleteTask" onclick="deleteItem(${index})"><i class="bi bi-trash-fill"></i>Delete</a></td>
            </tr>
        `;
    });
    addTaskList.innerHTML = html;
}

// Edit Task
function edittask(index) {
    let saveIndex = document.getElementById('saveIndex');

    saveIndex.value = index;

    let webTask = localStorage.getItem('localTask');
    let taskObjc = JSON.parse(webTask);

    addTaskInput.value = taskObjc[index];

    addTaskBtn.style.display = 'none';
    saveTaskBtn.style.display = 'block';
}

// Save Task
saveTaskBtn.addEventListener('click', () => {
    let webTask = localStorage.getItem('localTask');
    let taskObjc = JSON.parse(webTask);

    let saveIndex = document.getElementById('saveIndex').value;

    taskObjc[saveIndex] = addTaskInput.value;

    localStorage.setItem('localTask', JSON.stringify(taskObjc));
    saveTaskBtn.style.display = 'none';
    addTaskBtn.style.display = 'block';
    addTaskInput.value = '';
    showTask();
});

// Delete Item
function deleteItem(index) {
    let webTask = localStorage.getItem('localTask');
    let taskObjc = JSON.parse(webTask);

    taskObjc.splice(index, 1);
    localStorage.setItem('localTask', JSON.stringify(taskObjc));
    showTask();
}

// Delete All Item
let deleteAllItem = document.getElementById('deleteAll');
deleteAllItem.addEventListener('click', () => {
    let webTask = localStorage.getItem('localTask');
    let taskObjc = JSON.parse(webTask);
    if (webTask === null) {
        taskObjc = [];
    } else {
        taskObjc = JSON.parse(webTask);
        taskObjc = [];
    }
    localStorage.setItem('localTask', JSON.stringify(taskObjc));
    addTaskInput.value = '';
    saveTaskBtn.style.display = 'none';
    addTaskBtn.style.display = 'block';
    showTask();
});

// Search List
let searchBox = document.getElementById('search');

searchBox.addEventListener('input', () => {
    let trList = document.querySelectorAll('tr');

    Array.from(trList).forEach((item) => {
        let searchText = item.getElementsByTagName('td')[0].innerText;
        let searchBoxVal = searchBox.value;
        let regExp = new RegExp(searchBoxVal, 'gi');
        if (searchText.match(regExp)) {
            item.style.display = 'table-row';
        } else {
            item.style.display = 'none';
        }
    });
});