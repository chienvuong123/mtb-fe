## Typescript naming conventions

- Type names begin with "T".
- Interface names begin with "I".
- Enum names begin with "E".
- Type, interface, and enum names use PascalCase.
- Enum values or keys be in UPPERCASE.
- ALL_CAPS with underscore ‘_’ between multiple words.

```
interface ITeacher { }

type TFooBar = { }

enum EStatus {
  IN_ACTIVE,
  ACTIVE
}
```

- Use an interface or type when declaring an object type instead of using an anonymous one.

```
// Bad
const showPersonInfo = (person: { name: string; age: number; address: string }) => {
  console.log(person);
}

// Good
interface Person {
  name: string;
  age: number;
  address: string;
}

const showPersonInfo = (person: Person) => {
  console.log(person);
}
```

- Generic type parameter should be written as a single UPPERCASE character (e.g., T) or UpperCamelCase.

```
function identity<T>(arg: T): T {
  return arg;
}
// or
function identity<Type>(arg: Type): Type {
  return arg;
}
```

## Typescript file naming conventions

- Format: `<module>.type.ts`
- Common type in `common.type.ts`
- Common enum type in `enum.type.ts`
- Export everything (export \*) in `index.ts`

## Tips

- Use `unknown` instead of `any`
- Use enum to gather constant values, options, or status...
- For common components, props must extend the library's Props.

```
import type { ButtonProps } from 'antd';
import { Button } from 'antd';

interface AButtonProps extends ButtonProps {
  // custom props
}

const AButton = ({ children, ...others }: AButtonProps) => {
  return <Button {...others}>{children}</Button>;
}

export default AButton;
```

- Use interface when:

  - Defining object types.
  - Extending parent, class implements, declaration merging.
  - Working with objects that inherit from each other (`extends` faster than using `&`).

- User type when:
  - Defining a primitive-type alias, union types, tuple types, mapped types, or conditional types.
  - Creating functions types.

## References

- [Typescript Style Guide](https://google.github.io/styleguide/tsguide.html)
- [Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Best practices for Typescript coding](https://medium.com/@eshagarg1996/best-practices-for-typescript-coding-8b1ea98d02f8)
- [TotalTypescript](https://www.totaltypescript.com/type-vs-interface-which-should-you-use)
- [Medium](https://blog.bitsrc.io/type-vs-interface-in-typescript-cf3c00bc04ae)
