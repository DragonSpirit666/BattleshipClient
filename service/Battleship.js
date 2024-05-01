export async function LancerMissile(JoueurinstanceAxios, partie_id) {
  try {
    const data = await JoueurinstanceAxios.post(`${partie_id}/missiles`)
    console.log(data);
    return data.data.data.coordonnee
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function ResultatMissile(coordonnée, JoueurinstanceAxios, partie_id) {
  try {
    const data = await JoueurinstanceAxios.post(`${partie_id}/missiles/${coordonnée}`)
    console.log(data);
    return data.data.data.coordonnee
  } catch (error) {
    console.log(error);
  }
  return null;
}
