const params = new URLSearchParams(window.location.search);
const cardId = params.get('id');

const pageImage = document.querySelector('#pageImage');
const cardName = document.querySelector('#cardName');
// const setName = document.querySelector('#setName');
const setImage = document.querySelector('#setImage');
const typesElement = document.querySelector('#types');
const cardLinkTCGP = document.querySelector('#cardLinkTCGP');
const cardLinkCM = document.querySelector('#cardLinkCM');
const priceMarketTCGP = document.querySelector('#priceMarketTCGP');
const priceLowTCGP = document.querySelector('#priceLowTCGP');
const priceHighTCGP = document.querySelector('#priceHighTCGP');
const priceAvgCM = document.querySelector('#priceAvgCM');
const priceLowCM = document.querySelector('#priceLowCM');
const priceTrendCM = document.querySelector('#priceTrendCM');


fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`)
    .then(res => res.json())
    .then(json => {
        const cardData = json.data;

        pageImage.src = cardData.images.large;
        pageImage.alt = cardData.name;

        cardName.textContent = cardData.name;
        // setName.textContent = cardData.set.name;
        setImage.src = cardData.set.images.logo;

        typesElement.textContent = cardData.types;

        cardLinkTCGP.href = cardData.tcgplayer.url;
        cardLinkCM.href = cardData.cardmarket.url;

        priceMarketTCGP.textContent = `$${cardData.tcgplayer.prices.holofoil.market}`;
        priceLowTCGP.textContent = `$${cardData.tcgplayer.prices.holofoil.low}`;
        priceHighTCGP.textContent = `$${cardData.tcgplayer.prices.holofoil.high}`;

        priceAvgCM.textContent = `${cardData.cardmarket.prices.averageSellPrice} €`;
        priceLowCM.textContent = `${cardData.cardmarket.prices.lowPrice} €`;
        priceTrendCM.textContent = `${cardData.cardmarket.prices.trendPrice} €`;
    });
