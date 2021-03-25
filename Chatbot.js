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

        this.assistant = new AssistantV2({
            version: '2020-09-24',
            authenticator: new IamAuthenticator({
                apikey: 'o3x3yQtjonJlDk_68JVqI7xrRwYZHKZdcpxyfTwTP0oZ', //otetaankohan nämä .env-tiedostosta?
            }),
            url: 'https://api.eu-de.assistant.watson.cloud.ibm.com/instances/1b317c60-a115-4aa5-bffa-87bb218044d0', //otetaankohan nämä .env-tiedostosta?
        });

        this.assistantId = '7184ad88-be61-482d-90b7-e3fac855baa7'; //otetaankohan nämä .env-tiedostosta?
    }

    //Tuomon antama esimerkkifunktio. mahdollisesti toteutetaan eri tavalla
    startChat(project, params, callback) {

        //callback();
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
