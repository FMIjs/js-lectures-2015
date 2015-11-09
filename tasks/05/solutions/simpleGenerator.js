function countFive(gen) {
    var n = 0;
    var nextNumber = function() {
        setTimeout(function() {
            if(n < 6) {
                return iterable.next(n++);//go to yield with n++
            }
        },0);
        return undefined;
    };
    var iterable = gen(nextNumber);
    iterable.next(); //kick start
}

countFive(function* (nextNumber) {
    while(true){
        var num = yield nextNumber();
        console.log(num);
    }
})