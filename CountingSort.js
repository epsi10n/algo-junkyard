const values = [3, 1, 3, 2, 0, 10];

// this algorithm is specific for natural numbers set
const countingSort = (v = [], maxValue = Math.max(...v)) => {
  const counts = [];
  for (let x = 0; x <= maxValue; x++) {
    counts.push(0);
  }

  // count quantity for each value
  for (let idx = 0; idx < v.length; idx++) {
      ++counts[v[idx]];
  }

  // copy values into source array
  let idx = 0;
  for (let i = 0; i <= maxValue; i++) {
    for (let j = 1; j <= counts[i]; j++) {
      v[idx++] = i;
    }
  }
}

countingSort(values);
console.log(values);
