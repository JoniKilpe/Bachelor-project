//importit - todnäk UI:sta ainakin jotain


//konstruktoriin parametrit

class Chatbot {
    // konstruktoriin todnäk pitää syöttää joko koko projektiolio tai ainakin
    // tietyt komponentit siitä
    constructor() { // init vs constructor??? pls send help
        //this.project = project;
        //this.contextVariables = {}; // jotain json-kikkailua tähän attribuuttiin?

        const AssistantV2 = require('ibm-watson/assistant/v2');
        const { IamAuthenticator } = require('ibm-watson/auth');
        this.contextVariables = [];

        this.assistant = new AssistantV2({
            version: '2020-09-24',
            authenticator: new IamAuthenticator({
                apikey: process.env.WATSON_ASSISTANT_APIKEY,
            }),
            url: process.env.WATSON_ASSISTANT_URL,
        });

        this.assistantId = process.env.WATSON_ASSISTANT_ID; //'7184ad88-be61-482d-90b7-e3fac855baa7'
    }

    //node sdk copypastella pääsee varmaan suhteellisen pitkälle
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

    processResponse(response) {
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
//testaus

var chatbot = new Chatbot();
var viesti = '';

chatbot.sendMessage(viesti);
