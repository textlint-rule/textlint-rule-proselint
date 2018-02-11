// MIT © 2018 azu
"use strict";
const path = require("path");
const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
const rule = require("../src/textlint-rule-proselint");
// ruleName, rule, { valid, invalid }
tester.run("proselint", rule, {
    valid: [
        {
            inputPath: path.join(__dirname, "fixtures/good/pass.md")
        }
    ],
    invalid: [
        {
            inputPath: path.join(__dirname, "fixtures/bad/butterick.md"),
            errors: [
                {
                    index: 6,
                    message: `[typography.symbols.ellipsis] '...' is an approximation, use the ellipsis symbol '…'.`
                }
            ]
        },
        {
            inputPath: path.join(__dirname, "fixtures/bad/dates_times_dates.md"),
            output: `It happened in the 1980's.\n`,
            errors: [{}]
        },
        // multiline
        {
            inputPath: path.join(__dirname, "fixtures/bad/multiline.md"),
            errors: [
                {
                    line: 1,
                    column: 7
                },
                {
                    line: 2,
                    column: 7
                },
                {
                    line: 3,
                    column: 7
                }
            ]
        }
    ]
});
