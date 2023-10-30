// sumArrayPromise

const sumArrayPromise = (numbers) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const sum = numbers.reduce((acc, current) => acc + current, 0);
            resolve(sum);
        }, 3000);
    });
}

sumArrayPromise([1, 2, 3, 4, 5]).then(console.log);

// concurrentPromises

const concurrentPromises = (promises, maxConcurrency) => {
    return new Promise((resolve) => {
        const results = [];
        let currentIndex = 0;

        function runNext() {
            if (currentIndex >= promises.length) {
                resolve(results);
                return;
            }

            const currentPromise = promises[currentIndex];
            currentIndex++;

            Promise.resolve(currentPromise)
              .then((result) => {
                  results.push(result);
              })
              .finally(() => {
                  runNext();
              });
        }

        for (let i = 0; i < maxConcurrency; i++) {
            runNext();
        }
    });
}

const promises = [
    new Promise((resolve) => setTimeout(() => resolve('Promise 1'), 1000)),
    new Promise((resolve) => setTimeout(() => resolve('Promise 2'), 500)),
    new Promise((resolve) => setTimeout(() => resolve('Promise 3'), 800)),
];

concurrentPromises(promises, 2).then(console.log);

// sequenceAsync

const sequenceAsync = (asyncFunctions) => {
    return asyncFunctions.reduce((chain, asyncFn) => {
        return chain.then(async (result) => {
            const nextResult = await asyncFn(result);
            return nextResult;
        });
    }, Promise.resolve(undefined));
}

const asyncFn1 = (result) => new Promise((resolve) => setTimeout(() => resolve(result ? result * 2 : 1), 1000));
const asyncFn2 = (result) => new Promise((resolve) => setTimeout(() => resolve(result ? result * 3 : 1), 1000));
const asyncFn3 = (result) => new Promise((resolve) => setTimeout(() => resolve(result ? result * 4 : 1), 1000));

const asyncFunctions = [asyncFn1, asyncFn2, asyncFn3];

sequenceAsync(asyncFunctions)
  .then((finalResult) => {
      console.log("Final Result:", finalResult);
  });
