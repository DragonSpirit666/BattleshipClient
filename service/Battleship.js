// doc et nom
import { envoieMissile } from "../components/grille";
import { updateHistorique } from "../components/historique";

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

      if (aPerdu(etatBateau2)) finirPartie(historique, nomJoueur1);

      ResultatMissile(coord, Joueur2instance, partieId1, resultat)
        .then(() => {
          LancerMissile(Joueur2instance, partieId2).then((coord) => {
            resultat = envoieMissile(grid1, coord[0],  coord.substring(2));
            if (resultat > 1 && --etatBateau1[bateauFromCode(resultat)] > 0) resultat = 1;
            ResultatMissile(coord, Joueur1instance, partieId2, resultat);
            updateHistorique(historique, nomJoueur2, coord, resultat);

            if (aPerdu(etatBateau2)) finirPartie(historique, nomJoueur2);

            setTimeout(() => {
              gameLoop();
            }, 1000);
        })
      })
    })
  }

  gameLoop();
}

function aPerdu(etatBateau) {
  let isEnd = true;
  Object.values(etatBateau).forEach(value => {
    console.log(value)
    if (value > 0) { isEnd = false; return; }
  })

  return isEnd;
}

function finirPartie(historique, joueur) {
  updateHistorique(historique, joueur, "", 200);
}

async function LancerMissile(JoueurinstanceAxios, partie_id) {
  const data = await JoueurinstanceAxios.post(`${partie_id}/missiles`)
  return data.data.data.coordonnee
}

async function ResultatMissile(coordonnée, JoueurinstanceAxios, partie_id, resultat) {
  console.log(resultat, partie_id, coordonnée)
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
