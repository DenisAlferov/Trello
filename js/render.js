export const renderTodoItem = (container, obj) => {
    const itemBlock = document.createElement('div');
    const itemBlockHeader = document.createElement('div');
    const itemBlockMain = document.createElement('div');
    const itemBlockFooter = document.createElement('div');
    const title = document.createElement('div');
    const description = document.createElement('div');
    const user = document.createElement('div');
    const time = document.createElement('div');
    const btnContainer = document.createElement('div');
    const editBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    const moveToProgressBtn = document.createElement('button');

    container.append(itemBlock);
    itemBlock.append(itemBlockHeader, itemBlockMain, itemBlockFooter);
    itemBlockHeader.append(title, btnContainer);
    itemBlockFooter.append(user, time);

    title.innerText = obj.title;
    description.innerText = obj.description;
    user.innerText = obj.workUser;
    time.innerText = obj.data;

    delBtn.setAttribute('data-name', 'closeBtn');
    itemBlock.setAttribute('data-todoid', obj.id);
    moveToProgressBtn.setAttribute('data-name', 'moveToProgress');
    editBtn.setAttribute('data-name', 'editBtn');

    itemBlock.classList.add('itemBlock');
    itemBlockHeader.classList.add('itemBlockHeader');
    title.classList.add('title');
    itemBlockMain.classList.add('itemBlockMain');
    itemBlockFooter.classList.add('itemBlockFooter');
    btnContainer.classList.add('btnContainer');
    editBtn.classList.add('editBtn');
    delBtn.classList.add('delBtn');
    moveToProgressBtn.classList.add('moveToProgressBtn');

    if (container.classList.contains('todoBlockContainer')) {
        btnContainer.append(editBtn, delBtn);
        itemBlockMain.append(description, moveToProgressBtn);
        moveToProgressBtn.innerText = '>';
        editBtn.innerText = 'Edit';
        delBtn.innerText = 'Delete';
    }
    if (container.classList.contains('progressBlockContainer')) {
        btnContainer.append(editBtn, delBtn);
        itemBlockMain.append(description);
        editBtn.innerText = 'BACK';
        delBtn.innerText = 'COMPLETE';
        editBtn.setAttribute('data-name', 'moveToTodo');
        delBtn.setAttribute('data-name', 'moveToDone');
    }
    if (container.classList.contains('doneBlockContainer')){
        btnContainer.append(delBtn);
        itemBlock.classList.add('moveToDoneStyle');
        itemBlockMain.append(description);
        delBtn.innerText = 'DELETE';
    }

    return itemBlock;
}

export const renderUser = (valueName, newWindow, editNewWindow) => {
    const nameOpt = document.createElement('option');
    nameOpt.innerText = valueName;
    nameOpt.value = valueName;

    const nameOpt2 = document.createElement('option');
    nameOpt2.innerText = valueName;
    nameOpt2.value = valueName;

    newWindow.append(nameOpt);
    editNewWindow.append(nameOpt2);
};