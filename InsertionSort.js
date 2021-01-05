const values = [3, 1, 3, 2, 0, 10, -7];

const insertionSort = (v = []) => {
  for (let idx1 = 0; idx1 < v.length; idx1++) {
    for (let idx2 = 0; idx2 < idx1; idx2++) {
      if (v[idx2] >= v[idx1]) {
        const x = v[idx2];
        v[idx2] = v[idx1];
        v[idx1] = x;
      }
    }
  }
};

insertionSort(values);
console.log(values);
