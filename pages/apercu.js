import createHistorique from '../components/historique.js';
import grille from '../components/grille.js';
import { placeTile } from '../components/grille.js';
import createFooter from '../components/footer.js';
import axios from "axios";
import { loop, codeFromBateau } from '../service/Battleship.js';

export default function createApercu(player1, player2) {
    const page = document.createElement('div');
    const historique = createHistorique();
    page.appendChild(historique);

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

        if (partieId2 != -1) loop(historique, Joueur1instanceAxios, partieId1, grid1, Joueur2instanceAxios, partieId2, grid2);
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

        if (partieId1 != -1) loop(historique, Joueur1instanceAxios, partieId1, grid1, Joueur2instanceAxios, partieId2, grid2, historique);
      }).catch((error) => {
        console.error(error);
        const message = document.createElement('p');
        message.textContent = `Erreur lors de la récupération des données pour le joueur ${player2.nom} : ${error}`;
        page.prepend(message);
      })

    gridsContainer.appendChild(grid1);
    gridsContainer.appendChild(grid2);

    page.appendChild(createFooter());

    return page;
}

function placeBateaux(grid, bateaux) {
  Object.entries(bateaux).forEach(bateau => {
    const code = codeFromBateau(bateau[0]);
    const axeHorizontal = bateau[1][0][0] == bateau[1][1][0];
    Object.values(bateau[1]).forEach(position => {
      const lettre = position[0];
      const chiffre = position.substring(2);
      if (bateau[1][0] == position)                         // Place première extremité du bateau
          placeTile(grid, lettre, chiffre, code, axeHorizontal ? "right" : "up", true)
      else if (bateau[1][bateau[1].length - 1] == position) // Place extremité de fin du bateau
          placeTile(grid, lettre, chiffre, code, axeHorizontal ? "left" : "down", true)
      else
          placeTile(grid, lettre, chiffre, code, axeHorizontal ? "right" : "up")
    })
  })
}
