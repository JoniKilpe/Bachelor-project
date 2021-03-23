//importit - todnäk UI:sta ainakin jotain


//konstruktoriin parametrit

class Chatbot {
    // konstruktoriin todnäk pitää syöttää joko koko projektiolio tai ainakin
    // tietyt komponentit siitä
    constructor(project) { // init vs constructor??? pls send help
        this.project = project;
        this.contextVariables = {}; // jotain json-kikkailua tähän attribuuttiin?

        const AssistantV2 = require('ibm-watson/assistant/v2');
        const { IamAuthenticator } = require('ibm-watson/auth');

        this.watson = new AssistantV2({
            version: '2020-09-24',
            authenticator: new IamAuthenticator({
                apikey: '', //otetaankohan nämä .env-tiedostosta?
            }),
            url: '', //otetaankohan nämä .env-tiedostosta?
        });

        const assistantId = ''; //otetaankohan nämä .env-tiedostosta?
    }

    //Tuomon antama esimerkkifunktio. mahdollisesti toteutetaan eri tavalla
    function startChat(project, params, callback) {


        //callback();
    }

    //node sdk copypastella pääsee varmaan suhteellisen pitkälle
    function sendMessage(input) {

    }

    //kutsutaan pelin omaa laskufunktiota
    function calculateResult() {

    }
}
