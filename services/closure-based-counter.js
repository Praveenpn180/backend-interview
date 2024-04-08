export const createCounter = (initialValue = 0) => {

    let count = initialValue
    const increment = () => {
        count++;
        return count
    }
    const decrement = () => {
        count--;
        return count
    }
    const setValue = (newValue) => {
        count = newValue;
        return count;
    }
    const getValue = () => {

        return count
    }
    return {
        increment,
        decrement,
        setValue,
        getValue
    };
}

const counter = createCounter(5)

console.log(counter.getValue());  // get counter values
console.log(counter.increment());  // increment value
console.log(counter.decrement());  // decrement value
console.log(counter.setValue(10));  // set counter value