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

        if (cardData.tcgplayer?.url) {
            cardLinkTCGP.href = cardData.tcgplayer.url;

            const prices = cardData.tcgplayer.prices?.holofoil;
            if (prices) {
                priceMarketTCGP.textContent = prices.market ? `$${prices.market}` : 'N/A';
                priceLowTCGP.textContent = prices.low ? `$${prices.low}` : 'N/A';
                priceHighTCGP.textContent = prices.high ? `$${prices.high}` : 'N/A';
            }
        } else {
            cardLinkTCGP.textContent = 'Nedostupné';
        }

        if (cardData.cardmarket?.url) {
            cardLinkCM.href = cardData.cardmarket.url;

            const pricesCM = cardData.cardmarket.prices;
            if (pricesCM) {
                priceAvgCM.textContent = pricesCM.averageSellPrice ? `${pricesCM.averageSellPrice} €` : 'N/A';
                priceLowCM.textContent = pricesCM.lowPrice ? `${pricesCM.lowPrice} €` : 'N/A';
                priceTrendCM.textContent = pricesCM.trendPrice ? `${pricesCM.trendPrice} €` : 'N/A';
            }
        } else {
            cardLinkCM.textContent = 'Nedostupné';
        }
    });
