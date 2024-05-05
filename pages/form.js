// Justin Morand et Zachary Deschênes-Tremblay
import createApercu from './apercu.js';

/**
 * Sauvegarde du formulaire.
 */
const donneeFormulaire = {}

/**
 * Crée un formulaire permettant de configurer les joueurs.
 * @param {FormData} donneeFormulaire Les données du formulaire.
 * @return {HTMLFormElement} Le formulaire de configuration des joueurs.
 */
export default function createForm() {
    const form = document.createElement('form');

    const subForm1 = document.createElement('div');
    form.appendChild(subForm1);
    subForm1.className = "card p-3 m-3";
    subForm1.appendChild(createFormGroup("Nom du joueur IA 1", "nom1", donneeFormulaire["nom1"]));
    subForm1.appendChild(createFormGroup("URL de l'API du joueur IA 1", "url1", donneeFormulaire["url1"]));
    subForm1.appendChild(createFormGroup("Jeton du joueur IA 1", "jeton1", donneeFormulaire["jeton1"]));

    const subForm2 = document.createElement('div');
    form.appendChild(subForm2);
    subForm2.className = "card p-3 m-3";
    subForm2.appendChild(createFormGroup("Nom du joueur IA 2", "nom2", donneeFormulaire["nom2"]));
    subForm2.appendChild(createFormGroup("URL de l'API du joueur IA 2", "url2", donneeFormulaire["url2"]));
    subForm2.appendChild(createFormGroup("Jeton du joueur IA 2", "jeton2", donneeFormulaire["jeton2"]));

    const button = document.createElement('button');
    button.className = "btn btn-primary m-3";
    button.innerText = "Valider";
    button.type = "submit";
    form.appendChild(button);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        document.body.innerHTML = "";
        const formData = new FormData(form);
        const player1 = {
            nom: formData.get("nom1"),
            url: formData.get("url1"),
            jeton: formData.get("jeton1")
        };
        const player2 = {
            nom: formData.get("nom2"),
            url: formData.get("url2"),
            jeton: formData.get("jeton2")
        };

        donneeFormulaire["nom1"] = player1.nom;
        donneeFormulaire["url1"] = player1.url;
        donneeFormulaire["jeton1"] = player1.jeton;
        donneeFormulaire["nom2"] = player2.nom;
        donneeFormulaire["url2"] = player2.url;
        donneeFormulaire["jeton2"] = player2.jeton;

        document.body.appendChild(createApercu(player1, player2));
    });

    return form;
}

/**
 * Crée un groupe de formulaire.
 * @param {string} nom Le nom du groupe.
 * @param {string} pour Le nom du champ de formulaire.
 * @return {HTMLDivElement} Le groupe de formulaire.
 */
function createFormGroup(nom, pour, valeurPrecedente = "") {
    const formGroup = document.createElement('div');
    formGroup.className = "form-group";

    const label = document.createElement('label');
    label.innerText = nom;
    label.for = pour;

    const input = document.createElement('input');
    input.className = "form-control mb-2";
    input.type = "text";
    input.id = pour;
    input.name = pour;
    input.value = valeurPrecedente;
    input.required = true;

    formGroup.appendChild(label);
    formGroup.appendChild(input);

    return formGroup;
}
