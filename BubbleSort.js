const values = [3, 1, 3, 2, 0, 10, -7];

const bubbleSort = (v = []) => {
  let notSorted = true;
  while (notSorted) {
    notSorted = false;
    for (let idx = 1; idx < v.length; idx++) {
      if (values[idx] < values[idx - 1]) {
        const x = values[idx];
        values[idx] = values[idx - 1];
        values[idx - 1] = x;

        notSorted = true;
      }
    }
  }
}

bubbleSort(values);
console.log(values);
