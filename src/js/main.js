import { currentTime } from "./currentTime.js";
import { showAddNewWindow, hideAddNewWindow, updateLocalStorage, getCounter, changeStyletoProgress} from "./helper.js";
import { createTodoItem } from "./createtodoitem.js";
import { renderTodoItem, renderUser } from "./render.js";

const header = document.getElementById('header');
const trelloLogo = document.createElement('h1');
const timeNow = document.createElement('div');
const mainBlock = document.getElementById('main_block');
const mainPage = document.getElementById('mainPage');
const todoBlock = document.createElement('div');
const todoBlockHeader = document.createElement('div');
const todoBlockHeaderTitle = document.createElement('h2');
const todoBlockHeaderCounter = document.createElement('div');
const todoBlockContainer = document.createElement('div');
const todoBlockBtn = document.createElement('button');
const progressBlock = document.createElement('div');
const progressBlockHeader = document.createElement('div');
const progressBlockHeaderTitle = document.createElement('h2');
const progressBlockHeaderCounter = document.createElement('div');
const progressBlockContainer = document.createElement('div');
const doneBlock = document.createElement('div');
const doneBlockHeader = document.createElement('div');
const doneBlockHeaderTitle = document.createElement('h2');
const doneBlockHeaderCounter = document.createElement('div');
const doneBlockContainer = document.createElement('div');
const doneBlockBtn = document.createElement('button');
const newWindowContainer = document.createElement('div');
const newWindowBtnContainer = document.createElement('div');
const newWindowTitle = document.createElement('input');
const newWindowDescription = document.createElement('textarea');
const newWindowUser = document.createElement('select');
const newWindowCancelBtn = document.createElement('button');
const newWindowAddBtn = document.createElement('button');
const editNewWindowContainer = document.createElement('div');
const editNewWindowBtnContainer = document.createElement('div');
const editNewWindowTitle = document.createElement('input');
const editNewWindowDescription = document.createElement('textarea');
const editNewWindowUser = document.createElement('select');
const editNewWindowCancelBtn = document.createElement('button');
const editNewWindowAddBtn = document.createElement('button');
const doneNewWindowContainer = document.createElement('div');
const doneNewWindowBtnContainer = document.createElement('div');
const doneNewWindowTitle = document.createElement('div');
const doneNewWindowYesBtn = document.createElement('button');
const doneNewWindowNoBtn = document.createElement('button');
const lengthNewWindowContainer = document.createElement('div');
const lengthNewWindowTitle = document.createElement('div');
const lengthNewWindowBtn = document.createElement('button');

let todoArr = [];
let progressArr = [];
let doneArr = [];
let savedTodoArr = JSON.parse(localStorage.getItem('todoArr')) || [];
let savedProgressArr = JSON.parse(localStorage.getItem('progressArr')) || [];
let savedDoneArr = JSON.parse(localStorage.getItem('doneArr')) || [];

header.append(trelloLogo, timeNow);
mainBlock.append(todoBlock, progressBlock, doneBlock);
todoBlock.append(todoBlockHeader, todoBlockContainer, todoBlockBtn);
progressBlock.append(progressBlockHeader, progressBlockContainer);
doneBlock.append(doneBlockHeader, doneBlockContainer, doneBlockBtn);
todoBlockHeader.append(todoBlockHeaderTitle, todoBlockHeaderCounter);
progressBlockHeader.append(progressBlockHeaderTitle, progressBlockHeaderCounter);
doneBlockHeader.append(doneBlockHeaderTitle, doneBlockHeaderCounter);
mainPage.append(newWindowContainer);
newWindowContainer.append(newWindowTitle, newWindowDescription, newWindowBtnContainer);
newWindowBtnContainer.append(newWindowUser, newWindowCancelBtn, newWindowAddBtn);
mainPage.append(editNewWindowContainer);
editNewWindowContainer.append(editNewWindowTitle, editNewWindowDescription, editNewWindowBtnContainer);
editNewWindowBtnContainer.append(editNewWindowUser, editNewWindowCancelBtn, editNewWindowAddBtn);
mainPage.append(doneNewWindowContainer);
doneNewWindowContainer.append(doneNewWindowTitle, doneNewWindowBtnContainer);
doneNewWindowBtnContainer.append(doneNewWindowYesBtn, doneNewWindowNoBtn);
mainPage.append(lengthNewWindowContainer);
lengthNewWindowContainer.append(lengthNewWindowTitle, lengthNewWindowBtn);

