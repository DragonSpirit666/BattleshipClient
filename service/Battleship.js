// Justin Morand et Zachary Deschênes-Tremblay
import { envoieMissile } from "../components/grille";
import { updateHistorique } from "../components/historique";
import { partieGrille, updatePreview } from "../pages/apercu";
import createPageFin from "../pages/pageFin";

/**
 * Fonction qui gère le jeu.
 * @param {HTMLDivElement} historique L'historique de la partie.
 * @param {Object} joueur1 Les informations du joueur 1.
 * @param {Object} joueur2 Les informations du joueur 2.
 */
export function loop(historique, joueur1, joueur2, donneeFormulaire) {
  let isPause = false;

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

  // Select premier joueur aléatoirement
  if (randomBool()) {
    const temps = joueur1
    joueur1 = joueur2
    joueur2 = temps
  }

  function gameLoop() {

    pauseExecutionWhenTrue();

    LancerMissile(joueur1.instance, joueur1.partieId).then((coord) => {
      let resultat = envoieMissile(joueur2.grid, coord[0],  coord.substring(2));
      if (resultat > 1 && --etatBateau2[bateauFromCode(resultat)] > 0) resultat = 1;

      updateHistorique(historique, joueur1.nom, coord, resultat);
      updatePreview(joueur2.preview, etatBateau2);

      if (aPerdu(etatBateau2)) {
        isPause = true;
        setTimeout(() => {
          isPause = false;
        }, 2000);
        finirPartie(historique, joueur1.nom);
        if (joueur1.score >= 2) {
          document.body.innerHTML = "";
          document.body.appendChild(createPageFin(joueur1.nom, joueur2.nom, joueur1.score, joueur2.score, donneeFormulaire));
          return;
        }
        pauseExecutionWhenTrue();
        document.querySelector('.partieGrille').replaceWith(
          partieGrille(joueur1.playerConfig, joueur2.playerConfig, donneeFormulaire, historique)
        );
        return;
      }

      ResultatMissile(coord, joueur1.instance, joueur1.partieId, resultat).then(() => {
        LancerMissile(joueur2.instance, joueur2.partieId).then((coord) => {
          resultat = envoieMissile(joueur1.grid, coord[0],  coord.substring(2));
          if (resultat > 1 && --etatBateau1[bateauFromCode(resultat)] > 0) resultat = 1;
          ResultatMissile(coord, joueur2.instance, joueur2.partieId, resultat);

          updateHistorique(historique, joueur2.nom, coord, resultat);
          updatePreview(joueur1.preview, etatBateau1);

            if (aPerdu(etatBateau1)) {
              isPause = true;
              setTimeout(() => {
                isPause = false;
              }, 2000);
              finirPartie(historique, joueur2.nom);
              if (joueur2.score >= 2) {
                document.body.innerHTML = "";
                document.body.appendChild(createPageFin(joueur2.nom, joueur1.nom, joueur2.score , joueur1.score, donneeFormulaire));
                return;
              }
              pauseExecutionWhenTrue();
              document.querySelector('.partieGrille').replaceWith(
                partieGrille(joueur1.playerConfig, joueur2.playerConfig, donneeFormulaire, historique)
              );
              return;
            }

          setTimeout(() => {
            gameLoop();
          }, 700);
        })
        })
    })
  }

//-------------------------- TODO ZACH : QUAND FINI CALL createPageFin

  function pauseExecutionWhenTrue() {
    const interval = setInterval(() => {
        if (isPause) {
            clearInterval(interval);
        } else {
            console.log("Pause");
        }
    }, 1000);
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
 * Générer un booléen aléatoire.
 * @returns {boolean} Un booléen aléatoire.
 */
function randomBool() {
  return Math.random() < 0.5;
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

/**
 * Donne le code d'un bateau à partir de son nom.
 * @param {string} bateau Le nom du bateau.
 * @return {number} Le code du bateau.
 */
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

/**
 * Donne le nom d'un bateau à partir de son code.
 * @param {number} code Le code du bateau.
 * @return {string} Le nom du bateau.
 */
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
