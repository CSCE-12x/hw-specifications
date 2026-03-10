# HW: Crazy 8s

## Overview

### Objectives

* Practice with classes (constructors, getters, setters, and encapsulation).
* Working with dynamic memory and pointers.
* Using vectors.
* Additional practice with file I/O.
* Additional practice with exceptions.

### Guidelines for Homework

* This and all other homeworks are individual coding practice assignments.
* Do not show your code to other students.
* Do not look at the code of other students.
* Do not share your code with other students.
* Do not use AI tools.

If you have questions about this assignment, talk to a Peer Teacher, a TA, or an instructor.

* Go to Gradescope to submit your code
* Ask questions on the Q\&A board.
  * Look there to see if someone has already asked your question.
  * It is very rare that a student's question is unique. Ask there, and everyone can benefit from the answer.
  * If you know the answer, go ahead and answer it yourself!
  * Do not post HW code publicly. Make a **private** post to Instructors and TAs on the Q\&A board..
    * Do not post screenshots of code.

If you know about another student who is sharing their code with other students (or in any other way is violating the Aggie Code of Honor), you should report them to the instructor or [report them to the AHSO](https://cm.maxient.com/reportingform.php?TexasAMUniv&layout_id=11). If you become aware of academic dishonesty, you are expected to report it through the appropriate channels.

### Introduction

Crazy 8s is a simple classic card game which is very similar to Uno. If you aren’t familiar with the game, you may want to [read the section Rules of Crazy 8s](#rules-of-crazy-8s) first. In this homework, you will create a C++ version of the game, which you can play against friends, or against a (very basic) artificial intelligence. Along the way, you’ll get to practice your skills at handling dynamic memory and object-oriented programming.

## Getting Started
* [Get the starter code](https://drive.google.com/file/d/1Io03LsXjUS3KNt-GpHMHpEO18Td6VzVi/view?usp=drive_link)
  * `game.h` and `game.cpp`: Manages the game, keeps track of all players and cards.
  * `player.h` and `player.cpp`: Players of the game, who may be humans or AIs.
  * `card.h` and `card.cpp`: Cards used to play the game.
  * `main.cpp`: this file is useful for testing your code locally and contains a menu for setting up a game. You do not need to modify this file.
  * `starter_decks/*`: Deck files to use for testing.  Contains both valid and invalid examples.
* Review the code.
  * Read header and source files.
  * Compile and run the initial state of the starter code.
  * Review the organization of the classes. The UML class diagram below shows the relationships bewteen the `Game`, `Player`, and `Card` classes used for this program.

![UML class diagram for Player, Game, and Card classes.](crazy8s_class_diagram.png)

## Recommendations
* **Read the entire document first** as class and function relationships can get confusing if you aren’t careful.
* Implement only the methods/functions you need at the moment. You don’t have to get everything done at once (it is not a good strategy to follow anyways).
* Implement the classes in the following order:
  1. `Card`
  2. `Player`
  3. `Game`
* You can utilize `main.cpp` to test the functions that you have implemented so far. You can also create a separate testing file with its own `main` function (strongly recommended).
* [Refer to the appendix](#appendix) as needed.
* Plan and **think before you code** (write test cases first).
* Tips for working with the autograder:
  * The autograder is picky about your output exactly matching what is given in the requirements and/or sample execution. A resource like [Diffchecker](https://www.diffchecker.com/) may be helpful for figuring out where your output differs from Gradescope’s when they look similar.
  * If an autograder test is giving you no output at all, it usually means that your code is crashing (e.g. by dereferencing an invalid pointer).
  * If a test timesout, it is possible that your code is stuck waiting for user input after the autograder has given you all the input it has (e.g. you’re rejecting a valid input)
* **Test (locally) early and often.**

## Sample Execution
<pre>
Choose a file to load the deck from:
microDeck.txt
Enter number of players:
hi
Please enter a positive number.
0
Please enter a positive number.
2
Is player 0 an AI? (y/n)
q
Please enter y or n.
n
Is player 1 an AI? (y/n)
y
How many cards should each player start with?
none
Please enter a positive number.
5
The initial discard is 7 Hearts.
Player 0's turn!
Your hand contains: 8 Clubs, 7 Spades, 4 Spades, 9 Hearts, 5 Hearts.
The next card played must be a 7 or Hearts.
What would you like to play? (enter "draw card" to draw a card)
8 Hearts
That's not a card you have. Try again.
4 Spades
You can't play that card. Try again.
7 Spades
Player 0 plays 7 Spades.
Player 1's turn!
Player 1 plays 7 Clubs.
Player 0's turn!
Your hand contains: 8 Clubs, 4 Spades, 9 Hearts, 5 Hearts.
The next card played must be a 7 or Clubs.
What would you like to play? (enter "draw card" to draw a card)
8 Clubs
What suit would you like to declare?
Squares
That's not a suit in this deck. Try again.
Spades
Player 0 plays 8 Clubs and changes the suit to Spades.
Player 1's turn!
Player 1 draws a card.
Player 0's turn!
Your hand contains: 4 Spades, 9 Hearts, 5 Hearts.
The next card played must be a 8 or Spades.
What would you like to play? (enter "draw card" to draw a card)
4 Spades
Player 0 plays 4 Spades.
Player 1's turn!
Player 1 plays 8 Hearts and changes the suit to Hearts.
Player 0's turn!
Your hand contains: 9 Hearts, 5 Hearts.
The next card played must be a 8 or Hearts.
What would you like to play? (enter "draw card" to draw a card)
9 Hearts
Player 0 plays 9 Hearts.
Player 1's turn!
Player 1 plays 9 Clubs.
Player 0's turn!
Your hand contains: 5 Hearts.
The next card played must be a 9 or Clubs.
What would you like to play? (enter "draw card" to draw a card)
draw card
Draw pile empty, flipping the discard pile.
Player 0 draws a card.
Player 1's turn!
Player 1 plays 3 Clubs.
Player 0's turn!
Your hand contains: 5 Hearts, 7 Hearts.
The next card played must be a 3 or Clubs.
What would you like to play? (enter "draw card" to draw a card)
draw card
Player 0 draws a card.
Player 1's turn!
Player 1 plays 10 Clubs.
Player 0's turn!
Your hand contains: 5 Hearts, 7 Hearts, 7 Spades.
The next card played must be a 10 or Clubs.
What would you like to play? (enter "draw card" to draw a card)
draw card
Player 0 draws a card.
Player 1's turn!
Player 1 plays 2 Clubs.
Player 1 wins!
The most played suit was Clubs.
</pre>

## Requirements

### Allowed Includes:
  * `<cctype>`
  * `<fstream>`
  * `<iostream>`
  * `<sstream>`
  * `<stdexcept>`
  * `<string>`
  * `<vector>`
  * `"card.h"`
  * `"game.h"`
  * `"player.h"`

### Classes
* You will be implementing the three classes:
  1. `Card`
  2. `Player`
  3. `Game`
* Constructors must use [member initialization lists](https://en.cppreference.com/w/cpp/language/constructor).

#### Card

#### Player

#### Game

### General
* Exceptions should have meaningful descriptions.
* The program must compile without warnings or errors.


## Appendix

### Rules of Crazy 8s

### How to compile

(*you should have memorized this by now!*)

```sh
g++ -std=c++23 -Wall -Wextra -Weffc++ -pedantic -g -fsanitize=undefined,address *.cpp
```