trelloLogo.classList.add('trelloLogo');
timeNow.classList.add('timeNow');
todoBlock.classList.add('todoBlock');
progressBlock.classList.add('progressBlock');
doneBlock.classList.add('doneBlock');
todoBlockHeader.classList.add('todoBlockHeader');
progressBlockHeader.classList.add('progressBlockHeader');
doneBlockHeader.classList.add('doneBlockHeader');
todoBlockContainer.classList.add('todoBlockContainer');
progressBlockContainer.classList.add('progressBlockContainer');
doneBlockContainer.classList.add('doneBlockContainer');
todoBlockBtn.classList.add('todoBlockBtn');
doneBlockBtn.classList.add('doneBlockBtn');
todoBlockHeaderCounter.classList.add('todoBlockHeaderCounter');
progressBlockHeaderCounter.classList.add('progressBlockHeaderCounter');
doneBlockHeaderCounter.classList.add('doneBlockHeaderCounter');
newWindowUser.classList.add('select');
newWindowContainer.classList.add('newWindowContainer');
newWindowTitle.classList.add('newWindowTitle');
newWindowDescription.classList.add('newWindowDescription');
newWindowBtnContainer.classList.add('newWindowBtnContainer');
newWindowCancelBtn.classList.add('newWindowCancelBtn');
newWindowAddBtn.classList.add('newWindowAddBtn');
editNewWindowUser.classList.add('select');
editNewWindowContainer.classList.add('editNewWindowContainer');
editNewWindowTitle.classList.add('editNewWindowTitle');
editNewWindowDescription.classList.add('editNewWindowDescription');
editNewWindowBtnContainer.classList.add('editNewWindowBtnContainer');
editNewWindowCancelBtn.classList.add('editNewWindowCancelBtn');
editNewWindowAddBtn.classList.add('editNewWindowAddBtn');
doneNewWindowContainer.classList.add('newWindowDoneContainer');
doneNewWindowTitle.classList.add('doneNewWindowTitle');
doneNewWindowBtnContainer.classList.add('doneNewWindowBtnContainer');
doneNewWindowYesBtn.classList.add('doneNewWindowYesBtn');
doneNewWindowNoBtn.classList.add('doneNewWindowNoBtn');
lengthNewWindowContainer.classList.add('lengthNewWindowContainer');
lengthNewWindowTitle.classList.add('lengthNewWindowTitle');
lengthNewWindowBtn.classList.add('lengthNewWindowBtn');

trelloLogo.innerText = 'Trello v.7.33b';
todoBlockHeaderTitle.innerText = 'TODO:';
progressBlockHeaderTitle.innerText = 'IN PROGRESS:';
doneBlockHeaderTitle.innerText = 'DONE:';
todoBlockBtn.innerText = 'NEW TODO';
doneBlockBtn.innerText = 'DELETE ALL';
newWindowCancelBtn.innerText = 'Cancel';
newWindowAddBtn.innerText = 'Confirm';
editNewWindowCancelBtn.innerText = 'Cancel';
editNewWindowAddBtn.innerText = 'Confirm';
todoBlockHeaderCounter.innerText = '0';
progressBlockHeaderCounter.innerText = '0';
doneBlockHeaderCounter.innerText = '0';
doneNewWindowNoBtn.innerText = 'No';
doneNewWindowYesBtn.innerText = 'Yes';
doneNewWindowTitle.innerText = 'Did you do everything?';
lengthNewWindowBtn.innerText = 'Well done';
lengthNewWindowTitle.innerText = 'You have to do some "in progress" todos';

newWindowTitle.setAttribute('placeholder', 'Title');
newWindowDescription.setAttribute('placeholder', 'Description');
editNewWindowTitle.setAttribute('placeholder', 'Title');
editNewWindowDescription.setAttribute('placeholder', 'Description');

const getUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(users => { users.forEach(people => { renderUser(people.username, newWindowUser, editNewWindowUser) }) });
};

