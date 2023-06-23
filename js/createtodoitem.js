export const createTodoItem = (newWindowTitleValue, newWindowDescriptionValue, userName) => {
    if(!newWindowTitleValue || !newWindowDescriptionValue) {return}

    const date = new Date();
    const title = newWindowTitleValue;
    const description = newWindowDescriptionValue;
    const todoItem = {
        title,
        description,
        data: date.toLocaleDateString(),
        workUser: userName,
        id: Date.now(),
    };

    return todoItem;
};