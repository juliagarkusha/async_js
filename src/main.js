//fibonacci

function* fibonacci(n) {
    let current = 0;
    let next = 1;
    let count = 0;

    while (count < n) {
        yield current;
        [current, next] = [next, current + next];
        count++;
    }
}

const fibGen = fibonacci(10);
console.log(fibGen.next().value);
console.log(fibGen.next().value);
console.log(fibGen.next().value);
console.log(fibGen.next().value);
console.log(fibGen.next().value);
console.log(fibGen.next().value);

//flatten

function* flatten(arr) {
    for (const item of arr) {
        if (Array.isArray(item)) {
            yield* flatten(item);
        } else {
            yield item;
        }
    }
}

const nestedArr = [1, [2, 3], [4, 5, [6, 7]]];
const flattenGen = flatten(nestedArr);

console.log([...flattenGen]);

//asyncGenerator

async function* asyncGenerator(promises) {
    for (const promise of promises) {
        try {
            const result = await promise;
            yield result;
        } catch (error) {
            yield error;
        }
    }
}

const promises = [
    new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve) => setTimeout(() => resolve(2), 500)),
    new Promise((resolve, reject) => setTimeout(() => reject("Помилка"), 1500)),
];

(async () => {
    for await (const result of asyncGenerator(promises)) {
        console.log(result);
    }
})();

