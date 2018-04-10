'use strict';

const postcss = require('postcss');
const selectorParser = require('postcss-selector-parser');

const {iePseudo, ...constants} = require('./constants');

module.exports = postcss.plugin('postcss-ie11-pseudo-class', ({
    ieSelector = constants.ieSelector,
} = {}) => root => {
    root.walkRules(new RegExp(iePseudo), rule => {
        selectorParser(selector => {
            const rIePseudoStart = new RegExp(`^\\s*${ iePseudo }`);
            const ie11Nodes = selector.nodes
                .filter(node => rIePseudoStart.test(node.toString()));
            const regularNodes = selector.nodes
                .filter(node => !rIePseudoStart.test(node.toString()));

            // Remove all the :ie11 pseudos, we'll replace them with one ieSelector.
            for (const node of ie11Nodes) {
                node.walkPseudos(pseudo => {
                    if (pseudo.value !== iePseudo) {
                        return;
                    }
                    pseudo.remove();
                });
            }

            // Insert a cloned rule with IE 11 selectors if any present.
            if (ie11Nodes.length > 0) {
                const ieContainer = selectorParser.root().append([
                    selectorParser.string({value: ieSelector}),
                    ...ie11Nodes,
                ]);

                const ieRule = rule.clone({selector: ieContainer});
                rule.after(ieRule);
            }

            // Remove IE selectors from the regular rule; remove the rule if nothing left.
            if (regularNodes.length > 0) {
                const regularContainer = selectorParser.root().append(regularNodes);
                rule.selector = regularContainer;
            } else {
                rule.remove();
            }
        })
            .processSync(rule.selector);
    });
});
