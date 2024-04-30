export default function createFooter() {
    const footer = document.createElement('footer');
    footer.className = 'footer mt-3 py-3 bg-dark text-white text-center';
    footer.innerText = "Justin Morand et Zachary Deschênes-Tremblay"

    return footer;
}