
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
QUnit.module("scoreboard-specific");
QUnit.test("tally up and reset", function(assert) {
   assert.expect(8);
   var scoreboard = newScoreBoard();
   assert.deepEqual(scoreboard.scores, {"wins":0, "losses":0, "ties":0}, "Initialization Successul");
   scoreboard.win();
   assert.deepEqual(scoreboard.scores, {"wins":1, "losses":0, "ties":0}, "Win Successul");
   assert.deepEqual($("#wins").text(), 1)
   scoreboard.lose();
   assert.deepEqual(scoreboard.scores, {"wins":1, "losses":1, "ties":0}, "Lose Successul");
   assert.deepEqual($("#losses").text(), 1)
   scoreboard.tie();
   assert.deepEqual(scoreboard.scores, {"wins":1, "losses":1, "ties":1}, "Tie Successul");
   assert.deepEqual($("#ties").text(), 1)
   scoreboard.reset();
   assert.deepEqual(scoreboard.scores, {"wins":0, "losses":0, "ties":0}, "Reset Successul");
})

QUnit.test("computer move tally", {
    var computer = overseasFactory();
    var controller = newController();
    controller.shoot("rock");
    controller.shoot("rock");
    controller.shoot("rock");
    controller.shoot("rock");
    controller.shoot("rock");
    controller.shoot("paper");
    controller.shoot("paper");
    controller.shoot("paper");
    controller.shoot("scissors");
    controller.shoot("scissors");
    assert.deepEqual(computer.moveCount, {"rock": 5, "paper": 3, "scissors": 2}, "Computer Move Tally Successfully Updates");
})