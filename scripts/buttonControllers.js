import { dealerHand, playerHand, displayCard, cardCounter, dealerDraws } from "./cardController.js";
import { checkWinner, isWinnerFound, resetPage } from "../main.js";
const restartButton = document.querySelector(".reset")
const drawButton = document.querySelector(".draw")
const holdButton = document.querySelector(".hold")

function handleHoldButton(event){
    event.preventDefault();
    let foundWinner = "";
    let dealersCount = parseInt(dealerHand.textContent)
    let playersCount = parseInt(playerHand.textContent)
    drawButton.style.display = "none";
    holdButton.style.display = "none";
    const playerTurnOver = true;

    if(dealersCount >= 17){
        foundWinner = checkWinner(dealersCount,playersCount,playerTurnOver,true)
    }else{
        foundWinner = checkWinner(dealersCount,playersCount,playerTurnOver,false)
    }

    if(foundWinner){
        isWinnerFound(foundWinner)
    }else{
        const intervalId = setInterval(() => {
            dealersCount = dealerDraws(dealersCount, playersCount, playerTurnOver, intervalId);
        }, 2000);
    }
}


function handleRestartButton(event){
    event.preventDefault();
    fetch("https://deckofcardsapi.com/api/deck/fmlxy9qw29b8/shuffle/")
    resetPage();
}

function handleDrawButton(event){
    event.preventDefault();
    let dealersCount = parseInt(dealerHand.textContent)
    let playersCount = parseInt(playerHand.textContent)
    let foundWinner = "";
    fetch("https://deckofcardsapi.com/api/deck/fmlxy9qw29b8/draw/?count=1")
    .then((response) => response.json())
    .then((data) => {
        displayCard(playerHand,"player",data.cards[0]);
        playersCount = cardCounter(playerHand,document.querySelectorAll(".player"));
        foundWinner = checkWinner(dealersCount, playersCount, false, false);
        isWinnerFound(foundWinner);
    })
}

export {
    handleDrawButton,
    handleRestartButton,
    handleHoldButton,
    restartButton,
    drawButton,
    holdButton
}