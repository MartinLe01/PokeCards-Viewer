const params = new URLSearchParams(window.location.search);
const cardId = params.get('id');

const pageImage = document.querySelector('#pageImage');
const cardName = document.querySelector('#cardName');
const setName = document.querySelector('#setName');
const cardLinkTCGP = document.querySelector('#cardLinkTCGP');
const cardLinkCM = document.querySelector('#cardLinkCM');

fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`)
    .then(res => res.json())
    .then(json => {
        const cardData = json.data;

        pageImage.src = cardData.images.large;
        pageImage.alt = cardData.name;

        cardName.textContent = cardData.name;
        setName.textContent = cardData.set.name;

        cardLinkTCGP.href = cardData.tcgplayer.url;
        cardLinkCM.href = cardData.cardmarket.url;
    });
