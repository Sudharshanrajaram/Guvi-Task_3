const gridDisplay =document.querySelector('#grid');
const scoreDisplay =document.querySelector('#score');

const cardArray = [
    {
        name : 'ace_heart',
        img : 'img/ace_heart.png'
    },
    {
        name : 'ace_clubs',
        img : 'img/ace_clubs.png'
    },
    {
        name : 'ace_diamond',
        img : 'img/ace_diamond.png'
    },
    {
        name : 'joker',
        img : 'img/joker.png'
    },
    {
        name : 'king_heart',
        img : 'img/king_heart.png'
    },
    {
        name : 'queen_heart',
        img : 'img/queen_heart.png'
    },
    {
        name : 'ace_heart',
        img : 'img/ace_heart.png'
    },
    {
        name : 'ace_clubs',
        img : 'img/ace_clubs.png'
    },
    {
        name : 'ace_diamond',
        img : 'img/ace_diamond.png'
    },
    {
        name : 'joker',
        img : 'img/joker.png'
    },
    {
        name : 'king_heart',
        img : 'img/king_heart.png'
    },
    {
        name : 'queen_heart',
        img : 'img/queen_heart.png'
    },
]

cardArray.sort(() => 0.5 - Math.random());

genBoard();
function genBoard(){
    for( let i = 0; i < cardArray.length; i++){
        var card = document.createElement('img');
        card.setAttribute('src', 'img/on.png');
        card.setAttribute('data-id', i);
        card.addEventListener("click", flipCard);
        gridDisplay.appendChild(card);
    }
    console.log(cardArray);
}

card_1 = [];
card_2 = [];

function flipCard(){
    var card_id = this.getAttribute('data-id');
    this.setAttribute("src",cardArray[card_id].img);

    card_2.push(card_id);
    card_1.push(cardArray[card_id].name);

    if(card_1.length === 2 ){
        setTimeout(checkMatch, 500);
    }
}

cardsWon = [];

function checkMatch(){
    const cards = document.querySelectorAll('img');

    if(card_1[0] == card_1[1]){
        cards[card_2[0]].setAttribute("src","img/finish.png");
        cards[card_2[1]].setAttribute("src","img/finish.png");
        cards[card_2[0]].removeEventListener("click", flipCard);
        cards[card_2[1]].removeEventListener("click", flipCard);
        cardsWon.push(card_1);
        scoreDisplay.innerHTML=cardsWon.length;
    }
    else{
        cards[card_2[0]].setAttribute("src","img/on.png");
        cards[card_2[1]].setAttribute("src","img/on.png");
    }
    
card_1 = [];
card_2 = [];

if (cardsWon.length == cardArray.length / 2){
    scoreDisplay.innerHTML = ("You Won!");
}

}

var timeLeft = 30;
var count = document.getElementById("timer");
function startCountDown(){
var timer = setInterval(function(){
    if (timeLeft <= 0){
        count.innerText = "Time's up";
        gridDisplay.innerHTML = "Time's up !!<a href=./index.html>Restart</a>";
    }
    else{
        count.innerText = "TimeLeft : " + timeLeft + " seconds";
        timeLeft--;
    }
},1000);
}
startCountDown();

