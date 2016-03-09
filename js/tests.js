
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
QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});