function Card(suit, value){
    var suit=suit;
    var value=value;
    this.getNumber=function(){
        return value;
    }
    this.getSuit=function(){
        if (suit===1){
            return "Hearts";
        }
        else if (suit===2){
            return "Diamonds";
        }
        else if(suit===3){
            return "Clubs";
        }
        else{return "Spades"};

    }
    this.getValue=function(){
        if (value==1){
            return 11;
        }
        if (value>=10){
            return 10;
        }
        else{
            return value;
        }
    }
    this.getName=function(){
    if (value==1){
    	return "Ace";
    }
    else if (value==11){
    	return "Jack";
    }
    else if (value==12){
    	return "Queen";
    }
    else if (value==13){
    	return "King";
    }
    else return this.getValue();
    }
}

function deal(){
    suit =Math.ceil(Math.random()* 4);
    value=Math.ceil(Math.random()*13);
    return new Card(suit,value);
}

function Hand(){
    var array=[];
    array.push(deal());
    //console.log(array[0].getValue())
    array.push(deal());
    
    this.getHand=function(){
        return array;
    }
    this.score=function(){
        var sum=0;
        var aces=0;
        var l=array.length;
        //console.log("el is "+l)
        for(i=0;i<array.length;i++){
            sum+=array[i].getValue();
            //console.log("i is " + i + " "+sum)
            if (array[i].getValue()===11){aces++};
        }
        //console.log(aces)
        while (sum>21&&aces>0){
            sum-=10;
            aces--;
        }
        if (sum>21){sum="Bust"}
        return sum;
    }
    
    this.printHand=function(){
    var hand="";
        for (i=0; i<array.length;i++){
            hand +=array[i].getName()+" of "+array[i].getSuit() + '\n';
        }
        console.log("Your hand: \n" +hand);
    }
    
    this.hitMe=function(){
        array[array.length]=deal();
    }
}

var dealerHand;
function playAsDealer(){
    dealerHand=new Hand();
    //console.log(hand.score())
    while (playerHand.score() !="Bust" && dealerHand.score()<=playerHand.score()){
        dealerHand.hitMe();
    }
    
    console.log("Dealer score: "  + dealerHand.score());
}

var playerHand;
function playAsUser(){
    playerHand= new Hand();
    var hit=true;
    while (hit){
        playerHand.printHand();
        hit=confirm("Hit?");
        if (hit){
            playerHand.hitMe();
        }
    }
    console.log("Your score: "+ playerHand.score())
}

function declareWinner(userHand,dealerHand){
    if (userHand.score()>dealerHand.score() || dealerHand.score()=="Bust"){
        console.log( "You win!");
    }
    else if (userHand.score()<dealerHand.score() || userHand.score()=="Bust"){
        console.log( "You lose!");
    }
    else {
        console.log( "You tied! But the house always wins...");
    }
}

function playGame(){
    playAsUser();
    playAsDealer();
    declareWinner(playerHand,dealerHand);
}

playGame();
