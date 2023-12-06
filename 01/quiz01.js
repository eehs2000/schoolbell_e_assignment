function getMaxMultiplication(numbers) {
  let first = "";
  let second = "";

  numbers.sort((a, b) => b - a);

  for (let i = 0; i < numbers.length; i++) {
    if (i % 2 === 0) {
      first += numbers[i];
    } else {
      second += numbers[i];
    }
  }

  return [parseInt(first), parseInt(second)];
}

const givenNumbers = [1, 3, 5, 7, 9];
const answer = getMaxMultiplication(givenNumbers);
console.log(answer);
