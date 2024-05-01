import historique from '../components/historique.js';
import grille from '../components/grille.js';
import { placeTile, envoieMissile } from '../components/grille.js';
import createFooter from '../components/footer.js';
import axios from "axios";
import { LancerMissile, ResultatMissile } from '../service/Battleship.js';

export default function createApercu(player1, player2) {
    const page = document.createElement('div');
    page.appendChild(historique([
    "Joueur 1 à tiré en A1",
    "Joueur 2 à tiré en B2",
    "Touché en B2!",
    "Joueur 1 à tiré en A2",
    ]));

    const gridsContainer = document.createElement('div');
    gridsContainer.className = "d-flex flex-row justify-content-around flex-wrap"

    page.appendChild(gridsContainer);

    const grid1 = grille(player1.nom);
    const grid2 = grille(player2.nom);

    const Joueur1instanceAxios = axios.create({
      baseURL: player1.url,
      headers: { Authorization: `Bearer ${player1.jeton}` }
    });

    const Joueur2instanceAxios = axios.create({
      baseURL: player2.url,
      headers: { Authorization: `Bearer ${player2.jeton}` }
    });

    let partieId1 = -1;
    let partieId2 = -1;

    Joueur1instanceAxios
      .post("", {adversaire: player1.nom})
      .then((response) => {
        placeBateaux(grid1, response.data.data.bateaux)
        partieId1 = response.data.data.id;

        if (partieId2 != -1) loop(Joueur1instanceAxios, partieId1, Joueur2instanceAxios, partieId2);
      }).catch((error) => {
        console.error(error)
        const message = document.createElement('p');
        message.textContent = `Erreur lors de la récupération des données pour le joueur ${player1.nom} : ${error}`;
        page.prepend(message);
      })

    Joueur2instanceAxios
      .post("", {adversaire: player2.nom})
      .then((response) => {
        placeBateaux(grid2, response.data.data.bateaux)
        partieId2 = response.data.data.id;

        if (partieId1 != -1) loop(Joueur1instanceAxios, partieId1, Joueur2instanceAxios, partieId2);
        console.log("boucle");
        /*LancerMissile(Joueur1instanceAxios, partieId2)
        .then((response) => {
          console.log(response);
          console.log("fin");
        })
        console.log("boucle fin");*/
      }).catch((error) => {
        console.error(error);
        const message = document.createElement('p');
        message.textContent = `Erreur lors de la récupération des données pour le joueur ${player2.nom} : ${error}`;
        page.prepend(message);
      })

    // loop(Joueur1instanceAxios, partieId1, Joueur2instanceAxios, partieId2)
    envoieMissile(grid1, 'A', 2);

    gridsContainer.appendChild(grid1);
    gridsContainer.appendChild(grid2);

    page.appendChild(createFooter());

    return page;
}

export function placeBateaux(grid, bateaux) { // TODO why export?
  Object.values(bateaux).forEach(bateau => {
      const axeHorizontal = bateau[0][0] == bateau[1][0];
      Object.values(bateau).forEach(position => {

      if (bateau[0] == position)
          placeTile(grid, position[0], position.substring(2), axeHorizontal ? "right" : "up", true)
      else if (bateau[bateau.length - 1] == position)
          placeTile(grid, position[0], position.substring(2), axeHorizontal ? "left" : "down", true)
      else
          placeTile(grid, position[0], position.substring(2), axeHorizontal ? "right" : "up")
      })
  })
}

function loop(Joueur1instanceAxios, partieId1, Joueur2instanceAxios, partieId2) {
  console.log("START LOOP");
  for(let i = 0; i < 10; i++) {
    setTimeout(() => {
    console.log("ITERATION");
    LancerMissile(Joueur1instanceAxios, partieId1)
    .then((response) => {
      console.log("loop " + response)
        ResultatMissile(response, Joueur1instanceAxios, partieId1)
        .then((response) => {
          console.log("loop2 " + response)
          LancerMissile(Joueur2instanceAxios, partieId2)
          .then((response) => {
            ResultatMissile(response, Joueur2instanceAxios, partieId2)
        })
      })
    })
  }, i * 2000);
  }
}
