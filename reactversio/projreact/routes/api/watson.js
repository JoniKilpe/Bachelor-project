const express = require("express");
const router = express.Router();
const AssistantV2 = require("ibm-watson/assistant/v2");
const {IamAuthenticator} = require("ibm-watson/auth");

const authenticator = new IamAuthenticator({
    apikey: process.env.WATSON_ASSISTANT_APIKEY,
});

const assistant = new AssistantV2({
    version: "2019-02-28",
    authenticator: authenticator,
    url: process.env.WATSON_ASSISTANT_URL,
});

//route to handle session tokens
//GET /api/watson/session
router.get("/session", async (req,res) => {
    try {
        const session = await assistant.createSession({
            assistantId: process.env.WATSON_ASSISTANT_ID
        })
        res.json(session["result"]);
    } catch (err) {
        res.send("There was an error processing your request.");
        console.log(err);
    }
});

//deletes session on IBM's side
//DELETE api/watson/deletesession
router.delete("/deletesession", async (req, res) => {
    try {
        const result = await assistant.deleteSession({
            assistantId: process.env.WATSON_ASSISTANT_ID,
            sessionId: req.body.sessionId,
        });
        res.json(result["statusText"]);
    } catch (err) {
        res.send("There was an error processing your request.");
        console.log(err);
    }
})

//handle messages
//POST /api/watson/message
router.post("/message", async (req,res) => {
    payload = {
        assistantId: process.env.WATSON_ASSISTANT_ID,
        input: {
            message_type: "text",
            text: req.body.input,
        },
        context: req.body.context
    };
    try {
        const message = await assistant.messageStateless(payload);
        res.json(message["result"]);
        //console.log(message);
    } catch(err) {
        res.send("There was an error processing your request.");
        console.log(err);
    }
});


//export routes
module.exports = router;
