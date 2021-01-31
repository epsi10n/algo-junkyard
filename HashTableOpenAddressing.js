const LINEAR_PROBATION = 'LINEAR_PROBATION';
const QUADRATIC_PROBATION = 'QUADRATIC_PROBATION';

class HashTable {
    constructor(initialSize = 16, loadFactor = 0.75, hashFn = x=>x, method = LINEAR_PROBATION) {
        this.method = method;
        this.buckets = [];
        this.loadFactor = loadFactor;
        this.hashFn = hashFn;
        this.valueCount = 0;
        this._probeSeqCnt = 0;
        this.__initBuckets(initialSize);
    }

    put(k, v) {
        // check load factor state
        if ((this.valueCount / this.buckets.length) > this.loadFactor) {
            this.__rehash();
        }
        // calculate primary insert position
        let putIdx = k % this.buckets.length;
        // otherwise try to find new position by linear shifting
        while (this.buckets[putIdx] != null) {
            // replace value if keys are equal
            if (this.buckets[putIdx].k === k) {
                this.buckets[putIdx] = {k, v};
                ++this.valueCount;
                return;
            }
            putIdx = this.__makeProbationSequenceStep(putIdx);
        }
        // when we finished we can insert target element
        this.buckets[putIdx] = {k, v};
        ++this.valueCount;
    }

    __rehash() {
        const newBuckets = [];
        const oldBuckets = this.buckets;
        this.valueCount = 0;
        // double capacity to decrease loadFactor
        for (let idx = 0; idx < this.buckets.length * 2; idx++) {
            newBuckets.push(null);
        }
        this.buckets = newBuckets;
        oldBuckets.forEach(x => !!x ? this.put(x.k, x.v) : undefined);
    }

    get(k) {
        // calculate primary retrieve position
        let getIdx = k % this.buckets.length;
        // if empty cell return immediately
        while (this.buckets[getIdx] != null && this.buckets[getIdx].k !== k) {
            getIdx = this.__makeProbationSequenceStep(getIdx);
        }

        if (!this.buckets[getIdx]) {
            return null;
        }

        return this.buckets[getIdx].v;
    }

    delete(k) {
        // calculate primary retrieve position
        let deleteIdx = k % this.buckets.length;
        if (this.buckets[deleteIdx] == null) {
            return;
        }

        // move over probation sequence until reac end of it or find given key
        while (this.buckets[deleteIdx] != null && this.buckets[deleteIdx].k !== k) {
            deleteIdx = this.__makeProbationSequenceStep(deleteIdx);
        }

        // if found something perform deletion
        if (!!this.buckets[deleteIdx]) {
          this.buckets[deleteIdx] = null;
          --this.valueCount;
        }

        // check probation sequence probable breakout
        deleteIdx = this.__makeProbationSequenceStep(deleteIdx);
        while (this.buckets[deleteIdx] != null) {
            // in this cycle check out if we broke probation sequence
            if ((this.buckets[deleteIdx].k % this.buckets.length) !== deleteIdx) {
                // in this case shift backward
                this.buckets[(deleteIdx - 1) % this.buckets.length] = this.buckets[deleteIdx];
                this.buckets[deleteIdx] = null;
                deleteIdx = this.__makeProbationSequenceStep(deleteIdx);
            } else {
                // in this case we consider then probation sequence rehash has done
                return;
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

    // TODO impl for other probation sequences method
    __makeProbationSequenceStep(idx) {
        switch (method) {
            case LINEAR_PROBATION:
                return (idx + 1) % this.buckets.length;
            case QUADRATIC_PROBATION:
                return (idx + 1) % this.buckets.length;
            default:
                break;
        }

    }
}

function test() {
    console.log("Basic case:");
    let t = new HashTable();
    t.put(1, "one");
    console.log(1, t.get(1));
    console.log("--------------------");

    console.log("Rehash call (add > 50% of capacity):");
    t = new HashTable();
    for (let idx = 1; idx <= 10; idx++) {
        t.put(idx, `item${idx}`);
    };
    for (let idx = 1; idx <= 10; idx++) {
        console.log(`${idx}: ${t.get(idx)}`);
    };
    console.log("--------------------");

    console.log("Probation sequence call (add item with same modulos 1, 11...)");
    t = new HashTable();
    console.log("add 5 items");
    for (let idx = 1; idx <= 5; idx++) {
        t.put(idx * 10 + 1, `item${idx * 10 + 1}`);
    };
    for (let idx = 1; idx <= 5; idx++) {
        console.log(`${idx * 10 + 1}: ${t.get(idx * 10 + 1)}`);
    };
    console.log("try delete with probe sequence rehashing... (31)");
    t.delete(31);
    for (let idx = 1; idx <= 5; idx++) {
        console.log(`${idx * 10 + 1}: ${t.get(idx * 10 + 1)}`);
    };
    console.log(`Capacity ${t.capacity()}`);
    console.log(`Size ${t.size()}`);
    console.log("--------------------");

    console.log("try put with probe sequence and rehashing (double capacity): ");
    t = new HashTable();
    console.log(`Capacity ${t.capacity()}`);
    console.log(`Size ${t.size()}`);
    for (let idx = 1; idx <= 10; idx++) {
        t.put(idx * 10 + 1, `item${idx * 10 + 1}`);
        t.put(idx * 10 + 2, `item${idx * 10 + 2}`);
    };
    console.log(`Capacity ${t.capacity()}`);
    console.log(`Size ${t.size()}`);
    console.log("Try delete (22)...");
    t.delete(22);
    console.log('t.get(32) = ', t.get(32));
    console.log(`Capacity ${t.capacity()}`);
    console.log(`Size ${t.size()}`);
    console.log("--------------------");

    console.log("Super capacity test: ")
    t = new HashTable();
    for (let idx = 1; idx <= 1500000; idx++) {
        t.put(idx, `item${idx}`);
    }
    console.log(`Capacity ${t.capacity()}`);
    console.log(`Size ${t.size()}`);
    console.log("Random sampling...");
    for (let idx = 1; idx <= 10; idx++) {
        const k = Math.floor(Math.random() * 1500000);
        console.log(k, t.get(k));
    }
    console.log("<That's all folks>");
}

test();
