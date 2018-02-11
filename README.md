# textlint-rule-proselint

[Proselint](https://github.com/amperser/proselint "proselint") wrapper for textlint.

## Install

Install with [npm](https://www.npmjs.com/) and [pip](https://pip.pypa.io/en/stable/installing/ "pip"):

    npm install textlint-rule-proselint
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
        "proselint": true
    }
}
```

Via CLI

```
textlint --rule proselint README.md
```


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
