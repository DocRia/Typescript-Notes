// Type aliases and interfaces are very similar, and in many cases you can choose between them freely. 
// Almost all features of an interface are available in type, 
// the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.
// 类型别名和接口非常相似，在很多情况下你可以在它们之间自由选择。
// 几乎所有接口的功能都可以在类型中使用，
// 关键的区别在于，类型不能被重新打开以添加新的属性，而接口则总是可以扩展的。

// Extending an interface
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear = getBear() 
bear.name
bear.honey

// Extending a type via intersections
type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: boolean 
}

const bear = getBear();
bear.name;
bear.honey;

// Adding new fields to an existing interface
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});

// A type cannot be changed after being created
type Window = {
  title: string
}

type Window = {     // Error: Duplicate identifier 'Window'.
  ts: TypeScriptAPI
}
