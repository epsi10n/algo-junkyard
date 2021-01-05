const values = [3, 1, 3, 2, 0, 10, -7];

const selectionSort = (v = []) => {
  for (let idx1 = 0; idx1 < v.length; idx1++) {
    let minIdx = idx1;
    let minVal = values[idx1]

    for (let idx2 = idx1 + 1; idx2 < v.length; idx2++) {
      if (v[idx2] < minVal) {
        minIdx = idx2;
        minVal = v[idx2]
      }
    }

    const c = minVal;
    v[minIdx] = v[idx1];
    v[idx1] = c;
  }
}

selectionSort(values);
console.log(values);
