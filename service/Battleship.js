// doc et nom
import { envoieMissile } from "../components/grille";
import { updateHistorique } from "../components/historique";

export function loop(historique, Joueur1instanceAxios, partieId1, grid1, Joueur2instanceAxios, partieId2, grid2) {
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

  for(let i = 0; i < 4000; i++) {
    setTimeout(() => {    // todo SATTAQUE SOI MEME??
      LancerMissile(Joueur1instanceAxios, partieId1).then((coord) => {
        let resultat = envoieMissile(grid1, coord[0],  coord.substring(2));
        if (resultat > 1 && --etatBateau1[bateauFromCode(resultat)] > 0) resultat = 1;
        updateHistorique(historique, "Joueur 1", coord, resultat);

        if (aPerdu(etatBateau1)) finirPartie(historique, "Joueur 1");

        ResultatMissile(coord, Joueur1instanceAxios, partieId1, resultat)
          .then(() => {
            LancerMissile(Joueur2instanceAxios, partieId2).then((coord) => {
              resultat = envoieMissile(grid2, coord[0],  coord.substring(2));
              if (resultat > 1 && --etatBateau2[bateauFromCode(resultat)] > 0) resultat = 1;
              ResultatMissile(coord, Joueur2instanceAxios, partieId2, resultat);
              updateHistorique(historique, "Joueur 2", coord, resultat);

              if (aPerdu(etatBateau2)) finirPartie(historique, "Joueur 2");
          })
        })
      })
    }, i * 1200);
  }
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
