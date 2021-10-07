const array = [1,2,3,4];
let current = 0;

const getNext = () => {
    if (current === array.length){
        current = 0;
    }
    current++;
    return array[current - 1];
}