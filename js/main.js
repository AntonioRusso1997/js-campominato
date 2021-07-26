/* Il computer deve generare 16 numeri casuali (le nostre bombe) tra 1 e 100.
I numeri non possono essere duplicati.
In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
L’utente non può inserire più volte lo stesso numero.
Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito. */



//Dichiaro variabili
var cpuNumber = [];

//La CPU genera i 16 numeri casuali compresi da 1 a 100

// Creo ciclo while dove indico anche la condizione per inserire un numero solo se non è già presente nell'array.
while (cpuNumber.length < 16) {
    var randomNumber = randomNumberGenerator(1, 100);
    var findNumber = findInArray(cpuNumber, randomNumber);
    if (findNumber == false) {
        cpuNumber.push(randomNumber);
    }
}

console.log(cpuNumber)

// Creo funzione per generare un numero casuale.
function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Creo funzione per inserire il numero nell'array solo se non è stato già trovato.
function findInArray(array, element) {
    var i = 0;
    var result = false;
    while (i < array.length && result == false) {
      if (array[i] == element) {
        result = true;
      }
      i++;
    }
    return result;
}