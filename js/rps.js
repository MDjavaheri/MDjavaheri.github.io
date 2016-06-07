/*
Project: Rock, Paper, Scissors
Author: MDjavaheri
Date: March, 2016
Version: 1.0

Objective: A Rock Paper Scissors game with three different computer gameplay strategies
Implementation: One dominant Controller class as well as a Scoreboard and Computer Opponent

*/
/* global Controller */
$(function() {
	"use strict";
	var computer = Computer() //not a function?
	var sb = ScoreBoard();
	var game = Controller(computer, sb);
	//Controller: Takes GUI input and runs the game
	function Controller(computer, scoreBoard) {
		//this.computer = computer;
		//this.scoreBoard = scoreBoard;
		var self = {
			//turn counter for logging
			turn: 1,

			play: function(humanMove) {
				//Associative array of moves and the moves they lose to
				var counterMove = {
					"rock": "paper",
					"paper": "scissors",
					"scissors": "rock"
				};
				//Get computer's move
				var compMove = computer.move();

				var resultText;
				if (humanMove === compMove) {//It's a draw!
					resultText = "tied";
				}
				else if (humanMove === counterMove[compMove]){ //You Win!
					resultText = "won";
				}
				else { //You Lose!
					resultText = "lost";
				}
				scoreBoard.updateScores(resultText);
				updateLog(humanMove, compMove, resultText);
				this.turn++;

				//$("#log").animate({scrollTop: $(this).height() + 16});

				//Update computer move count with most frequently successful move (counter of the user's most frequent)
				computer.moveCount[counterMove[humanMove]]++;
    		//update last move property to counter player's next move for last move strategy
				computer.lastMoveCounter = counterMove[humanMove];
			},
			//appends the latest results to the log
			updateLog(humanMove, compMove, resultText) {
				$("<li>")
					.text(this.turn + ". Player: " + humanMove + ", Computer: " + compMove + " | You " + resultText + "!")
					.appendTo("#log");
			},
			//Change the computer's gameplay strategy
			newStrategy: function(strategy) {
				computer.strategy = strategy;
				$("#strategy span").text(strategy);
			},
			//Resart the game
			reset: function() {
				scoreBoard.reset();
				computer = Computer();
				$("#log").text("");
				this.turn = 1;
			}
		}
		return Controller;
	};

	//Computer Opponent
	var Computer = function () {
		var self = {
			//counts the human's moves to see what is most frequent
			moveCount: {
				"rock": 0,
				"paper": 0,
				"scissors": 0
			},

			//Returns the counter of the most popular player move
			faveMove: function() {
				//uses the max value to find the corresponding key in an inverted array (Underscore.js)
				var maxVal = Math.max(this.moveCount.rock, this.moveCount.paper, this.moveCount.scissors);
				var invertedMoveCount = _.invert(this.moveCount);
				return invertedMoveCount[maxVal];
			},

			//moveSequence: new Array(); a stack implementation for further implementation of various gameplay strategies

			//Determines which gameplay strategy function to call
			strategy: "random",
			move: function() {
				switch(this.strategy) {
					case "last":
						return this.lastMove();
					case "mostPopular":
						return this.faveMove();
					default:
						return this.randomMove();
				}
			},
			//Plays move that beats the player's last move
			lastMoveCounter: "",
			lastMove: function() {
				if (this.lastMoveCounter === "") {
					return this.randomMove();//defaults to a random move for the first turn
				}
				else {
					return this.lastMoveCounter;
				}
			},
			//Plays a random move
			randomMove: function() {
				var moves = ["rock", "paper", "scissors"];
				return moves[_.random(2)];
			},
		};
		return computer;
	};

	//Records score and updates player dashboard
	var ScoreBoard = function() {
		var reset = function() {
			//resets object properties
			this.scores["wins"] = 0;
			this.scores["losses"] = 0;
			this.scores["ties"] = 0;

			//reset gui
			$("#wins").text(0);
			$("#ties").text(0);
			$("#losses").text(0);
		},
		board =  {
			scores: {
				"wins": 0,
				"losses": 0,
				"ties": 0
			},
			//increments the designated result on the scoreboard and the object
			//probably good reason to go Backbone or React
			updateScores: function(result) {
				this.scores[result] += 1;
				$("#" + result).text(this.scores[result]);
			}
		};
		return board;
	};

	//---jQuery GUI helpers---
	//Start a new game
	$("#reset").click(function() {
		controller.reset();
	});
	//Pick a move
	$("#playerMoves button.move").click(function(){
		controller.play($(this).data("move"));
	});
	// Change computer strategy
	$(".strButton").click(function(){
		var strategy = $(this).data("str");
		controller.newStrategy(strategy);
	});
	//toggles display of testing fixture
	$("#testBtn").click(function(){
		$(".tests").toggle();
	});
})
