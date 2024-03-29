/* Il computer deve generare 16 numeri casuali (le nostre bombe) tra 1 e 100.
I numeri non possono essere duplicati.
In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
L’utente non può inserire più volte lo stesso numero.
Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito. */



//Dichiaro variabili
var startBtn = document.getElementById("start");
var cpuNumbers = [];
var userNumbers = [];
var userNumber;
var bombNumber = 16;
var totalNumber = 0;
var attempts; //per testare ho messo 5 tentativi, alla fine "alzerò" ad 84.
var foundNumber = false;
var score = 0;


// Chiedo all'utente di scegliere la difficoltà di gioco.
startBtn.addEventListener("click", 
    function() {
        var difficulty = document.getElementById("difficolta").value;

        //Creo switch per la difficoltà
        switch (difficulty) {

            case "normal":
                totalNumber = 80;
                attempts = totalNumber - bombNumber;
                break;
            
            case "hard":
                totalNumber = 50;
                attempts = totalNumber - bombNumber;
                break;

            default:
                totalNumber = 100;
                attempts = totalNumber - bombNumber;
        }

        createGrid(totalNumber);
        
        //La CPU genera i 16 numeri casuali       
              
        // Creo ciclo while dove indico anche la condizione per inserire un numero solo se non è già presente nell'array.
        while (cpuNumbers.length < bombNumber) {
            var randomNumber = randomNumberGenerator(1, totalNumber);
            var findNumber = findInArray(cpuNumbers, randomNumber);
            if (findNumber == false) {
                cpuNumbers.push(randomNumber);
            }
        }
        
        console.log("Numeri Bomba: " + cpuNumbers);
        
        document.getElementById("field").addEventListener("click", 
        function(e) {
            console.log(e.target.dataset.cell);
            let element = document.querySelectorAll(
              "[data-cell='" + e.target.dataset.cell + "']"
            );
          
            if (cpuNumbers.includes(parseInt(e.target.dataset.cell))) {
              element[0].classList.add("red");
              alert("Boom! mi dispiace");
              alert("Punteggio totale: " + score);
              location.reload();
            } else if (userNumbers.indexOf(e.target.dataset.cell) == -1) {
              element[0].classList.add("green");
              userNumbers.push(e.target.dataset.cell);
              score++;
            }
          });
        
        // // Chiedo all'utente di inserire uno alla volta un numero con 84 tentativi a disposizione.
        
        // while (userNumbers.length < attempts && foundNumber == false) {
        //     userNumber = parseInt(prompt("Inserisci un numero da 1 a " + totalNumber));
        //     wrongNumber();
            
        //     if (findInArray(userNumbers, userNumber) == false) {
        //         // Se il numero non è presente viene normalmente inviato.
        //         userNumbers.push(userNumber);
        //         // Se il numero è nella lista della CPU la partite si conclude.
        //         if (findInArray(cpuNumbers, userNumber) == true) {
        //             console.log("GAME OVER!");
        //             foundNumber = true;
        //         } else {
        //             score+= 1;
        //         }
        //     }
        // }
        
        // if (userNumbers.length == attempts) {
        //     console.log("Hai vinto la partita! GG!")
        // } else {
        //     console.log("Mi dispiace, hai perso!")
        // }
        // console.log("Punteggio totale: " + score);       
        
        
    }
)

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
    while (correctNumberCheck(1, totalNumber, userNumber) == false) {
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

// Funzione per creare la "griglia" del campo minato
function createGrid(cells) {
    

    for (let i = 1; i <= cells; i++) {

        let cell = `
        <div data-cell="${i}" class="cell">${i}</div>
        `;
        
        let cellTemplate = document.createElement('DIV');
        cellTemplate.classList.add("square");
        cellTemplate.innerHTML = cell;
        document.getElementById("field").appendChild(cellTemplate);
    }
}