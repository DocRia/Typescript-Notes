// String.repeat(count: number): string
// padding 不能是字符串
function padLeft(padding: number | string, input: string) {
  // Argument of type 'string | number' is not assignable to parameter of type 'number'.
  // Type 'string' is not assignable to type 'number'.ts(2345)
  return " ".repeat(padding) + input;
}

// 通过 if 控制类型分支
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}

// =====================================================================================================================

// Truthiness narrowing

// We wrapped the entire body of the function in a truthy check, but this has a subtle downside: 
// we may no longer be handling the empty string case correctly.
// 我们把整个函数的主体包裹在一个真值检查中，但这有一个微妙的缺点：
// 我们可能无法正确处理空字符串的情况。
function printAll(strs: string | string[] | null) {
  // !!!!!!!!!!!!!!!!
  //  DON'T DO THIS!
  //   KEEP READING
  // !!!!!!!!!!!!!!!!
  if (strs) { // strs = ''
    if (typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }
}

// 将对象判断放在同一个分支
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}

// =====================================================================================================================

// Equality narrowing

function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    x.toUpperCase();
    y.toLowerCase();
    // (method) String.toLowerCase(): string
  } else {
    console.log(x);
    console.log(y);
    // (parameter) y: string | boolean
  }
}

// =====================================================================================================================

// The in operator narrowing

type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
 
  return animal.fly();
}

// =====================================================================================================================

// This analysis of code based on reachability is called control flow analysis, 
// and TypeScript uses this flow analysis to narrow types as it encounters type guards and assignments.
// 这种基于可达性的代码分析称为控制流分析，
// TypeScript 在遇到类型保护和赋值时使用这种流分析来缩小类型。
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number" /* (parameter) padding: string | number */) {
    return " ".repeat(padding) + input;
  }
  return padding + input; // (parameter) padding: string
}

// =====================================================================================================================

// Discriminated unions 可辨识联合

// TypeScript still doesn’t know what to do here. 
// We’ve hit a point where we know more about our values than the type checker does.
// TypeScript仍然不知道该怎么做。
// 我们遇到了一个问题，那就是我们对我们的值比类型检查器知道的更多。
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}

// 可辨识联合 应用
interface Circle {
  kind: "circle";
  radius: number;
}
 
interface Square {
  kind: "square";
  sideLength: number;
}
 
type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2; // (parameter) shape: Circle
    case "square":
      return shape.sideLength ** 2;       // (parameter) shape: Square
  }
}