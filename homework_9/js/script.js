"use strict";

const fibonacci = (function () {
    let firstInitialIterationDone = false;
    let secondInitialIterationDone = false;
    let previous = 0;
    let current = 1;

    function calcNextValue() {
        let nextValue = previous + current;
        console.log(nextValue);
        previous = current;
        current = nextValue;
    }

    function startFibonacciSequence() {
        if (previous === 0) {
            if (!firstInitialIterationDone) {
                console.log(previous);
                firstInitialIterationDone = true;
            } else if (firstInitialIterationDone && !secondInitialIterationDone) {
                console.log(current);
                secondInitialIterationDone = true;
            } else {
                calcNextValue();
            }
        } else {
            calcNextValue();
        }
    }

    return startFibonacciSequence;
})();

fibonacci()
fibonacci()
fibonacci()
fibonacci()
fibonacci()
fibonacci()
fibonacci()
fibonacci()
fibonacci()
fibonacci()
fibonacci()
fibonacci()
fibonacci()
fibonacci()
fibonacci()
fibonacci()