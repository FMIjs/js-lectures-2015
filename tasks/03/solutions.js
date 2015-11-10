//1.
Array.prototype.myMap = function(operation){
    var result = [];
    this.forEach(function(elem){
        result.push(operation(elem));
    });
    return result;
};

[1,2,3,4,5,6,7,8,9].myMap(function(el){ return el + 10; }); // -> [11,12,13,14,15,16,17,18,19]



//2.
function Point(x, y){
    this.x = x;
    this.y = y;
}

Point.prototype.toArray = function(){
    var self = this;
    var result = [];
    Object.keys(this).forEach(function(key){
        var prop = self[key];
        if(prop instanceof Function) return;
        result.push(prop);
    });
    return result;
};

function Point3D(x, y, z){
    Point.call(this, x, y);
    this.z = z;
}

Point3D.prototype = Object.create(Point.prototype);

var p = new Point(1,2);
var p1 = new Point3D(1,2,3);
console.log(p.toArray());
console.log(p1.toArray());



//3
function Vehicle(mileage){

    this.getMileage = function(){
        return mileage.val;
    };

    this.tostring = function(){
        return 'This Vehicle mileage is ' + mileage.val;
    };

}


function Car(brand, consumption){
    var mileage = { val: 0 };
    Vehicle.call(this, mileage);
    var superToString = this.tostring;

    this.drive = function(miles){
        mileage.val += miles;
    };

    this.getBrand = function(){
        return brand;
    };

    this.getConsumption = function(){
        return consumption;
    };

    this.tostring = function(){
       return brand + ' ' + consumption + ' ' + superToString();
    };
}

var c1 = new Car('honda', 5);
console.log(c1.getMileage()); // -> 0
console.log(c1.tostring()); // -> honda 5 This Vehicle mileage is 0
c1.drive(1000);
console.log(c1.getMileage()); // -> 1000
console.log(c1.tostring()); // -> honda 5 This Vehicle mileage is 1000



//4
var FMIjs = (function(){

    var BinaryHeap = function(list){
        var self = this;
        if(!(list instanceof Array)) return this;  //or use Array.isArray(list)
        list.forEach(function(el){
            self.insert(el);
        });
    };

    BinaryHeap.prototype = Object.create(Array.prototype);

    BinaryHeap.prototype.parentIndex = function(i){
        return i === 0 ? 0 : Math.ceil(i/2) - 1;
    };

    BinaryHeap.prototype.leftIndex = function(i){
        return (2 * i) + 1;
    };

    BinaryHeap.prototype.rightIndex = function(i){
        return (2 * i) + 2;
    };

    BinaryHeap.prototype.parentElement = function(i){
        return this[this.parentIndex(i)];
    };


    BinaryHeap.prototype.leftElement = function(i){
        return this[this.leftIndex(i)];
    };

    BinaryHeap.prototype.rightElement = function(i){
        return this[this.rightIndex(i)];
    };

    BinaryHeap.prototype.getMinimum = function(){
        var lastIndex = this.length - 1;
        this.swap(0, lastIndex);
        var result = this.pop();
        this.bubbleDown();
        return result;
    };

    BinaryHeap.prototype.isEmpty = function(){
        return this.length === 0;
    };

    BinaryHeap.prototype.insert = function(value){
        this.push(value);
        this.bubbleUp();
        return this.toString();
    };

    BinaryHeap.prototype.swap = function(firstIndex, secondIndex){
        var tmp = this[firstIndex];
        this[firstIndex] = this[secondIndex];
        this[secondIndex] = tmp;
    };

    BinaryHeap.prototype.bubbleUp = function(){
        var index = this.length - 1;
        while(this.parentElement(index) > this[index]){
            var parentIndex = this.parentIndex(index);
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    };

    BinaryHeap.prototype.bubbleDown = function(){
        var index = 0;
        var rightValue = null;
        var leftIndex = null;
        var currentValue = null;
        while(this.leftElement(index)){
            leftValue = this.leftElement(index);
            rightValue = this.rightElement(index);
            currentValue = this[index];
            if(currentValue > leftValue || currentValue > rightValue){
                if(leftValue > rightValue){
                    this.swap(this.rightIndex(index), index);
                    index = this.rightIndex(index);
                }else{
                    this.swap(this.leftIndex(index), index);
                    index = this.leftIndex(index);
                }
            }else{
                break;
            }
        }
    };

    var heapSort = function(list){
        var heap = new BinaryHeap(list);
        var result = [];
        while(heap.length){
            result.push(heap.getMinimum());
        }
        return result;
    };
    return {
        BinaryHeap: BinaryHeap,
        heapSort: heapSort
    };
}());

var arr = [1,2,6,9,2,4,9,87,36,21,1];
console.log(FMIjs.heapSort(arr));

var b = new FMIjs.BinaryHeap();
b.insert(5);
b.insert(10);
b.insert(1);

console.log(b.getMinimum()); //-> 1
