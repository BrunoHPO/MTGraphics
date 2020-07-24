const axios = require('axios');
const fs = require('fs');

const getData = () => axios
    .get('/data/LGB.json')
    .then(res => res.data)
    .then(res => res.cards)
    .then(res => ({name: res.name, manaCost: res.convertedManaCost, power: res.power,
        toughness: res.toughness, types: res.types.map(x => x), colors: res.colors.map(x => x),
         uuid: res.uuid}));

    (async () => {
        const cardList = await getData();
        const cards = Promise.all(cardList);
        cards.then(result => fs.writeFileSync('../data/LGNfiltered.json', JSON.stringify(result)));
    })();