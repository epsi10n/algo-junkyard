const factorial = n => (n <= 0 ? 1 : (n * factorial(n - 1)));
const fibbonacci = n => (n <= 1 ? 1 : (fibbonacci(n - 1) + fibbonacci(n - 2)));

const hanoi = (fromIdx, toIdx, bufIdx, n) => {
    if (n > 1) {
        hanoi(fromIdx, bufIdx, toIdx, n - 1);
    }
    console.log(`${fromIdx}->${toIdx}`);
    if (n > 1) {
        hanoi(bufIdx, toIdx, fromIdx, n - 1);
    }
}

console.log(factorial(5));
console.log(fibbonacci(10));

hanoi(1, 3, 2, 10);