const handleTodo = () => {
    const todoItem = createTodoItem(newWindowTitle.value, newWindowDescription.value, newWindowUser.value);
    if (newWindowTitle.value && newWindowDescription.value) {
        newWindowTitle.value = '';
        newWindowDescription.value = '';
        hideAddNewWindow(newWindowContainer);
    }

    if (!todoItem) { return }

    todoArr.push(todoItem);

    const itemContainer = renderTodoItem(todoBlockContainer, todoItem);
    todoBtnFunction(itemContainer);

    getCounter(todoBlockHeaderCounter, todoArr, progressBlockHeaderCounter, progressArr, doneBlockHeaderCounter, doneArr);
    updateLocalStorage(todoArr, progressArr, doneArr);
};

const handleProgressTodo = (todoItem) => {
    progressArr.push(todoItem);
    const progressItemContainer = renderTodoItem(progressBlockContainer, todoItem);
    changeStyletoProgress(progressItemContainer);

    progressBtnFunction(progressItemContainer);
    getCounter(todoBlockHeaderCounter, todoArr, progressBlockHeaderCounter, progressArr, doneBlockHeaderCounter, doneArr);
    updateLocalStorage(todoArr, progressArr, doneArr);
};

const todoBtnFunction = (itemBlock) => {
    itemBlock.addEventListener('click', (event) => {
        if (event.target.dataset.name === 'closeBtn') {
            const todoID = itemBlock.dataset.todoid;
            event.currentTarget.remove();

            todoArr = todoArr.filter(todo => +todoID !== +todo.id);
            getCounter(todoBlockHeaderCounter, todoArr, progressBlockHeaderCounter, progressArr, doneBlockHeaderCounter, doneArr);
            updateLocalStorage(todoArr, progressArr, doneArr);
        }
    });

    itemBlock.addEventListener('click', (event) => {
        if (event.target.dataset.name === 'moveToProgress') {
            if (progressArr.length > 5) {
                showAddNewWindow(lengthNewWindowContainer);
                hideAddNewWindow(doneNewWindowContainer);
                hideAddNewWindow(newWindowContainer);

            } else {
                const todoID = itemBlock.dataset.todoid;
                event.currentTarget.remove();

                let item = todoArr.find(todo => +todoID === +todo.id);
                todoArr = todoArr.filter(todo => +todoID !== +todo.id);
                getCounter(todoBlockHeaderCounter, todoArr, progressBlockHeaderCounter, progressArr, doneBlockHeaderCounter, doneArr);
                handleProgressTodo(item);
                updateLocalStorage(todoArr, progressArr, doneArr);
            }
        }
    });

    itemBlock.addEventListener('click', (event) => {
        if (event.target.dataset.name === 'editBtn') {
            const todoID = itemBlock.dataset.todoid;
            let todoItem = todoArr.find(todo => +todoID === +todo.id);

            showAddNewWindow(editNewWindowContainer);
            editNewWindowTitle.value = todoItem.title;
            editNewWindowDescription.value = todoItem.description;
            editNewWindowUser.value= todoItem.workUser;

            editNewWindowAddBtn.addEventListener('click', () => {
                todoItem.title = editNewWindowTitle.value;
                todoItem.description = editNewWindowDescription.value;
                todoItem.id = todoID;
                todoItem.workUser = editNewWindowUser.value
                updateLocalStorage(todoArr, progressArr, doneArr);
                hideAddNewWindow(editNewWindowContainer);
                location.reload()
            });
        }
    });

    const getRandomStart = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    itemBlock.onclick = () => {
        itemBlock.style.backgroundColor = 'rgb('+getRandomStart(0,255)+', '+getRandomStart(0,255)+', '+getRandomStart(0,255)+', '+0.5+')';
    };

    newWindowContainer.onmousedown = (event) => {

        let shiftX = event.clientX - newWindowContainer.getBoundingClientRect().left;
        let shiftY = event.clientY - newWindowContainer.getBoundingClientRect().top;

        newWindowContainer.style.position = 'absolute';
        newWindowContainer.style.zIndex = '1000';

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            newWindowContainer.style.left = pageX - shiftX - 10 + 'px';
            newWindowContainer.style.top = pageY - shiftY - 10 + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
            newWindowContainer.hidden = true;
        }

        document.addEventListener('mousemove', onMouseMove);

        newWindowContainer.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            newWindowContainer.onmouseup = null;
        };
    };
};

