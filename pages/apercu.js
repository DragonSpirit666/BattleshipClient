import historique from '../components/historique.js';
import grille from '../components/grille.js';
import { placeTile, envoieMissile } from '../components/grille.js';
import axios from "axios";

export default function createApercu() {
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
      
      const grid1 = grille();
      const grid2 = grille();
      
      gridsContainer.appendChild(grid1);
      gridsContainer.appendChild(grid2);
      
      // --
      const authToken = "1|MuZU9587Z5uKFKCkdarJDnCVikQxm96CtB24GD9S331ad289"; 
      axios.post("http://localhost/api/battleship-ai/parties", {
        adversaire: "IA",
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      .then((response) => {
        console.log(response.data.data.bateaux)
        placeBateaux(grid2, response.data.data.bateaux)
      })
      .catch((error) => console.error(error));
      
       // --
      
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
      }
      
       // --
      
       envoieMissile(grid2, 'B', 2)
       envoieMissile(grid2, 'A', 4)

       return page;
}