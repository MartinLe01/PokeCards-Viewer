const API_BASE_URL = "https://api.pokemontcg.io/v2/cards";
const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');
const cardsContainer = document.querySelector('#cardsContainer');

searchButton.addEventListener('click', async (e) => {
    e.preventDefault();
    let query = searchInput.value;
    const cardsData = await fetchCardsByName(query);
    console.log(cardsData.data);
});

const fetchCardsByName = async (name) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}?q=name:${name}`
        );
        const searchData = await response.json();
        
        return searchData;
    } catch (error) {
        console.log('error');
    }
};

const renderCards = (responseData) => {
    // TODO
};