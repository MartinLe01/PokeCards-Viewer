const API_BASE_URL = "https://api.pokemontcg.io/v2/cards";
const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');
const cardsContainer = document.querySelector('#cardsContainer');

searchButton.addEventListener('click', async (e) => {
    e.preventDefault();
    let query = searchInput.value.trim();
    if(!query) return;

    const q = encodeURIComponent(`name:${query}`);
    const url = `${API_BASE_URL}?q=${q}`;

    const cardsData = await fetchCardsByName(url);
    renderCards(cardsData);
});

const fetchCardsByName = async (url) => {
    try {
        const res = await fetch(url);
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const cards = json.data;
        
        return cards;
    } catch (error) {
        console.error('Search failed', error);
        alert('Could not fetch cards. Try again later.');
    }
};

const renderCards = (cards) => {
    cardsContainer.innerHTML = '';
    cards.forEach(card => {
        if (!card.images || !card.images.small) return;
        
        const link = document.createElement('a');
        link.href = `card.html?id=${encodeURIComponent(card.id)}`;

        const image = document.createElement('img');
        image.src = card.images.small;
        image.alt = card.name;

        link.appendChild(image);
        cardsContainer.appendChild(link);
    });
};