// Justin Morand et Zachary Deschênes-Tremblay
import createHistorique from '../components/historique.js';
import formPage from './form.js'
import grille from '../components/grille.js';
import { placeTile } from '../components/grille.js';
import createFooter from '../components/footer.js';
import axios from "axios";
import { loop, codeFromBateau } from '../service/Battleship.js';

export default function createApercu(player1, player2, donneeFormulaire) {
    const page = document.createElement('div');
    const historique = createHistorique();

    page.appendChild(historique);

    page.appendChild(partieGrille(player1, player2, donneeFormulaire, historique))

    const boutonRetour = document.createElement('button');
    boutonRetour.className = "btn btn-primary m-3";
    boutonRetour.textContent = "Retour au formulaire";
    boutonRetour.onclick = () => {
      page.remove();
      document.body.appendChild(formPage(donneeFormulaire));
    }

    page.appendChild(boutonRetour);

    page.appendChild(createFooter());

    return page;
}

function bateauPreview() {
  const preview = document.createElement('ul');
  // preview.className = "d-flex flex-col flex-wrap";
  return preview;
}

export function updatePreview(preview, etatBateau) {
  preview.innerHTML = "";
  console.log(etatBateau, preview);
  Object.entries(etatBateau).forEach(value => {
    const bateau = document.createElement('li');
    bateau.innerHTML = `<b>${value[0]}:</b> ${value[1]} cases restantes`;
    preview.appendChild(bateau);
  })
}

export function partieGrille(player1, player2, donneeFormulaire, historique) {
  const page = document.createElement('div');

  page.className = "partieGrille"

  const gridsContainer = document.createElement('div');
  gridsContainer.className = "d-flex flex-row justify-content-around flex-wrap"

  page.appendChild(gridsContainer);

  const grid1 = grille(player1.nom + " - " + player1.score);
  const grid2 = grille(player2.nom + " - " + player2.score);

  const previewBateaux1 = bateauPreview();
  const previewBateaux2 = bateauPreview();

  const Joueur1instanceAxios = axios.create({
    baseURL: player1.url,
    headers: { Authorization: `Bearer ${player1.jeton}` }
  });

  const Joueur2instanceAxios = axios.create({
    baseURL: player2.url,
    headers: { Authorization: `Bearer ${player2.jeton}` }
  });

  let joueur1 = {"playerConfig": {"url": player1.url, "jeton": player1.jeton, "nom": player1.nom, "score": player1.score}, "instance": Joueur1instanceAxios, "partieId":-1,
  "grid": grid1, "preview": previewBateaux1}

  let joueur2 = {"playerConfig": {"url": player2.url, "jeton": player2.jeton, "nom": player2.nom, "score": player2.score}, "instance": Joueur2instanceAxios, "partieId":-1,
  "grid": grid2, "preview": previewBateaux2}


  Joueur1instanceAxios
    .post("", {adversaire: player1.nom})
    .then((response) => {
      placeBateaux(grid1, response.data.data.bateaux)
      joueur1.partieId = response.data.data.id;

      if (joueur2.partieId != -1) loop(historique,
        joueur1,
        joueur2,
        donneeFormulaire
      );
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
      joueur2.partieId = response.data.data.id;

      if (joueur1.partieId != -1) loop(historique,
        joueur1,
        joueur2,
        donneeFormulaire
      );
    }).catch((error) => {
      console.error(error);
      const message = document.createElement('p');
      message.textContent = `Erreur lors de la récupération des données pour le joueur ${player2.nom} : ${error}`;
      page.prepend(message);
    })

    gridsContainer.appendChild(grid1);
    gridsContainer.appendChild(grid2);

    grid1.appendChild(previewBateaux1);
    grid2.appendChild(previewBateaux2);

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
