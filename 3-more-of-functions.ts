// If we want to describe something callable with properties, we can write a call signature in an object type
// 如果我们想用属性描述可调用的东西，我们可以在对象类型中编写调用签名
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}

// =====================================================================================================================

// You can write a construct signature by adding the new keyword in front of a call signature
// 您可以通过在调用签名前添加 new 关键字来编写构造签名
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}

// =====================================================================================================================

// Sometimes we want to relate two values, but can only operate on a certain subset of values.
// In this case, we can use a constraint to limit the kinds of types that a type parameter can accept.
// 有时我们想关联两个值，但只能对某个值的子集进行操作。
// 在这种情况下，我们可以使用约束来限制类型参数可以接受的类型种类。
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
 
// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
// Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.ts(2345)
const notOK = longest(10, 100);

// =====================================================================================================================

// Guidelines for Writing Good Generic Functions

// 1. Push Type Parameters Down
// When possible, use the type parameter itself rather than constraining it
// 尽可能使用类型参数本身而不是约束它
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}
 
function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}
 
// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad)
const b = firstElement2([1, 2, 3]);

// 2. Use Fewer Type Parameters
// Always use as few type parameters as possible
// 始终使用尽可能少的类型参数
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}
 
function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func);
}

// 3. Type Parameters Should Appear Twice
// If a type parameter only appears in one location, strongly reconsider if you actually need it
// 如果一个类型参数只出现在一个位置，就需要重新考虑是否真的需要它
function greet<Str extends string>(s: Str) {
  console.log("Hello, " + s);
}
greet("world");

// 函数优化
function greet(s: string) {
  console.log("Hello, " + s);
}

// =====================================================================================================================

// Function Overloads 函数重载
// 在 typescript 中，函数重载声明与重载实现是分离的

// The signature of the implementation is not visible from the outside. 
// When writing an overloaded function, you should always have two or more signatures above the implementation of the function.
// 从外部看不到实现的签名。
// 在编写重载函数时，您应该始终在函数实现之上有两个或多个签名。
function makeDate(timestamp: number): Date;                             // 声明1
function makeDate(m: number, d: number, y: number): Date;               // 声明2
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date { // 实现
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.ts(2575)
const d3 = makeDate(1, 3);