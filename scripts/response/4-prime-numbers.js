const isPrime = (num) => {
  if (num <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
};

const getPrimeNumbersUnderThousand = () => {
  let interval = 0;
  for (let i = 2; i < 1000; i++) {
    if (isPrime(i)) {
      setTimeout((num) => {
        console.log(num);
      }, interval += Math.ceil(Math.random() * 5000) + 5000, i);
    }
  }
};

getPrimeNumbersUnderThousand();
