export default function createForm() {
    const form = document.createElement('form');
    const subForm1 = document.createElement('div');

    form.appendChild(subForm1);
    subForm1.appendChild(createFormGroup());

    return form;
}

function createFormGroup() {
    const formGroup = document.createElement('div');
    formGroup.className = "form-group";

    const label = document.createElement('label');
    label.innerText = "Nom du joueur";
    label.for = "nom1";

    const input = document.createElement('input');
    input.type = "text";

    formGroup.appendChild(label);
    formGroup.appendChild(input);

    return formGroup;
}