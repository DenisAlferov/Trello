export const currentTime = (timeNow) => {
    const date = new Date();

    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    const updateTime = (k) => {
        if (k < 10) {return "0" + k}
        else {return k}
    };

    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);

    timeNow.innerText = `${hour} : ${min} : ${sec}`;

    if (hour > 20) {
        const greeting = document.createElement('p');
        timeNow.append(greeting);
        greeting.classList.add('greeting')
        greeting.innerText = 'Good evening!';
    } else if (hour < 6) {
        const greeting = document.createElement('p');
        timeNow.append(greeting);
        greeting.classList.add('greeting')
        greeting.innerText = 'Good night!';
    } else {
        const greeting = document.createElement('p');
        timeNow.append(greeting);
        greeting.classList.add('greeting')
        greeting.innerText = 'Good day!';
    }

    const t = setTimeout(() => { currentTime(timeNow) }, 1000);
};