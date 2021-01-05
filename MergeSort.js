const values = [3, 1, 3, 2, 0, 10, -7];

const mergeSort = (v = [], s = v.slice(), startIdx = 0, endIdx = v.length - 1) => {
  if (startIdx === endIdx) {
    return;
  }

  // divide by halfs
  const midPoint = Math.floor((startIdx + endIdx) / 2);

  // call MergeSort for both halfs
  mergeSort(v, s, startIdx, midPoint);
  mergeSort(v, s, midPoint + 1, endIdx);

  // merge sorted halfs
  let leftIndex = startIdx;
  let rightIndex = midPoint + 1;
  let scratchIndex = leftIndex;

  while ((leftIndex <= midPoint) && (rightIndex <= endIdx)) {
    if (v[leftIndex] <= v[rightIndex]) {
      s[scratchIndex] = v[leftIndex];
      ++leftIndex;
    } else {
      s[scratchIndex] = v[rightIndex];
      ++rightIndex;
    }
    ++scratchIndex;
  }

  // finishing copying for non-empty half
  for (let idx = leftIndex; idx <= midPoint; idx++) {
    s[scratchIndex] = v[idx];
    ++scratchIndex;
  }
  for (let idx = rightIndex; idx <= endIdx; idx++) {
    s[scratchIndex] = v[idx];
    ++scratchIndex;
  }

  // copying values to source array
  for (let idx = startIdx; idx <= endIdx; idx++) {
    v[idx] = s[idx];
  }
}

mergeSort(values);
console.log(values);
