// Note that there is currently no way to place type annotations within destructuring patterns. 
// This is because the following syntax already means something different in JavaScript.
// 请注意，目前没有办法在解构模式中放置类型注释。
// 这是因为下面的语法在 JavaScript 中已经有了不同的含义。
function draw({ shape: Shape, xPos: number = 100 /*...*/ }) {
  console.log(shape); // Cannot find name 'shape'. Did you mean 'Shape'?ts(2552)
  console.log(xPos);  // Cannot find name 'xPos'.ts(2304)
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// You can define the name of the unpacked variable. 
// Here we unpack the property named displayName, and rename it to dname for use within the function body.
// 你可以定义解构后的变量的名称。
// 这里我们把名为displayName的属性解构，并把它重命名为dname，以便在函数体中使用。
function userDisplayName({ displayName: dname }) {
  return dname;
}
console.log(userDisplayName(user));