'use strict';

const request = require('request-promise-native');
const cheerio = require('cheerio');

class FuoriDiTesta {
    constructor() {

    }

    static get BASE_URL() {
        return "http://www.fuoriditesta.it/barzellette/";
    }

    static get _CATEGORIES() {
        return {
            "AFORISMI": {
                page: "aforismi.html",
                pages: 317
            },
            "ANIMALI": {
                page: "animali.html",
                pages: 23
            },
            "CALCIO": {
                page: "calcio.html",
                pages: 20
            },
            "CARABINIERI": {
                page: "carabinieri.html",
                pages: 164
            },
            "COLMI_E_FREDDURE": {
                page: "colmi-e-freddure.html",
                pages: 209
            },
            "DAL_DOTTORE": {
                page: "dal-dottore.html",
                pages: 66
            },
            "DONNE": {
                page: "donne.html",
                pages: 27
            },
            "INDOVINELLI": {
                page: "indovinelli.html",
                pages: 27
            },
            "POLITICA": {
                page: "politica.html",
                pages: 27
            },
            "PROFESSIONI": {
                page: "professioni.html",
                pages: 18
            },
            "RELIGIONE": {
                page: "religione.html",
                pages: 42
            },
            "SCUOLA": {
                page: "scuola.html",
                pages: 59
            },
            "TECNOLOGIA": {
                page: "tecnologia.html",
                pages: 35
            },
            "UOMINI": {
                page: "uomini.html",
                pages: 16
            },
            "VARIE": {
                page: "varie.html",
                pages: 37
            }

        }

    }

    getJokes(category) {
        if (false === (category in this.categories))
            throw new Error(`Invalid category "${category}"`);

        debugger;
    }

}
module.exports = FuoriDiTesta;