// MIT © 2018 azu
"use strict";
const execa = require("execa");
const pLimit = require("p-limit");
const IgnoreNodeManager = require("textlint-rule-helper").IgnoreNodeManager;

const limit = pLimit(1);
const report = function(context) {
    const { Syntax, RuleError, fixer, report } = context;
    const filePath = context.getFilePath();
    const ignoreNodeManager = new IgnoreNodeManager();
    return {
        [Syntax.Document](node) {
            if (!filePath) {
                return;
            }
            ignoreNodeManager.ignoreChildrenByTypes(node, [
                Syntax.CodeBlock,
                Syntax.Code,
                Syntax.Link,
                Syntax.Strong,
                Syntax.Emphasis,
                Syntax.BlockQuote,
                Syntax.Comment
            ]);
            return limit(() => {
                return execa("proselint", ["--json", filePath]).catch(error => {
                    if (error.code === "ENOENT") {
                        return report(
                            node,
                            new RuleError(`Proselint not found.

Install proselint first:

    pip install proselint

More information:

    https://github.com/textlint-rule/textlint-rule-proselint 
`)
                        );
                    }

                    if (error.code !== 1) {
                        return;
                    }
                    const json = JSON.parse(error.stdout);
                    if (json.status !== "success") {
                        return;
                    }
                    json.data.errors.forEach(lintError => {
                        const index = lintError.start - 1;
                        if (ignoreNodeManager.isIgnoredIndex(index)) {
                            return;
                        }
                        const canFixIt = typeof lintError.replacements === "string";
                        const source = lintError.source_url ? `Source: ${lintError.source_url}` : "";
                        const message = `[${lintError.check}] ${lintError.message}
${source}
`.trim();
                        if (canFixIt) {
                            report(
                                node,
                                new RuleError(message, {
                                    index: index,
                                    severity: lintError.severity,
                                    fix: fixer.replaceTextRange([index, lintError.end - 1], lintError.replacements)
                                })
                            );
                        } else {
                            report(
                                node,
                                new RuleError(message, {
                                    index: index,
                                    severity: lintError.severity
                                })
                            );
                        }
                    });
                });
            });
        }
    };
};
module.exports = {
    linter: report,
    fixer: report
};
