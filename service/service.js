const env = require('./.env.json')
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const { google } = require('googleapis')
const app = express()


/*                              App Declarations                            */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


/*                              Log Config                                  */
if (!fs.existsSync(env.logPath)) {
    fs.mkdir(path.join(__dirname, env.logPath), (err) => { 
        if (err.code != "EEXIST") { 
             return console.log(err)
        } 
    });
}


/*                            Log declaration                               */
const logger = require('logger').createLogger(__dirname+"/"+env.logPath+"/"+env.logFile)


/*                         Youtube API                                      */
const youtube = google.youtube({
    version: 'v3',
    auth: env.youtubeApiKey
})



/*                          Search Request                                  */
app.post('/', async (req, res) => {
    const term = req.body;
    console.log("Busca recebida: ", term.searchTerm)
    let videoList = search(term.searchTerm);
    try {
        videoList.then(function(result) {
            return res.send({ "result": result.data.items })
        })
    } catch(err) {
        return res.status(503).send({ error: "Serviço temporáriamente indisponível" })
    }

});

function search(term){
    return resultData = youtube.search.list({
        part: 'id, snippet',
        q: term,
        type: "video",
        maxResults: env.maxResults
    }).then(result => { return result } )
}

app.listen(env.port, () =>{console.log("Starting youtube search service on port "+env.port)})