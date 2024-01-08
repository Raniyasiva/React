
let _variable = 'Hello,';

// Operators with parameters
function operations(a, b, c) {
  return a + b * c;
}
let result = operations(5, 3, 2);
console.log(result);

//control structure
if (result > 5) {
  console.log(greet('World'));
} else {
  console.log('Result is not greater than 5');
}

// Functions and parameters
function greet(name) {
  return `${_variable} ${name}!`;
}

// Arrow Function
const addNumbers = (x, y) => x + y;
console.log(addNumbers(10, 20)); 

// Objects and class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
  }
}
let person = new Person('Raniya', 23);
console.log(person.introduce());

// Array methods
let numbers = [1, 2, 3, 4, 5];

//push method
numbers.push(6);
console.log('After push:', numbers);

//findIndex method
let indexOfThree = numbers.indexOf(3);
console.log("Index of 3:", indexOfThree);

//map method
let doubledNumbers = numbers.map(num => num * 2);
console.log("Doubled numbers:", doubledNumbers); 

// Destructuring Array
let [firstNumber, secondNumber,...balance] = numbers;
console.log('Firstnum:' , firstNumber);
console.log(balance,'rest');

// Spread Operator
let newArray = [...numbers, 6, 7, 8];
console.log(newArray);

//Destructuring object

const object = {
  username: 'Siva',
  place:'Chennai'
};

const{username,place}=object;
console.log('Name:', username);
console.log('Place:',place);
