console.clear();



async function getDeck() {
    const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
    const data = await fetch(url).then(resp => resp.json());
    return data;
}

async function getCard(deck) {
    const url = 'https://deckofcardsapi.com/api/deck/' + deck.deck_id + '/draw/?count=1';
    const data = await fetch(url).then(resp => resp.json());
    return data;
}

function eventHandler(img, outOfCards) {
    const deck = getDeck();
    return async (evt) => {
        const data = await deck.then(getCard);
        if (data.remaining === 0) {
            outOfCards.style.display = 'block';
            evt.target.remove();
            return;
        }
        img.src = data.cards[0].image;
    };
}


async function main() {
    // part 2 step 1
    let deck = await getDeck();
    let {cards} = await getCard(deck);
    console.log('Part 2 Step 2\n', cards[0].value, 'of', cards[0].suit);


    // part 2 step 2
    deck = await getDeck();
    cards = [];
    
    let { cards : card1 } = await getCard(deck);
    card1 = card1[0]; 
    cards.push(card1); 

    let { cards : card2 } = await getCard(deck);
    card2 = card2[0]; 
    cards.push(card2); 
    
    for (let i = 0; i < cards.length; i++) {
        console.log(cards[i].value, 'of', cards[i].suit);
    }

    // part 2 step 3
    const cardBtn = document.querySelector('#card-button');
    const outOfCards = document.querySelector('#out-of-cards');
    const img = document.querySelector('#img');
    cardBtn.addEventListener('click', eventHandler(img, outOfCards));

}


main();