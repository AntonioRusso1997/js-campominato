/* Il computer deve generare 16 numeri casuali (le nostre bombe) tra 1 e 100.
I numeri non possono essere duplicati.
In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
L’utente non può inserire più volte lo stesso numero.
Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito. */



//Dichiaro variabili
var cpuNumbers = [];
var userNumbers = [];
var userNumber;
var bombNumber = 16;
var totalNumber = 100;
var attempts = totalNumber - bombNumber; //per testare ho messo 5 tentativi, alla fine "alzerò" ad 84.
var foundNumber = false;
var score = 0;

//La CPU genera i 16 numeri casuali compresi da 1 a 100

// Creo ciclo while dove indico anche la condizione per inserire un numero solo se non è già presente nell'array.
while (cpuNumbers.length < bombNumber) {
    var randomNumber = randomNumberGenerator(1, totalNumber);
    var findNumber = findInArray(cpuNumbers, randomNumber);
    if (findNumber == false) {
        cpuNumbers.push(randomNumber);
    }
}
console.log("Numeri Bomba: " + cpuNumbers);

// Chiedo all'utente di inserire uno alla volta un numero con 84 tentativi a disposizione.

while (userNumbers.length < attempts && foundNumber == false) {
     userNumber = parseInt(prompt("Inserisci un numero da 1 a " + totalNumber));
    wrongNumber();
  
    if (findInArray(userNumbers, userNumber) == false) {
        // Se il numero non è presente viene normalmente inviato.
        userNumbers.push(userNumber);
        // Se il numero è nella lista della CPU la partite si conclude.
        if (findInArray(cpuNumbers, userNumber) == true) {
        console.log("GAME OVER!");
        foundNumber = true;
        } else {
        score+= 1;
        }
    }
  }

if (userNumbers.length == attempts) {
    console.log("Hai vinto la partita! GG!")
} else {
    console.log("Mi dispiace, hai perso!")
}
console.log("Punteggio totale: " + score);



/* ----- FUNZIONI ----- */

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

// Funzione per RIchiedere un numero corretto in caso di numero errato.
function wrongNumber () {
    while (correctNumberCheck(1, 100, userNumber) == false) {
        userNumber = parseInt(prompt("!!! NUMERO ERRATO. INSERIRE UN NUMERO DA 1 A 100 !!!"));
        console.log(userNumber);
    }
}

// Funzione per verificare che il numero sia compreso veramente da 1 a 100. (altrimenti viene chiesto di nuovo)
function correctNumberCheck(min, max, number) {
    var result = false;
    if (number >= min && number <= max) {
        result = true;
    }
    return result;
}