
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
   assert.expect(5);
   var scoreboard = newScoreBoard();
   assert.deepEqual(scoreboard.scores, {"wins":0, "losses":0, "ties":0}, "Initialization Successul");
   scoreboard.win();
   assert.deepEqual(scoreboard.scores, {"wins":1, "losses":0, "ties":0}, "Win Successul");
   scoreboard.lose();
   assert.deepEqual(scoreboard.scores, {"wins":1, "losses":1, "ties":0}, "Lose Successul");
   scoreboard.tie();
   assert.deepEqual(scoreboard.scores, {"wins":1, "losses":1, "ties":1}, "Tie Successul");
   scoreboard.reset();
   assert.deepEqual(scoreboard.scores, {"wins":0, "losses":0, "ties":0}, "Reset Successul");
});

QUnit.module("General")
QUnit.test("computer move dependants", function(assert) {
    var computer = overseasFactory();
    var controller = newController();
    assert.expect(6);
    assert.ok(computer.lastMove() !== undefined,  "Last Move defaults to random move")
    controller.play("rock");
    controller.play("rock");
    assert.deepEqual(computer.lastMoveCounter, "paper", "Last Move updates correctly")
    controller.play("rock");
    controller.play("rock");
    controller.play("rock");
    controller.play("paper");
    controller.play("paper");
    assert.deepEqual(computer.lastMoveCounter, "scissors", "Last Move updates correctly")
    controller.play("paper");
    controller.play("scissors");
    controller.play("scissors");
    assert.deepEqual(computer.moveCount, {"rock": 5, "paper": 3, "scissors": 2}, "Computer Move Tally Successfully Updates");
    assert.deepEqual(computer.faveMove(), "paper", "Favorite Move Successful");
    controller.reset();
    assert.deepEqual(computer.moveCount, {"rock": 0, "paper": 0, "scissors": 0}, "Computer Move Tally Successfully Resets");
});