import './styles.css';
import historique from './components/historique.js';
import grille from './components/grille.js';
import {colorHorizontalLine, colorVerticalLine, placeX} from './components/grille.js';
import formPage from './components/form.js'

/*Vous devez créer une page web HTML, CSS et JavaScript pour simuler des parties de Battleship. Vous 
pouvez utiliser les bibliothèques et les plateformes de votre choix. Assurez-vous d’indiquer clairement les 
étapes d’installation ou d’exécution de votre projet dans un README.*/

document.body.appendChild(formPage());

document.body.appendChild(historique([
  "Joueur 1 à tiré en A1",
  "Joueur 2 à tiré en B2",
  "Touché en B2!",
  "Joueur 1 à tiré en A2",
]));

const gridsContainer = document.createElement('div');
gridsContainer.className = "d-flex flex-row justify-content-around flex-wrap"

document.body.appendChild(gridsContainer);

const grid1 = grille();
const grid2 = grille();

gridsContainer.appendChild(grid1);
gridsContainer.appendChild(grid2);

// --
import axios from "axios";
const authToken = "1|MuZU9587Z5uKFKCkdarJDnCVikQxm96CtB24GD9S331ad289"; 
axios.post("http://localhost/api/battleship-ai/parties", {
  adversaire: "IA",
}, {
  headers: {
    Authorization: `Bearer ${authToken}`
  }
})
.then((response) => {
  console.log(response.data.data.bateaux)
  placeBateaux(grid2, response.data.data.bateaux)
})
.catch((error) => console.error(error));

 // --

 function placeBateaux(grid, bateaux) {
  Object.values(bateaux).forEach(bateau => {
    Object.values(bateau).forEach(position => {
      console.log(position[0])
      console.log(position.substring(2))
      placeX(grid, position[0], position.substring(2))
    })
  })
}

 // --

colorHorizontalLine(grid1, 1, 2, 5)
colorVerticalLine(grid1, 1, 2, 5)
placeX(grid1, 'B', 2)
placeX(grid1, 'A', 4)

/**
À l’arrivée sur la page, on devra pouvoir saisir les informations suivantes :
• Nom du joueur IA 1
• URL de l’API du joueur IA 1
• Jeton du joueur IA 1
• Nom du joueur IA 2
• URL de l’API du joueur IA 2
• Jeton du joueur IA 2
 */
// On devra ensuite peser sur un bouton pour démarrer la simulation. 
// Le jeu doit s’effectuer à une vitesse raisonnable afin de pouvoir voir chaque coup.
// Vous devez faire afficher l’historique des coups joués dans une section prévue à cet effet.


/*
À côté de vos grilles, vous devez présenter les bateaux de chaque joueur ainsi que leur état.
La simulation s’arrête dès qu’un joueur gagne 2 parties. Le jeu doit tomber en pause entre chaque 
partie.
Lorsque la partie est terminée, indiquez clairement le nom du gagnant et le nombre de victoires pour 
chaque joueur (victoires de cette simulation). Finalement, donnez la possibilité de retourner au 
formulaire d’accueil. Les champs doivent être préremplis afin de pouvoir démarrer une nouvelle partie 
rapidement.
Vous devez également ajouter un bouton pour arrêter une simulation en cours et retourner au 
formulaire d’accueil à tout moment.
*/


/*-------------------------/
let xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "http://localhost/api/timeentries");
xhr.setRequestHeader("Accept", "application/json");

xhr.send();   */

/*
let myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

let requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch("http://localhost/api/timeentries", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    result.data.forEach((element) => {
    console.log(element);
    });
  })
  .catch((error) => console.log("error", error));   */
/*
axios
  .post("http://localhost/api/timeentries", {
    nom_tache: "Tâche client",
    date_debut: "2024-04-03",
    date_fin: "2024-04-04",
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
*/
/*  .get("http://localhost/api/timeentries")
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
*/
/*
const form = document.getElementById("search");
const formFields = document.getElementById("search_fields");
const result = document.getElementById("result");
  
form.addEventListener("submit", (event) => {
  event.preventDefault();
  
// TODO Validation
  
const id = document.getElementById("tache_id").value;
  
formFields.disabled = true;
result.innerHTML = "...";
  
axios
  .get("http://localhost/api/timeentries/" + id)
  .then((response) => {
    result.innerHTML = response?.data?.data?.nom_tache;
  })
  .catch((error) => {
    result.innerHTML = error?.response?.data?.message;
  })
  .then(() => {
    formFields.disabled = false;
  });
});*/