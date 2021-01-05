 class HashTable {
    constructor(initialSize = 16, loadFactor = 0.75, hashFn = x=>x) {
        this.buckets = [];
        this.loadFactor = loadFactor;
        this.hashFn = hashFn;
        this.valueCount = 0;
        this.__initBuckets(initialSize);
    }

    put(k, v) {
      const b = this.buckets[this.hashFn(k) % this.buckets.length];
      // check if already exists
      for (let idx = 0; idx < b.length; idx++) {
          if (b[idx].v === v) {
              return v;
          }
      }

      b.push({k, v});

      ++this.valueCount;
      if (this.valueCount / this.buckets.length > 0.75) {
          this.__rehash();
      }
    }

    __rehash() {
      const oldBuckets = this.buckets;
      this.buckets = [];
      this.valueCount = 0;
      this.__initBuckets(oldBuckets.length * 2);

      oldBuckets.forEach(b => {
          b.forEach(x => {
              this.put(x.k, x.v);
          });
      });
    }

    get(k) {
        const bucket = this.buckets[this.hashFn(k) % this.buckets.length];
        for (let idx = 0; idx < bucket.length; idx++) {
            if (bucket[idx].k === k) {
                return bucket[idx].v;
            }
        }
    }

    delete(k) {
        const bucket = this.buckets[this.hashFn(k) % this.buckets.length];
        for (let idx = 0; idx < bucket.length; idx++) {
            if (bucket[idx].k === k) {
                bucket.splice(idx);
                --this.valueCount;
            }
        }
    }

    size() {
      return this.valueCount;
    }

    capacity() {
      return this.buckets.length;
    }

    __initBuckets(size) {
      for (let idx = 0; idx < size; idx++) {
          this.buckets.push(null);
      }
    }
}

function test() {
    const t = new HashTable();
    console.log(`Created: size = ${t.size()}, capacity = ${t.capacity()}`);
    for (let idx = 0; idx < 10 * 2; idx += 2) {
        t.put(idx, idx);
    }
    console.log(`Populated 10 items: size = ${t.size()}, capacity = ${t.capacity()}`);
    let output = "";
    for (let idx = 0; idx < 10 * 2; idx += 2) {
        output += t.get(idx) + " ";
    }
    console.log(output);
    for (let idx = 0; idx < 10 * 2; idx += 2) {
        t.put(idx, idx);
    }
    console.log(`Populated 10 same items: size = ${t.size()}, capacity = ${t.capacity()}`);
    for (let idx = 0; idx < 10 * 2; idx += 2) {
        t.put(idx+1, idx+1);
    }
    console.log(`Populated 10 different items: size = ${t.size()}, capacity = ${t.capacity()}`);
    output = "";
    for (let idx = 0; idx < 10 * 2; idx += 2) {
        output += t.get(idx) + " ";
        output += t.get(idx+1) + " ";
    }
    console.log(output);
    t.delete(3);
    t.delete(5);
    t.delete(6);
    console.log(`Removed keys 3, 5 and 6: size = ${t.size()}, capacity = ${t.capacity()}`);
    output = "";
    for (let idx = 0; idx < 10 * 2; idx += 2) {
        output += t.get(idx) + " ";
        output += t.get(idx+1) + " ";
    }
    console.log(output);
}

test();
