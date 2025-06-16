const API_BASE = 'https://rickandmortyapi.com/api/character';
const resultsDiv = document.getElementById('results');
const errorDiv = document.getElementById('error');

document.getElementById('get-all').addEventListener('click', ()=>{

    fetchCharacters(API_BASE);
});

document.getElementById('filter').addEventListener('click', () => {

    const name = document.getElementById('name').value;
    const status = document.getElementById('status').value;
    const species = document.getElementById('species').value;
    const type = document.getElementById('type').value;
    const gender = document.getElementById('gender').value;

    const url = new URL(API_BASE);
    if (name) url.searchParams.append('name', name);
    if (status) url.searchParams.append('status', status);
    if (species) url.searchParams.append('species', species);
    if (type) url.searchParams.append('type', type);
    if (gender) url.searchParams.append('gender', gender);

    fetchCharacters(url.toString());

});

function fetchCharacters(url){

    errorDiv.textContent = '';
    resultsDiv.innerHTML = '';

    fetch(url)

        .then(response => {
            if(!response.ok) throw new Error("No se encontraron personajes");
            return response.json();            
        })

        .then(data => {
            data.results.forEach(character => {

                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                                    <img src="${character.image}" alt="${character.name}">
                                    <h3>${character.name}</h3>
                                    <p>${character.status} - ${character.species}</p>
                                    <p>Género: ${character.gender}</p>
                                `;
                resultsDiv.appendChild(card);
            });
        })

        .catch(err => {
            errorDiv.textContent = `⚠️ ${err.message}`;
        })
}