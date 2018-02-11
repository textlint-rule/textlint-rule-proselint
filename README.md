# textlint-rule-proselint [![Build Status](https://travis-ci.org/textlint-rule/textlint-rule-proselint.svg?branch=master)](https://travis-ci.org/textlint-rule/textlint-rule-proselint)

[Proselint](https://github.com/amperser/proselint "proselint") wrapper for textlint.

## Install

Install with [npm](https://www.npmjs.com/) and [pip](https://pip.pypa.io/en/stable/installing/ "pip"):

    npm install @textlint-rule/textlint-rule-proselint
    pip install proselint

**Requirement**:

This rule depended on [proselint](https://github.com/amperser/proselint "proselint").
You should install `proselint`.

    pip install proselint

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "@textlint-rule/proselint": true
    }
}
```

Via CLI

```
textlint --rule @textlint-rule/proselint README.md
```

## Exception

This rule ignore errors on following nodes.

- CodeBlock
- Code
- Link
- Strong
- Emphasis
- BlockQuote
- Comment

For example, Following text is ok

```
Find `...` in a string.
```

## Limitation

[proselint](https://github.com/amperser/proselint "proselint") can not run parallel.
This rule limit concurrency.

## Changelog

See [Releases page](https://github.com/textlint-rule/textlint-rule-proselint/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/textlint-rule/textlint-rule-proselint/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu

## Related

- [sapegin/proselint: Proselint wrapper with a friendly reporter](https://github.com/sapegin/proselint "sapegin/proselint: Proselint wrapper with a friendly reporter")