const progressBtnFunction = (itemBlock) => {
    itemBlock.addEventListener('click', (event) => {
        if (event.target.dataset.name === 'moveToTodo') {
            const todoID = itemBlock.dataset.todoid;
            event.currentTarget.remove();

            let todoItem = progressArr.find(todo => +todoID === +todo.id);

            const itemContainer = renderTodoItem(todoBlockContainer, todoItem);
            todoBtnFunction(itemContainer);
            todoArr.push(todoItem);

            progressArr = progressArr.filter(todo => +todoID !== +todo.id);
            getCounter(todoBlockHeaderCounter, todoArr, progressBlockHeaderCounter, progressArr, doneBlockHeaderCounter, doneArr);
            updateLocalStorage(todoArr, progressArr, doneArr);
        }
    });

    itemBlock.addEventListener('click', (event) => {
        if (event.target.dataset.name === 'moveToDone') {
            const todoID = itemBlock.dataset.todoid;

            event.currentTarget.remove();
            let item = progressArr.find(todo => +todoID === +todo.id);

            const itemContainer = renderTodoItem(doneBlockContainer, item);

            doneArr.push(item);
            doneBtnFunction(itemContainer);

            progressArr = progressArr.filter(todo => +todoID !== +todo.id);
            getCounter(todoBlockHeaderCounter, todoArr, progressBlockHeaderCounter, progressArr, doneBlockHeaderCounter, doneArr);
            updateLocalStorage(todoArr, progressArr, doneArr);
        }
    });
};

const doneBtnFunction = (itemBlock) => {
    itemBlock.addEventListener('click', (event) => {
        if (event.target.dataset.name === 'closeBtn') {
            const todoID = itemBlock.dataset.todoid;
            event.currentTarget.remove();

            doneArr = doneArr.filter(todo => +todoID !== +todo.id);
            getCounter(todoBlockHeaderCounter, todoArr, progressBlockHeaderCounter, progressArr, doneBlockHeaderCounter, doneArr);
            updateLocalStorage(todoArr, progressArr, doneArr);
        }
    });
};

doneBlockBtn.addEventListener('click', () => {
    if (!doneArr.length) { return }

    showAddNewWindow(doneNewWindowContainer);
    hideAddNewWindow(newWindowContainer);
    hideAddNewWindow(lengthNewWindowContainer);

    doneNewWindowNoBtn.addEventListener('click', () => {
        hideAddNewWindow(doneNewWindowContainer);
    });

    doneNewWindowYesBtn.addEventListener('click', () => {
        doneBlockContainer.innerHTML = '';
        doneArr.length = 0;
        updateLocalStorage(todoArr, progressArr, doneArr);
        getCounter(todoBlockHeaderCounter, todoArr, progressBlockHeaderCounter, progressArr, doneBlockHeaderCounter, doneArr);
        hideAddNewWindow(doneNewWindowContainer);
    });
});

todoBlockBtn.addEventListener('click', () => {
    showAddNewWindow(newWindowContainer);
    hideAddNewWindow(doneNewWindowContainer);
    hideAddNewWindow(lengthNewWindowContainer);
});

newWindowCancelBtn.addEventListener('click', () => {
    newWindowTitle.value = '';
    newWindowDescription.value = '';
    hideAddNewWindow(newWindowContainer);
});

editNewWindowCancelBtn.addEventListener('click', () => {
    hideAddNewWindow(editNewWindowContainer);
});

newWindowAddBtn.addEventListener('click', handleTodo);

lengthNewWindowBtn.addEventListener('click', () => {
    hideAddNewWindow(lengthNewWindowContainer);
});

if (savedDoneArr.length) {
    for (let todo of savedDoneArr) {
        doneArr.push(todo);
        const itemContainer = renderTodoItem(doneBlockContainer, todo);
        doneBtnFunction(itemContainer);
        getCounter(todoBlockHeaderCounter, todoArr, progressBlockHeaderCounter, progressArr, doneBlockHeaderCounter, doneArr);
    }
}

if (savedTodoArr.length) {
    for (let todo of savedTodoArr) {
        todoArr.push(todo);
        const itemContainer = renderTodoItem(todoBlockContainer, todo);
        todoBtnFunction(itemContainer);
        getCounter(todoBlockHeaderCounter, todoArr, progressBlockHeaderCounter, progressArr, doneBlockHeaderCounter, doneArr);
    }
}

if (savedProgressArr.length) {
    for (let todo of savedProgressArr) {
        handleProgressTodo(todo);
    }
}



currentTime(timeNow);
getUsers();

