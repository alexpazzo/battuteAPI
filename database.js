'use strict';

const LokiJS = require('lokijs');

//const DATABASE_PATH = './data/database.json';
const DATABASE_PATH = 'database.json';

/**
* @class Database
* base class that provide an interface for lokijs database
*/
class Database {
    constructor() {
        this._db = new LokiJS(DATABASE_PATH, {
            autoload: true,
            autosave: true,
            autosaveInterval: 5000
        });
        this._jokes = this._db.addCollection('jokes');
    }

    /**
     * Add a joke to the DB
     * @param {Joke} joke
     */
    addJoke(joke) {
        if (!joke) throw new Error("MMM something is missing.... A Joke!");
        if (!joke.text) throw new Error("No text no Party! 🎉");
        if (!joke.categories) joke.categories = [];
        if (!joke.source) joke.source = "Unknown";

        this._jokes.insert(joke);
    }
    /**
     * Return All type of joke categories 
     * @returns {String[]}     
     */
    getAllCategories() {
        return this._jokes.mapReduce(
            (obj) => obj.categories,
            (mappedCategories) => {
                const categories = new Set();
                for (const mapped of mappedCategories)
                    mapped.forEach(c => categories.add(c));
                return Array.from(categories);
            }
        );
    }

    /**
     * Returns one Joke, if no options are specified, it returns one joke at random
     * @param {Object} options
     * @param {String} [options.categories='']
     * @param {Number} [options.count=1]
     * @returns {Joke}
     */
    getJoke(options = {}) {
        const { categories, count = 1 } = options;
        const values = [];
        const jokes = this._jokes.find({ 'categories': { '$contains': categories } });

        if (false === Array.isArray(jokes) || jokes.length === 0) return [];
        for (let i = 0; i < count; i++) {
            const pos = Math.floor(Math.random() * jokes.length)
            const joke = jokes.splice(pos, 1);
            values.push(joke);
        }
        return values;
    }
}

module.exports = Database;