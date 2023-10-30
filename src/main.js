// randomDelayPrint

function randomDelayPrint(message) {
    const delayPrint = (index) => {
        if (index < message.length) {
            const randomDelay = Math.random() * 1000;
            setTimeout(() => {
                console.log(message[index]);
                delayPrint(index + 1);
            }, randomDelay);
        }
    };

    delayPrint(0);
}

randomDelayPrint("Hello world");

// debounce

const debounce = (callback, delay) => {
    let interval;

    return (...args) => {
        clearTimeout(interval);

        interval = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}

const expensiveOperation = () => console.log("Виконую складну операцію...");
const debouncedExpensiveOperation = debounce(expensiveOperation, 1000);

debouncedExpensiveOperation();
debouncedExpensiveOperation();
debouncedExpensiveOperation();

//intervalRace

const intervalRace = (functions, interval) => {
    const results = [];
    let index = 0;

    function runFunction() {
        if (index < functions.length) {
            const result = functions[index]();
            results.push(result);
            index++;
            setTimeout(runFunction, interval);
        }
    }

    runFunction();

    return new Promise((resolve) => {
        const checkCompletion = setInterval(() => {
            if (index >= functions.length) {
                clearInterval(checkCompletion);
                resolve(results);
            }
        }, interval);
    });
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const functions = [
    () => "Функція 1",
    () => "Функція 2",
    async () => {
        await delay(1000);
        return "Функція 3";
    },
    () => "Функція 4",
];

const interval = 1500;

intervalRace(functions, interval).then((results) => {
    console.log("Результати виконання функцій:", results);
});
