// MIT © 2018 azu
"use strict";
const execa = require("execa");

const report = function(context) {
    const { Syntax, RuleError, fixer, report } = context;
    const filePath = context.getFilePath();
    return {
        [Syntax.Document](node) {
            if (!filePath) {
                return;
            }
            return execa("proselint", ["--json", filePath]).catch(error => {
                if (error.code === "ENOENT") {
                    report(
                        node,
                        new RuleError(`Proselint not found.

Install proselint first:

    pip install proselint

More information:

    https://github.com/textlint-rule/textlint-rule-proselint 
`)
                    );
                }

                const json = JSON.parse(error.stdout);
                if (json.status !== "success") {
                    return;
                }
                json.data.errors.forEach(lintError => {
                    const canFixIt = typeof lintError.replacements === "string";
                    const source = lintError.source_url ? `Source: ${lintError.source_url}` : "";
                    const message = `[${lintError.check}] ${lintError.message}
${source}
`.trim();
                    if (canFixIt) {
                        report(
                            node,
                            new RuleError(message, {
                                index: lintError.start - 1,
                                severity: lintError.severity,
                                fix: fixer.replaceTextRange(
                                    [lintError.start - 1, lintError.end - 1],
                                    lintError.replacements
                                )
                            })
                        );
                    } else {
                        report(
                            node,
                            new RuleError(message, {
                                index: lintError.start - 1,
                                severity: lintError.severity
                            })
                        );
                    }
                });
            });
        }
    };
};
module.exports = {
    linter: report,
    fixer: report
};
