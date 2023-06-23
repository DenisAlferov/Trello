export const showAddNewWindow = (container) => {
    container.classList.add('activeNewWindow');
};

export const hideAddNewWindow = (container) => {
    container.classList.remove('activeNewWindow');
};

export const updateLocalStorage = (todoArray, progressArray, doneArray) => {
    localStorage.setItem('todoArr', JSON.stringify(todoArray));
    localStorage.setItem('progressArr', JSON.stringify(progressArray));
    localStorage.setItem('doneArr', JSON.stringify(doneArray));
};

export const getCounter = (todoCounter, todoArr, progressCounter, progressArr, doneCounter, doneArr) => {
    todoCounter.innerText = todoArr.length;
    progressCounter.innerText = progressArr.length;
    doneCounter.innerText = doneArr.length;
};

export const changeStyletoProgress = (itemBlock) => {
    itemBlock.classList.add('moveToProgressStyle');
};

export const changeStyletoDone = (itemBlock) => {
    itemBlock.classList.add('moveToDoneStyle ');
};
