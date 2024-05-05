// Justin Morand et Zachary Deschênes-Tremblay
import { envoieMissile } from "../components/grille";
import { updateHistorique } from "../components/historique";

/**
 * Fonction qui gère le déroulement d'une partie de battleship.
 * @param {HTMLDivElement} historique L'historique de la partie.
 * @param {*} nomJoueur1
 * @param {*} Joueur1instance
 * @param {*} partieId1
 * @param {*} grid1
 * @param {*} nomJoueur2
 * @param {*} Joueur2instance
 * @param {*} partieId2
 * @param {*} grid2
 */
export function loop(historique, nomJoueur1, Joueur1instance, partieId1, grid1, nomJoueur2, Joueur2instance, partieId2, grid2) {
  const etatBateau1 = {
    "porte-avions": 5,
    "cuirasse": 4,
    "destroyer": 3,
    "sous-marin": 3,
    "patrouilleur": 2
  }

  const etatBateau2 = {
    "porte-avions": 5,
    "cuirasse": 4,
    "destroyer": 3,
    "sous-marin": 3,
    "patrouilleur": 2
  }

  function gameLoop() {
    LancerMissile(Joueur1instance, partieId1).then((coord) => {
      let resultat = envoieMissile(grid2, coord[0],  coord.substring(2));
      if (resultat > 1 && --etatBateau2[bateauFromCode(resultat)] > 0) resultat = 1;

      updateHistorique(historique, nomJoueur1, coord, resultat);

      if (aPerdu(etatBateau2)) {
        finirPartie(historique, nomJoueur1);
        return;
      }

      ResultatMissile(coord, Joueur2instance, partieId1, resultat).then(() => {
          LancerMissile(Joueur2instance, partieId2).then((coord) => {
            resultat = envoieMissile(grid1, coord[0],  coord.substring(2));
            if (resultat > 1 && --etatBateau1[bateauFromCode(resultat)] > 0) resultat = 1;
            ResultatMissile(coord, Joueur1instance, partieId2, resultat);

            updateHistorique(historique, nomJoueur2, coord, resultat);

            if (aPerdu(etatBateau1)) {
              finirPartie(historique, nomJoueur2);
              return;
            }

            setTimeout(() => {
              gameLoop();
            }, 700);
          })
        })
    })
  }

  gameLoop();
}

/**
 * Fonction qui vérifie si un joueur a perdu.
 * @param {Object} etatBateau L'état des bateaux.
 * @return {Boolean} Si le joueur a perdu.
 */
function aPerdu(etatBateau) {
  let isEnd = true;
  Object.values(etatBateau).forEach(value => {
    if (value > 0) { isEnd = false; return; }
  })

  return isEnd;
}

/**
 * Envoyer message de fin de partie.
 * @param {HTMLDivElement} historique L'historique de la partie.
 * @param {string} joueur Le nom du joueur.
 */
function finirPartie(historique, joueur) {
  updateHistorique(historique, joueur, "", 200);
}

/**
 * Envoyer un missile.
 * @param {AxiosStatic} JoueurinstanceAxios L'instance Axios du joueur.
 * @param {number} partie_id L'id de la partie.
 * @return {string} La coordonnée du missile.
 */
async function LancerMissile(JoueurinstanceAxios, partie_id) {
  const data = await JoueurinstanceAxios.post(`${partie_id}/missiles`)
  return data.data.data.coordonnee
}

/**
 * Envoie le résultat d'un missile à l'api.
 * @param {string} coordonnée La coordonnée du missile.
 * @param {AxiosStatic} JoueurinstanceAxios L'instance Axios du joueur.
 * @param {number} partie_id L'id de la partie.
 * @param {number} resultat Le résultat du missile.
 */
async function ResultatMissile(coordonnée, JoueurinstanceAxios, partie_id, resultat) {
  await JoueurinstanceAxios.put(`${partie_id}/missiles/${coordonnée}`, { resultat: resultat})
}

export function codeFromBateau(bateau) {
  switch (bateau) {
    case "porte-avions":
      return 2;
    case "cuirasse":
      return 3;
    case "destroyer":
      return 4;
    case "sous-marin":
      return 5;
    case "patrouilleur":
      return 6;
  }
}

export function bateauFromCode(code) {
  switch (+ code) {
    case 2:
      return "porte-avions";
    case 3:
      return "cuirasse";
    case 4:
      return "destroyer";
    case 5:
      return "sous-marin";
    case 6:
      return "patrouilleur";
  }
}
