const express = require('express');
const fs = require('fs');
const simplifyData = require('./filter');

const app = express();

app.use(express.static('public'));

const inCaseofError = error => { 
    error.statusCode = 500;
    return error.end('houve um erro inesperado...');
};

const simpleData = data => {
    data.statusCode = 200;
    const content = JSON.parse(data);
    const cards = content.data.cards;
    const simpleCards = cards.map(simplifyData);
    const stringCards = JSON.stringify(simpleCards);
    return stringCards;
};

app.get('/api/legiao', (_, res) => {
    fs.readFile('data/LGN.json', (err, data) =>{
        if(err){
            inCaseofError(err);
        }
        else{
            const finalData = simpleData(data);
            return res.end(finalData);
        }
    })
});

app.get('/api/investida', (_, res) => {
    fs.readFile('data/ONS.json', (err, data) =>{
        if(err){
            inCaseofError(err);
        }
        else{
            const finalData = simpleData(data);
            return res.end(finalData);
        }
    })
});

app.get('/api/fragelo', (_, res) => {
    fs.readFile('data/SCG.json', (err, data) =>{
        if(err){
            inCaseofError(err);
        }
        else{
            const finalData = simpleData(data);
            return res.end(finalData);
        }
    })
});

app.listen('8080', () => console.info('listening on http://localhost:8080'));