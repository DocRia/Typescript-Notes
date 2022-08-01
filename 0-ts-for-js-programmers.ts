// Since JavaScript supports classes and object-oriented programming, so does TypeScript. You can use an interface declaration with classes:
// 由于 JavaScript 支持类和面向对象的编程，TypeScript 也是如此。您可以将接口声明与类一起使用：
interface User {
  name: string;
  id: number;
}
 
class UserAccount {
  name: string;
  id: number;
 
  constructor (name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}
 
const user: User = new UserAccount("Murphy", 1);

// =====================================================================================================================

// A popular use-case for union types is to describe the set of string or number literals that a value is allowed to be:
// 联合类型的一个流行用例是描述允许值是 字符串 或 数字 字面量集合：
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

// =====================================================================================================================

// Generics provide variables to types. A common example is an array. 
// An array without generics could contain anything.
// An array with generics can describe the values that the array contains.
// 泛型为类型提供变量。一个常见的例子是数组。
// 没有泛型的数组可以包含任何东西。
// 具有泛型的数组可以描述数组包含的值。
type StringArray = Array<string>;                   // string[]
type NumberArray = Array<number>;                   // number[]
type ObjectWithNameArray = Array<{ name: string }>  // { name: string }[]

// =====================================================================================================================

// animal 断言为 Cat，只需要满足 Animal 兼容 Cat 或 Cat 兼容 Animal 即可
// animal 赋值给 tom，需要满足 Cat 兼容 Animal 才行
// 所以为了增加代码的质量，我们最好优先使用类型声明，这也比类型断言的 as 语法更加优雅
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}

const animal: Animal = {
  name: 'tom'
};
// Property 'run' is missing in type 'Animal' but required in type 'Cat'. ts(2741)
let tom: Cat = animal;

// =====================================================================================================================

// One of TypeScript’s core principles is that type checking focuses on the shape that values have. 
// This is sometimes called “duck typing” or “structural typing”.
// In a structural type system, if two objects have the same shape, they are considered to be of the same type.
// TypeScript 的核心原则之一是，类型检查侧重于值的形状。
// 这有时被称为 "鸭式类型 "或 "结构性类型"。
// 在一个结构性类型系统中，如果两个对象具有相同的形状，它们就被认为是同一类型。
interface Point {
  x: number;
  y: number;
}
 
function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}
 
// logs "12, 26"
const point = { x: 12, y: 26 };
logPoint(point);