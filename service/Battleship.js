// doc et nom
import { envoieMissile } from "../components/grille";

export function loop(Joueur1instanceAxios, partieId1, grid1, Joueur2instanceAxios, partieId2, grid2) {
  console.log("START LOOP");
  for(let i = 0; i < 30; i++) {
    setTimeout(() => {
    console.log("ITERATION");

    LancerMissile(Joueur1instanceAxios, partieId1).then((coord) => {
      console.log(coord);
      ResultatMissile(response, Joueur1instanceAxios, partieId1, envoieMissile(grid1, coord[0],  coord.substring(2)))
        .then((response) => {
          console.log("loop2 " + response)
          LancerMissile(Joueur2instanceAxios, partieId2).then((coord) => {
            console.log(coord);
            console.log(envoieMissile(grid2, coord[0],  coord.substring(2)));
          })
          .then((response) => {
            ResultatMissile(response, Joueur2instanceAxios, partieId2)
        })
      })
    })
  }, i * 1200);
  }
}

async function LancerMissile(JoueurinstanceAxios, partie_id) {
  console.log("lance");
  const data = await JoueurinstanceAxios.post(`${partie_id}/missiles`)
  // console.log(data);
  return data.data.data.coordonnee
}

async function ResultatMissile(coordonnée, JoueurinstanceAxios, partie_id, resultat) {
  const data = await JoueurinstanceAxios.put(`${partie_id}/missiles/${coordonnée}`, { resultat: resultat})
  console.log("resultat : " + data.data.data.resultat);
  return data.data.data.coordonnee
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
