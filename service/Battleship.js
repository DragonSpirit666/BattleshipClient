export async function LancerMissile(JoueurinstanceAxios, partie_id) {
  console.log("lance");
  const data = await JoueurinstanceAxios.post(`${partie_id}/missiles`)
  // console.log(data);
  return data.data.data.coordonnee
}

export async function ResultatMissile(coordonnée, JoueurinstanceAxios, partie_id) {
  const data = await JoueurinstanceAxios.put(`${partie_id}/missiles/${coordonnée}`)
  console.log(data);
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
