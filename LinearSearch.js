const values = [1, 3, 7, 9, 16, 22, 30];

const linearSearch = (v = [], t = -1) => {
  for (let idx = 0; idx < v.length; idx++) {
    if (v[idx] === t) {
      return idx;
    }

    if (v[idx] > t) {
      return -1;
    }
  }

  return -1;
};

console.log(`Search 17 (-1) ${linearSearch(values, 17)}`);
console.log(`Search 9 (3) ${linearSearch(values, 9)}`);
