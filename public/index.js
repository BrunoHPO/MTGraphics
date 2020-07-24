//Eg Graph

const labelsByColor = [
    'White',
    'Blue',
    'Green',
    'Red',
    'Black',
    'Uncolored'
]

const backgroundColorPolar = [
    "#F8E7B9",
    "#B3CEEA",
    "#C4D3CE",
    "#EB9F82",
    "#A69F9D",
    "#ff00ff"
]

const labelsByCreature = [
    'Creatures',
    'Others - NOT Creatures'
]

const backgroundColorPie = [
    "#ff4321",
    "#4321FF"
]

//For Real

const responseToJson = response => response.json();

const maps = fn =>  arr => arr.map(fn);
const trace = x => { console.log(x); return x; }
const filters = fn => arr => arr.filter(fn);

//const aggregate = (key, fn) => arr => ({ data : arr, [key] : arr.filter(fn) });
const toDataObject = arr => ({ data: arr });
const aggregate = (key, fn) => obj => ({ ...obj, [key]: obj.data.filter(fn) });

const byWhite = item => item.color[0] === "W";
const aggregateByWhite = aggregate('whiteCards', byWhite);
const byBlue = item => item.color[0] === "U";
const aggregateByBlue = aggregate('blueCards', byBlue);
const byGreen = item => item.color[0] === "G";
const aggregateByGreen = aggregate('greenCards', byGreen);
const byRed = item => item.color[0] === "R";
const aggregateByRed = aggregate('redCards', byRed);
const byBlack = item => item.color[0] === "B";
const aggregateByBlack = aggregate('blackCards', byBlack);
const byUncolored = item => item.color[0] === undefined;
const aggregateByUn = aggregate('unCards', byUncolored);

const byCreature = item => item.type[0] === "Creature";
const aggregateByCreature = aggregate('cretureCards', byCreature);
const byNotCreature = item => item.type[0] !== "Creature";
const aggregateByNotCreature = aggregate('notCreatureCards', byNotCreature);

//Chart Drawing
const drawPolarChart = canvasElement => data => new Chart(canvasElement, { data, type: 'polarArea' });
const drawPieChart = canvasElement => data => new Chart(canvasElement, { data, type: 'doughnut' });

const generateDataPolar = dados => {
    const data = {
      datasets: [{
        data: dados,
        backgroundColor: backgroundColorPolar
      }],
      labels: labelsByColor
    };
  
    return data;
}

const generateDataPie = dados => {
    const data = {
      datasets: [{
        data: dados,
        backgroundColor: backgroundColorPie
      }],
      labels: labelsByCreature
    };
  
    return data;
}

//Infestida
const ONSbyColor = document.getElementById('ONSGraph');
const ONSbyCreature = document.getElementById('ONSGraphCreature');

//Legiao
const LGNbyColor = document.getElementById('LGNGraph');
const LGNbyCreature = document.getElementById('LGNGraphCreature');

//Fragelo
const SCGbyColor = document.getElementById('SCGGraph');
const SCGbyCreature = document.getElementById('SCGGraphCreature');

  (() => {
    fetch('/api/investida')
      .then(responseToJson)      
      .then(toDataObject)
      .then(aggregateByWhite)
      .then(aggregateByBlue)
      .then(aggregateByGreen)
      .then(aggregateByRed)
      .then(aggregateByBlack)
      .then(aggregateByUn)
      .then(aggregatedData => {
        const { whiteCards, blueCards, greenCards, redCards, blackCards, unCards } = aggregatedData;
        return generateDataPolar([whiteCards.length, blueCards.length, greenCards.length, redCards.length, blackCards.length, unCards.length])
      })
      .then(drawPolarChart(ONSbyColor));

    fetch('/api/investida')
      .then(responseToJson)      
      .then(toDataObject)
      .then(aggregateByCreature)
      .then(aggregateByNotCreature)
      .then(aggregatedData => {
        const { cretureCards, notCreatureCards } = aggregatedData;
        return generateDataPie([cretureCards.length, notCreatureCards.length])
      })
      .then(drawPieChart(ONSbyCreature));
    
    fetch('/api/legiao')
      .then(responseToJson)      
      .then(toDataObject)
      .then(aggregateByWhite)
      .then(aggregateByBlue)
      .then(aggregateByGreen)
      .then(aggregateByRed)
      .then(aggregateByBlack)
      .then(aggregateByUn)
      .then(aggregatedData => {
        const { whiteCards, blueCards, greenCards, redCards, blackCards, unCards } = aggregatedData;
        return generateDataPolar([whiteCards.length, blueCards.length, greenCards.length, redCards.length, blackCards.length, unCards.length])
      })
      .then(drawPolarChart(LGNbyColor));
    
    fetch('/api/legiao')
      .then(responseToJson)      
      .then(toDataObject)
      .then(aggregateByCreature)
      .then(aggregateByNotCreature)
      .then(aggregatedData => {
        const { cretureCards, notCreatureCards } = aggregatedData;
        return generateDataPie([cretureCards.length, notCreatureCards.length])
      })
      .then(drawPieChart(LGNbyCreature));
    
    fetch('/api/fragelo')
      .then(responseToJson)      
      .then(toDataObject)
      .then(aggregateByWhite)
      .then(aggregateByBlue)
      .then(aggregateByGreen)
      .then(aggregateByRed)
      .then(aggregateByBlack)
      .then(aggregateByUn)
      .then(aggregatedData => {
        const { whiteCards, blueCards, greenCards, redCards, blackCards, unCards } = aggregatedData;
        return generateDataPolar([whiteCards.length, blueCards.length, greenCards.length, redCards.length, blackCards.length, unCards.length])
      })
      .then(drawPolarChart(SCGbyColor));

    fetch('/api/fragelo')
      .then(responseToJson)      
      .then(toDataObject)
      .then(aggregateByCreature)
      .then(aggregateByNotCreature)
      .then(aggregatedData => {
        const { cretureCards, notCreatureCards } = aggregatedData;
        return generateDataPie([cretureCards.length, notCreatureCards.length])
      })
      .then(drawPieChart(SCGbyCreature));

  })();