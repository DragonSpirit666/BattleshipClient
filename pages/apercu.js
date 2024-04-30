import historique from '../components/historique.js';
import grille from '../components/grille.js';
import { placeTile, envoieMissile } from '../components/grille.js';
import createFooter from '../components/footer.js';
import axios from "axios";

export default function createApercu(player1, player2) {
    const page = document.createElement('div');
    page.appendChild(historique([
    "Joueur 1 à tiré en A1",
    "Joueur 2 à tiré en B2",
    "Touché en B2!",
    "Joueur 1 à tiré en A2",
    ]));
    
    const gridsContainer = document.createElement('div');
    gridsContainer.className = "d-flex flex-row justify-content-around flex-wrap"
    
    page.appendChild(gridsContainer);
    
    const grid1 = grille(player1.nom);
    const grid2 = grille(player2.nom);

    gridsContainer.appendChild(grid1);
    gridsContainer.appendChild(grid2);
    
    // Accéder à l'API
    // Joueur 1
    axios.post(player1.url, { // "http://localhost/api/battleship-ai/parties"
        adversaire: player1.nom,
    }, {
        headers: {
            Authorization: `Bearer ${player1.jeton}`  // "1|MuZU9587Z5uKFKCkdarJDnCVikQxm96CtB24GD9S331ad289"; 
    }})
    .then((response) => {
        placeBateaux(grid1, response.data.data.bateaux)
    })
    .catch((error) => console.error(error));

    // Joueur 2
    axios.post(player2.url, { 
        adversaire: player2.nom,
    }, {
        headers: {
            Authorization: `Bearer ${player2.jeton}`  
    }})
    .then((response) => {
        placeBateaux(grid2, response.data.data.bateaux)
    })
    .catch((error) => console.error(error));
    // --
    
    page.appendChild(createFooter());
    
    return page;
}

function placeBateaux(grid, bateaux) {
    Object.values(bateaux).forEach(bateau => {
        const axeHorizontal = bateau[0][0] == bateau[1][0];
        Object.values(bateau).forEach(position => {

        if (bateau[0] == position)
            placeTile(grid, position[0], position.substring(2), axeHorizontal ? "right" : "up", true) 
        else if (bateau[bateau.length - 1] == position)
            placeTile(grid, position[0], position.substring(2), axeHorizontal ? "left" : "down", true) 
        else
            placeTile(grid, position[0], position.substring(2), axeHorizontal ? "right" : "up")
        })
    })

    envoieMissile(grid, 'B', 2)
    envoieMissile(grid, 'A', 4)
    envoieMissile(grid, 'E', 5)

}