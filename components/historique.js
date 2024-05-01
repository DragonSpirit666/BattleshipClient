export default function createHistorique(mouvements) {
    const historiqueDiv = document.createElement('div');
    historiqueDiv.classList.add('p-4');

    const title = document.createElement('h2');
    title.textContent = 'Historique des mouvements';
    title.classList.add('text-xl', 'font-bold', 'mb-4');

    const list = document.createElement('ul');
    list.classList.add('list-group');

    mouvements.forEach((mouvement, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = mouvement;
        listItem.setAttribute('key', index.toString());
        list.appendChild(listItem);
    });

    historiqueDiv.appendChild(title);
    historiqueDiv.appendChild(list);

    return historiqueDiv;
}

export function updateHistorique(historiqueDiv, update) {
    const list = historiqueDiv.querySelector('ul');
    list.innerHTML = '';

    mouvements.forEach((mouvement, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = mouvement;
        listItem.setAttribute('key', index.toString());
        list.appendChild(listItem);
    });
}
