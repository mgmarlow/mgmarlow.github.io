---
title: Learn sed, Save Time
date: 2018-01-23
---

`sed` has one of the most understated [introductions](https://www.gnu.org/software/sed/manual/sed.html#Introduction) in the history of linux commands:

> `sed` is a stream editor. A stream editor is used to perform basic text transformations on an input stream (a file or input from a pipeline).

Factual, but criminally dull.

Don't let this description drive you away. `sed` will save you hours of repetitive work.

## What is `sed`?

`sed` is a fancy find-and-replace tool that you run from the command-line. Its flexibility far outweighs anything supported by modern editors.

The [overview examples](https://www.gnu.org/software/sed/manual/sed.html#Overview) do a good job introducing its purpose. The following command replaces all occurrences of "hello" with "world", outputting the result to a new file, `output.txt`.

```shell
sed 's/hello/world/' input.txt > output.txt
```

OK, straightforward enough. Time to jump ahead.

This snippet "matches words starting with any character, followed by the letter 'o', followed by the same character as the first" without performing replacement:

```shell
sed -E -n '/^(.)o\1$/p' /usr/share/dict/words
```

Whoa, too far.

As you can tell, there's a lot of content in [the manual](https://www.gnu.org/software/sed/manual/sed.html) to sink your teeth into. For brevity, I'll focus on an example showcasing how I used `sed` to handle a massive TypeScript refactor.

## Codemoding TypeScript

In the earlier days of TypeScript, string enums did not exist. The most common workaround used a class with static getter methods. For example:

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

Although this method supports an enum-like syntax, it lacks proper types. Each of the getter functions returns a string instead of an accurate type.

TypeScript 2.4's [string enum support](https://blogs.msdn.microsoft.com/typescript/2017/06/27/announcing-typescript-2-4/) warranted refactoring every fake enum in the application. But who wants to update the hundred-something classes?

Luckily, `sed` makes the task easy.

The following script changes imitation enums into real ones:

```shell
sed \
 -i \
 -e 's/class/enum/' \
 -e 's/static get //' \
 -e 's/() { return/ =/' \
 -e 's/; }/,/' \
  ./constants/\*.ts
```

Running it against the `BillingMethod` class outputs this enum:

```typescript
export enum BillingMethod {
  Cash = 'cash',
  Check = 'check',
  CreditCard = 'credit card',
}
```

Viola! Execute the script, refactor every enum.

## Break it down

`sed` looks impenetrable if only paid a quick glance. Au contraire, it takes just a few minutes to be dangerous.

Here’s a rundown of the keywords used in the above program:

```shell
sed \
```

No surprises here. A shell line-continuation character, `\`, adds readability to the script.

```shell
-i
```

Short for “In File”. Replaces the contents of the input file with the requested edits. Omit to view a preview of the changes.

```shell
-e 's/class/enum/' \
```

`-e` denotes an expression, after which follows a command. In this example, the `-e` flag is used multiple times to execute multiple commands.

The specific command used is the [s command](https://www.gnu.org/software/sed/manual/sed.html#The-_0022s_0022-Command), or the substitute command. The syntax reads _'s/replace this content/with this content/'_.

```shell
./constants/\*.ts
```

The file(s) to edit. The wildcard operator, `*.ts`, is used to specify every TypeScript file in the directory.

Now, onto the expressions themselves:

```shell
# Replace class with enum
's/class/enum/'

# Remove "static get "
's/static get //'

# Replace "() { return" with "="
's/() { return/ =/'

# Replace "; }" with ","
's/; }/,/'
```

## Where next?

That about exhausts my knowledge of `sed`.

For more details on the extensive capabilities of this tool, consult the [GNU manual](https://www.gnu.org/software/sed/manual/sed.html). You can also view an interactive example in [explainshell](https://explainshell.com/explain?cmd=sed+-i+-e+%E2%80%98s%2Fclass%2Fenum%2F%E2%80%99+.%2Fbilling-method.ts).
