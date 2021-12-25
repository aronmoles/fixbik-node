export const sleep = (time) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(0);
    }, time);
})
