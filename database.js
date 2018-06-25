'use strict';

const LokiJS = require('lokijs');
const sha1 = require('sha1');

const DATABASE_PATH = './data/database.json';

/**
 * @class Database
 * base class that provide an interface for lokijs database
 */
class Database {

    constructor() {
        let initResolve;
        this.initialized = new Promise(resolve => initResolve = resolve);

        // Load or create the collections
        const loadCollections = _ => {
            this._jokes = this._db.getCollection('jokes');
            if (null === this._jokes)
                this._jokes = this._db.addCollection('jokes');
            initResolve();
        }

        // Load the database
        this._db = new LokiJS(DATABASE_PATH, {
            autoload: true,
            autosave: true,
            autosaveInterval: 1000,
            autoloadCallback: loadCollections,
        });
    }


    /**
     * Add a joke to the DB
     * @param {Joke} joke
     */
    async addJoke(joke) {
        await this.initialized;

        // Check joke 🤪
        if (!joke) throw new Error("MMM something is missing.... A Joke!");
        if (!joke.text) throw new Error("No text no Party! 🎉");
        if (!joke.categories) joke.categories = [];
        if (!joke.source) joke.source = "Unknown";

        // Create hash
        joke.hash = sha1(joke.text);

        // Add length
        joke.length = joke.text.length;

        // Check if the joke already exists
        const exists = this._jokes.find({ hash: joke.hash });
        if (0 === exists.length)
            this._jokes.insert(joke);
    }


    /**
     * Return All type of joke categories 
     * @returns {String[]}     
     */
    async getAllCategories() {
        await this.initialized;
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
     * @param {String[]} [options.categories=[]]
     * @returns {Joke}
     */
    async getJoke(options = {}) {
        await this.initialized;
        const { categories = [] } = options;

        // Being lokijs an in-memory database, there is no problem in doing multiple queries
        const count = this._jokes.chain()
            .find({ 'categories': { '$contains': categories } })
            .count();
        if (0 === count)
            return null;

        const pos = Math.floor(Math.random() * count);
        const joke = this._jokes.chain()
            .find({ 'categories': { '$contains': categories } })
            .offset(pos)
            .limit(1)
            .data({ removeMeta: true });
        return joke[0];
    }


    /**
     * Returns multiple jokes
     * @param {Object} options
     * @param {String[]} [options.categories=[]]
     * @param {Number} [options.count=10]
     * @returns {Joke[]}
     */
    async getJokes(options = {}) {
        const { categories = [], count = 10 } = options;
        const jokesPromises = Array(count).fill().map(_ => this.getJoke({ categories }));
        return Promise.all(jokesPromises);
    }
}

const db = new Database();
module.exports = db;