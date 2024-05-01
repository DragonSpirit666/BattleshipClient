export async function LancerMissile(JoueurinstanceAxios, partie_id) {
  console.log("lance");
  const data = await JoueurinstanceAxios.post(`${partie_id}/missiles`)
  console.log("sdvvc" + data);
  return data.data.data.coordonnee
}

export async function ResultatMissile(coordonnée, JoueurinstanceAxios, partie_id) {
  const data = await JoueurinstanceAxios.post(`${partie_id}/missiles/${coordonnée}`)
  console.log(data);
  return data.data.data.coordonnee
}
