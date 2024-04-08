const isPrime=(num)=>{
    if (num <= 1) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false; 
        }
    }

    return true;

}


const getPrimeNumbersUnderThousand = ()=>{
    let num = 2;
    const interval = setInterval(() => {
        if (num >= 1000) {
            clearInterval(interval);
            return;
        }
        if (isPrime(num)) {
            console.log(num);
        }
        num++;
    }, 5000);
}

getPrimeNumbersUnderThousand();