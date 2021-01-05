const values = [1, 3, 7, 9, 16, 22, 30];

const binarySearch = (v= [], t = -1) => {
  let min = 0;
  let max = v.length - 1;

  while (min <= max) {
    const mid = Math.floor((min + max) / 2);

    if (t < v[mid]) {
      max = mid - 1;
    } else if (t > v[mid]) {
      min = mid + 1;
    } else {
      return mid;
    }
  }

  return -1;
}

console.log(binarySearch(values, 9));
console.log(binarySearch(values, 17));
