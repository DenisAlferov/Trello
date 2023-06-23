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

    console.log(`${hour} : ${min} : ${sec}`)
    timeNow.innerText = `${hour} : ${min} : ${sec}`;
    const t = setTimeout(() => { currentTime(timeNow) }, 1000);
};