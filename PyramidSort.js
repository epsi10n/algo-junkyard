const values = [3, 1, 3, 2, 0, 10, -7];

const pyramidSort = (_v = []) => {
  _makeHeap(_v);
  for (let idx = _v.length - 1; idx >= 0; idx--) {
    _removeTopItem(_v, idx);
  }
}

const _makeHeap = (v = []) => {
  for (let idx = 0; idx < v.length; idx++) {
    let auxIdx = idx;
    while (auxIdx != 0) {
      const parentIdx = Math.floor((auxIdx - 1) / 2);

      if (v[auxIdx] <= v[parentIdx]) {
        break;
      }

      const x = v[auxIdx];
      v[auxIdx] = v[parentIdx];
      v[parentIdx] = x;

      auxIdx = parentIdx;
    }
  }
}

const _removeTopItem = (v = [], cnt) => {
  if (cnt == 0) {
    return v[0];
  }
  result = v[0];
  // move last item to root
  v[0] = v[cnt];
  // restore heap properties
  let auxIdx = 0;
  while (true) {
    // child indices
    let childIdx1 = 2 * auxIdx + 1;
    let childIdx2 = 2 * auxIdx + 2;
    // if child index drops out of tree, then use parent one
    if (childIdx1 >= cnt) {
      childIdx1 = auxIdx;
    }
    if (childIdx2 >= cnt) {
      childIdx2 = auxIdx;
    }
    // if heap property is true then exit
    if ((v[auxIdx] >= v[childIdx1])
    && (v[auxIdx] >= v[childIdx2])) {
      break;
    }
    // get Index of record with greater value
    let swapChildIdx = childIdx2;
    if (v[childIdx1] > v[childIdx2]) {
      swapChildIdx = childIdx1;
    }
    // swap with greater child value
    const x = values[auxIdx];
    values[auxIdx] = values[swapChildIdx];
    values[swapChildIdx] = x;
    // go to child branch
    auxIdx = swapChildIdx;
  }
  // return removed item
  v[cnt] = result;
  return result;
}

pyramidSort(values);
console.log(values);
