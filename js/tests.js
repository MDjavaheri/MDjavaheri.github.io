
//QUnit Tests

//Gameplay Tests

//clicking rock plays rock, paper plays paper, scissors plays scissors

//rules
//Rock > Scissors
//Scissors > Paper
//Paper > Rock
//Rock < Paper
//Paper < Scissors
//Rock === Rock
//Scissor === Scissors
//Paper === Paper

//Computer Methods
//Humanmove() = "paper" && then .lastMove() === paper
//lastmove when lastmove === "" is not undefined
//do a bunch of moves and most popular move is equal to the one done the most

//scoreboard
//scores update, counter increments
//reset works, all scores === 0 and log === "", counter === 1
//clicking on a strategy button updates the property and the dashboard

//Controller
//reset works 
//setup
var computer = overseasFactory();
var controller = newController();
var scoreboard = newScoreBoard();

QUnit.module("Scoreboard");
QUnit.test("Score Tally Works", function(assert) {
   assert.expect(4);
   assert.deepEqual(scoreboard.scores, {"wins":0, "losses":0, "ties":0}, "Initialization Successul");
   scoreboard.win();
   assert.deepEqual(scoreboard.scores, {"wins":1, "losses":0, "ties":0}, "Win Successul");
   scoreboard.lose();
   assert.deepEqual(scoreboard.scores, {"wins":1, "losses":1, "ties":0}, "Lose Successul");
   scoreboard.tie();
   assert.deepEqual(scoreboard.scores, {"wins":1, "losses":1, "ties":1}, "Tie Successul");
});
QUnit.test("Reset", function(assert) {
   scoreboard.reset();
   assert.deepEqual(scoreboard.scores, {"wins":0, "losses":0, "ties":0}, "Reset Successul");
});

QUnit.module("Computer");
QUnit.test("Last Move Defaults to Random", function(assert) {
    assert.ok(computer.lastMove() !== undefined,  "Last Move defaults to random move when there are no previous player moves")
});
QUnit.test("Last Move Counter Updates", function(assert) {
    assert.expect(2);
    controller.play("rock");
    assert.deepEqual(computer.lastMoveCounter, "paper", "Last Move updates correctly")
    controller.play("rock");
    controller.play("paper");
    assert.deepEqual(computer.lastMoveCounter, "scissors", "Last Move updates correctly")
});
controller.reset();//reset
QUnit.test("Move Tally Works", function(assert) {
    controller.play("scissors");
    controller.play("rock");
    controller.play("rock");
    controller.play("rock");
    controller.play("paper");
    controller.play("paper");
    controller.play("scissors");
    assert.deepEqual(computer.moveCount, {"rock": 2, "paper": 3, "scissors": 2}, "Computer Move Tally Successfully Updates");
});
QUnit.test("Most Popular Move", function(assert) {
    assert.expect(2);
    controller.play("rock");
    controller.play("rock");
    controller.play("rock");
    controller.play("rock");
    controller.play("rock");
    controller.play("rock");
    controller.play("rock");
    controller.play("paper");
    controller.play("paper");
    controller.play("scissors");
    controller.play("scissors");
    controller.play("scissors");
    assert.deepEqual(computer.faveMove(), "paper", "Favorite Move Successful");
    controller.play("scissors");
    controller.play("scissors");
    controller.play("scissors");
    controller.play("scissors");
    controller.play("scissors");
    controller.play("scissors");
    controller.play("scissors");
    controller.play("scissors");
    assert.deepEqual(computer.faveMove(), "rock", "Favorite Move Successful");
});
QUnit.test("Reset", function(assert) {
    assert.expect(2);
    controller.play("rock");
    controller.play("paper");
    controller.play("scissors");
    assert.deepEqual(computer.moveCount, {"rock": 1, "paper": 1, "scissors": 1}, "Computer Move Tally Successfully Resets");
    controller.reset();
    assert.deepEqual(computer.moveCount, {"rock": 0, "paper": 0, "scissors": 0}, "Computer Move Tally Successfully Resets");
});
controller.reset();//reset
QUnit.test("New Strategy", function(assert) {
    controller.newStrategy("Random"); 
    controller.newStrategy("Last"); 
    assert.deepEqual(computer.strategy, "last", "Controller successfully updates computer strategy");   
});

QUnit.module("Game Rules");//using last move to manipulate the computer
QUnit.test("Rock beats Scissors", function(assert) {
    controller.reset();//reset 
    controller.newStrategy("last"); 
    controller.play("paper"); 
    controller.play("rock"); 
    assert.deepEqual(scoreboard.scores, {"wins":1, "losses":0, "ties":0}, "Rock > Scissors");
});
QUnit.test("Rock loses to Paper", function(assert) {
    controller.reset();//reset 
    controller.newStrategy("last"); 
    controller.play("rock"); 
    controller.play("rock"); 
    assert.deepEqual(scoreboard.scores, {"wins":0, "losses":1, "ties":0}, "Rock < Paper");
});
QUnit.test("Rock ties with Rock", function(assert) {
    controller.reset();//reset 
    controller.newStrategy("last"); 
    controller.play("scissors"); 
    controller.play("rock"); 
    assert.deepEqual(scoreboard.scores, {"wins":0, "losses":0, "ties":1}, "Rock === Rock");
});
QUnit.test("Scissors beats Paper", function(assert) {
    controller.reset();//reset 
    controller.newStrategy("last"); 
    controller.play("rock"); 
    controller.play("scissors"); 
    assert.deepEqual(scoreboard.scores, {"wins":1, "losses":0, "ties":0}, "Scissors > Paper");
});
QUnit.test("Scissors loses to Rock", function(assert) {
    controller.reset();//reset 
    controller.newStrategy("last");
    controller.play("scissors"); 
    controller.play("scissors"); 
    assert.deepEqual(scoreboard.scores, {"wins":0, "losses":1, "ties":0}, "Scissors < Rock");
});
QUnit.test("Scissors ties with Scissors", function(assert) {
    controller.reset();//reset 
    controller.newStrategy("last"); 
    controller.play("rock"); 
    controller.play("scissors"); 
    assert.deepEqual(scoreboard.scores, {"wins":0, "losses":0, "ties":1}, "Scissors === Scissors");    
});
QUnit.test("Paper beats Rock", function(assert) {
    controller.reset();//reset 
    controller.newStrategy("last"); 
    controller.play("scissors"); 
    controller.play("paper"); 
    assert.deepEqual(scoreboard.scores, {"wins":1, "losses":0, "ties":0}, "Paper > Rock");    
});
QUnit.test("Paper loses to Scissors", function(assert) {
    controller.reset();//reset 
    controller.newStrategy("last"); 
    controller.play("paper"); 
    controller.play("paper"); 
    assert.deepEqual(scoreboard.scores, {"wins":0, "losses":1, "ties":0}, "Paper < Scissors");    
});
QUnit.test("Paper ties with Paper", function(assert) {
   controller.reset();//reset 
    controller.newStrategy("last"); 
    controller.play("rock"); 
    controller.play("paper"); 
    assert.deepEqual(scoreboard.scores, {"wins":0, "losses":0, "ties":1}, "Paper === Paper");     
});