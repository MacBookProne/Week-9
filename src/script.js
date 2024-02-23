class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.rank = this.assignRank(value);
    }

    // Maps card values to their ranks for comparison
    assignRank(value) {
        const valueMap = {
            '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
            '8': 8, '9': 9, '10': 10,
            'Jack': 11, 'Queen': 12, 'King': 13, 'Ace': 14
        };
        return valueMap[value] || value; // Return the rank of the card
    }
}

class Deck {
    constructor() {
        this.cards = []; // Initialize an empty array for the deck
        this.createDeck(); // Fill the deck with cards
        this.shuffle(); // Shuffle the deck
    }

    // Creates a standard 52-card deck
    createDeck() {
        const suits = ['Spade', 'Hearts', 'Clubs', 'Diamonds'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

        // Loop through each suit and value combination and add it to the deck
        for (let suit of suits) {
            for (let value of values) {
                this.cards.push(new Card(suit, value));
            }
        }
    }

    // Shuffles the deck using the Fisher-Yates shuffle algorithm
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // Swap the ith and jth elements
        }
    }

    // Deals cards evenly to two players from the deck
    dealCards(player1, player2) {
        while (this.cards.length) {
            player1.hand.push(this.cards.shift()); // Deal one card to player1
            player2.hand.push(this.cards.shift()); // Deal one card to player2
        }
    }
}

class Player {
    constructor(name) {
        this.name = name; // Assign the player's name
        this.hand = []; // Initialize an empty array to hold the player's cards
        this.score = 0; // Initialize the player's score
    }
}

class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.deck = new Deck(); // Creates, populates, and shuffles the deck
        this.deck.dealCards(player1, player2); // Deals cards to players
    }

    compareCards(card1, card2) {
        if (card1.rank > card2.rank) {
            this.player1.score++;
            return `${this.player1.name} wins this round.`;
        } else if (card1.rank < card2.rank) {
            this.player2.score++;
            return `${this.player2.name} wins this round.`;
        } else {
            return "It's a tie!";
        }
    }

    playGame() {
        let gameResults = '';
        while (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
            const card1 = this.player1.hand.shift();
            const card2 = this.player2.hand.shift();
            gameResults += this.compareCards(card1, card2) + '\n';
        }

        if (this.player1.score > this.player2.score) {
            gameResults += `${this.player1.name} wins the game!`;
        } else if (this.player1.score < this.player2.score) {
            gameResults += `${this.player2.name} wins the game!`;
        } else {
            gameResults += "The game ends in a tie!";
        }
        return gameResults;
    }
}

// Usage
let player1 = new Player("George");
let player2 = new Player("Jamie");
let game = new Game(player1, player2); // Initializes the game and deals cards
console.log(game.playGame()); // Starts the game and logs the outcome
