//importit - todnäk UI:sta ainakin jotain
require("dotenv").config();

class Chatbot {
    // konstruktoriin todnäk pitää syöttää joko koko projektiolio tai ainakin
    // tietyt komponentit siitä
    constructor() {
        const AssistantV2 = require('ibm-watson/assistant/v2');
        const { IamAuthenticator } = require('ibm-watson/auth');
        this.assistant = new AssistantV2({
            version: '2020-09-24',
            authenticator: new IamAuthenticator({
                apikey: process.env.WATSON_ASSISTANT_APIKEY,
            }),
            url: process.env.WATSON_ASSISTANT_URL,
        });
        this.assistantId = process.env.WATSON_ASSISTANT_ID;
        this.contextVariables = {
            "hyvat_arvot":true
        }
        this.sessionId = null;
    }

    //TODO: promise
    sendMessage(input) {
        this.assistant
          .messageStateless({
            assistantId: this.assistantId,
            input: {
              'message_type': 'text',
              'text': input,
            }
          })
          .then(res => {
            this.processResponse(res.result);
          })
          .catch(err => {
            console.log(err);
          });
    }

    createSession() {
        //promise auttaa flow controllissa, eli siinä että saa ohjelman
        //suorittamaan asiat oikeassa järjestyksessä ylhäältä alas
        return new Promise((resolve, reject) => {
            this.assistant.createSession({
                assistantId: this.assistantId
            })
            .then(res => {
                this.sessionId = res.result.session_id;
                console.log(res.result.session_id);
                return resolve();
                //console.log(JSON.stringify(res.result, null, 2));
            })
            .catch(err => {
                console.log(err);
                return reject();
            });
        })


    }

    //TODO: promise (onko täysin tarpeellinen?)
    deleteSession() {
        this.assistant.deleteSession({
            assistantId: this.assistantId,
            sessionId: this.sessionId
        })
        .then(res => {
            console.log("session deleted"); //debuggausta varten
        })
        .catch(err => {
            console.log(err);
        })
    }

    getSessionId() {
        return this.sessionId;
    }

    //TODO: testaa! pitäisi appendaa json-objektiin uuden avain-arvo -parin
    addContextVariable(property, value) {
        this.contextVariables[property] = value;
    }

    //TODO: promise
    processResponse(response) {
        //console.log(JSON.stringify(response, null, 2));
        if (response.output.generic) {
          if (response.output.generic.length > 0) {
            if (response.output.generic[0].response_type === 'text') {
              console.log(response.output.generic[0].text);
              }
            }
          }
    }

    //kutsutaan pelin omaa laskufunktiota
    calculateResult() {

    }
}

// testaus - tällä hetkellä luo session, printtaa session_id:n, ja deletoi session
var chatbot = new Chatbot();

//ohjelma odottaa createSessionin loppuun viemistä
//ennen deleteSessioniin jatkamista
chatbot.createSession()
    .then((result) => {
        chatbot.deleteSession();
    })
    //TODO: catch?
