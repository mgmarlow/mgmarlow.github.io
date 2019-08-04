---
path: 'happier-programming-with-sed'
title: 'Happier Programming with sed'
date: '2018-01-23'
---

Okay, I will admit that is a bit of a contentious title. However, after this classic command line utility saved me hours of repetitive work I felt it needed to be said.

## An Ideal Use Case

In the earlier days of TypeScript, string enums did not exist. There were, however, several different workarounds that accomplished a similar goal. The variant that my company used internally involved creating a class with a number of static getters that returned string values. For example,

```typescript
export class BillingMethod {
  static get Cash() {
    return 'cash'
  }
  static get Check() {
    return 'check'
  }
  static get CreditCard() {
    return 'credit card'
  }
}

// Usage:
const billingMethod = BillingMethod.Cash
```

This method provides most of the benefits of a traditional enum, but it misses out on the enum’s biggest advantage: providing proper type support for the data structure. Each of the above getter functions returns a string, rather than a custom type.

When TypeScript 2.4 announced [string enum support](https://blogs.msdn.microsoft.com/typescript/2017/06/27/announcing-typescript-2-4/), it was obvious that a refactor was necessary to enable proper typing throughout our application. But how were we going to replace the hundreds of exported classes with their enum counterparts?

The answer, of course, is sed. With one simple script, we can turn the original, imitation enum into a real one:

```sh
sed \
 -i \
 -e 's/class/enum/' \
 -e 's/static get //' \
 -e 's/() { return/ =/' \
 -e 's/; }/,/' \
 ./billing-method.ts
```

Outputs:

```typescript
export enum BillingMethod {
  Cash = 'cash',
  Check = 'check',
  CreditCard = 'credit card',
}
```

Apply the script over a folder of TypeScript files by changing the destination to ./constants/\*.ts and we have successfully refactored every enum in our application.

## Breaking It Down

Sed’s syntax looks impenetrable if we only pay it a quick glance. However, it only takes about fifteen minutes of experimentation to turn it into one of the most powerful refactoring tools.

Here’s a rundown of the keywords used in the above program:

- `sed`: The name of the executable program (short for stream editor).

- `\`: A line-continuation character. The above script could’ve been written all in one line —breaking it apart with a backslash provides more readability.

- `-i`: Short for “In File”. If this flag is provided, sed will replace the contents of the files it parses with your edits. By leaving this option off, we can view a “preview” of the edit before it actually affects production code.

- `-e`: Short for “Expression”, provides our edit operation. Since we want to edit the same file multiple times, we use `-e` to provide multiple edits.

- `'s/class/enum/'`: The meat of the edit, passed into the `-e` flag. Interpreted as: `'s/<replace this content>/<with this content>/'`. Note that you can specify content as plain text (as I have here), or as a regular expression.

- `./billing-method.ts`: The file we are editing. This can be also be a directory. For example, `./constants/*.ts` edits all TypeScript files within the `constants/` directory.

Now let’s look at each of the expressions:

- `‘s/class/enum/’`: Replace `class` with `enum`

- `‘s/static get //’`: Remove `static get`

- `‘s/() { return/ =/’` : Replace `() { return` with `=` (with proper spacing)

- `'s/; }/,/'` : Replace `; }` with `,`

When sed’s syntax is broken down it is both simple and expressive. Although this is a straightforward use case, it can be applied to a wide variety of code refactorings.

I hope that this tool will save you as much time as it has for me.

## Further Reading

- [GNU manual](https://www.gnu.org/software/sed/manual/sed.html)
- [Interactive sed breakdown](https://explainshell.com/explain?cmd=sed+-i+-e+%E2%80%98s%2Fclass%2Fenum%2F%E2%80%99+.%2Fbilling-method.ts)
