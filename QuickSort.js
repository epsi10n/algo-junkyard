const values = [3, 1, 3, 2, 0, 10, -7];

const quickSort = (v = [], startIdx = 0, endIdx = values.length - 1) => {
  // in n <= 1 then sorted
  if (startIdx >= endIdx) {
    return;
  }

  // use first as divider
  const divider = v[startIdx]

  // move elems < divider into beggining
  // and elems > divider into and end
  let low = startIdx, high = endIdx;
  while (true) {
    // look array from <high>, to find last element that lesser than divider
    // Move found element into "hole". Now "hole" is on its place
    while (v[high] >= divider) {
      --high;
      if (high <= low) { // out of external while
        extFlag = false;
        break;
      }
    }

    if (high <= low) {
      // <low> and <high> met in the middle move divider here end exit cycle
      v[low] = divider;
      break;
    }

    // move found value to lower half
    v[low] = v[high];

    // look over from <low> to find first item that greater or equals to divider
    // move found item into "hole". Now "hole" appears on its place
    ++low;
    while(v[low] < divider) {
      ++low;
      if (low >= high) {
        // move out of external cycle
        extFlag = false;
        break;
      }
    }

    if (low >= high) {
      // <low> and <high> met in the middle move divider here end exit cycle
      low = high;
      v[high] = divider;
      break;
    }

    // move found value to upper half
    v[high] = v[low];
  }

  quickSort(v, startIdx, low - 1);
  quickSort(v, low + 1, endIdx);
}

quickSort(values, 0, values.length - 1);
console.log(values);
