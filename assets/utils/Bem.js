/**
 * Class for working with BEM like an object.
 *
 * @link https://ru.bem.info/
 */
export default class Bem {
    /**
     * Block name storage.
     *
     * @type {string}
     */
    #blockName;

    /**
     * Block-Element separator.
     *
     * @type {string}
     */
    #elementSeparator = '__';

    /**
     * Block-Modifiers
     * or Element-Modifiers separator.
     *
     * Also used to separate
     * the name and value of a Modifier.
     *
     * @type {string}
     */
    #modsSeparator = '_';


    /**
     * Defines Bem object with passed Block name.
     *
     * @param {string} blockName
     */
    constructor(blockName) {
        if (!blockName || typeof blockName !== 'string') {
            throw new Error('Block name must be a non-empty string.');
        }

        this.#blockName = blockName;
    }

    /**
     * Returns Block name.
     * It is just magic method.
     *
     * @returns {string}
     */
    toString() {
        return this.#blockName;
    }

    /**
     * Returns class name string for Block.
     *
     * @param {Object<string, string|boolean>} mods
     *   Set of modifiers.
     *
     * @returns {string}
     *   Compiled class name line.
     */
    block(mods = {}) {
        if (!mods || !mods.constructor || mods.constructor !== window.Object) {
            throw new Error('First argument must be a plain object.');
        }

        return this.#generateClassName(this.#blockName, mods);
    }

    /**
     * Returns class name string for Element.
     *
     * @param {string} name
     *   Element name.
     *
     * @param {Object<string, string|boolean>} mods
     *   Set of modifiers.
     *
     * @returns {string}
     *   Compiled class name line.
     */
    element(name, mods = {}) {
        if (!name || typeof name !== 'string') {
            throw new Error('Element name must be a non-empty string.');
        }

        if (!mods || !mods.constructor || mods.constructor !== window.Object) {
            throw new Error('Second argument must be a plain object.');
        }

        return this.#generateClassName(
            this.#blockName + this.#elementSeparator + name,
            mods
        );
    }

    /**
     * Generates class name string
     * from name (Block or Element)
     * and set of modifiers.
     *
     * @param {string} name
     *   Block or Element name.
     *
     * @param {Object<string, string|boolean>} mods
     *   Set of modifiers.
     *
     * @returns {string}
     *   Compiled class name line.
     */
    #generateClassName(name, mods) {
        const result = [name];

        for (let modName in mods) {
            const modVal = mods[modName];

            if (!modName || !modVal) {
                continue;
            }

            if (modVal === true) {
                // it is boolean type mod
                // and it contains no value

                result.push(
                    name + this.#modsSeparator + modName
                );

                continue;
            }

            result.push(
                name + this.#modsSeparator + modName + this.#modsSeparator + modVal
            );
        }

        return result.join(' ');
    }
}
