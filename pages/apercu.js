import historique from '../components/historique.js';
import grille from '../components/grille.js';
import { placeTile } from '../components/grille.js';
import createFooter from '../components/footer.js';
import axios from "axios";
import { loop, codeFromBateau } from '../service/Battleship.js';

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

    Joueur1instanceAxios
      .post("", {adversaire: player1.nom})
      .then((response) => {
        placeBateaux(grid1, response.data.data.bateaux)
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
      })
      .then(() => {
        console.log("boucle");
        Joueur1instanceAxios.post(`${1}/missiles`)
        .then((response) => {
          console.log(response);
          console.log("fin");
        })
        console.log("boucle fin");
      })
      /*.catch((error) => {
        console.error(error);
        const message = document.createElement('p');
        message.textContent = `Erreur lors de la récupération des données pour le joueur ${player2.nom} : ${error}`;
        page.prepend(message);
      })*/

    loop(Joueur1instanceAxios, Joueur2instanceAxios)
    envoieMissile(grid1, 'A', 2);

    gridsContainer.appendChild(grid1);
    gridsContainer.appendChild(grid2);

    page.appendChild(createFooter());

    return page;
}

export function placeBateaux(grid, bateaux) {
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
