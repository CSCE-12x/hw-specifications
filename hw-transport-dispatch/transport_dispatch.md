# HW: Transport Dispatch

## Overview

### Objectives

* Create and manipulate pointers.
* Create linked lists using node data type.
* Modify linked lists (add a value, remove a value, access a value).
* Implement Rule of 3
* Avoid memory errors

### Guidelines for Homework

* This and all other homeworks are individual coding practice assignments.
* Do not show your code to other students.
* Do not look at the code of other students.
* Do not share your code with other students.
* It is against course policy to use an AI tool on an assignment for any reason.  This includes, but is not limited to: summarizing the requirements, writing code, debugging code, code quality, coding advice.

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

Cross-continental transportation companies have to plan dispatch of their trucks to deliver and pick up goods. The order of their stops has to be done in a way to minimize transit time and fuel cost. Dispatch schedules are built city-by-city, with frequent additions, deletions, and some stops that are out of sequence for special needs.  You must write a program that a dispatcher can use to create dispatch schedules.

## Getting Started

* [Download the starter code](https://drive.google.com/file/d/1XjJcIe6cm4_aPZD8Z2ETatAMq6g1BfIy/view?usp=drive_link).
* [Compile and run it](#how-to-compile-and-run).
* [Submit it to Gradescope](https://www.gradescope.com).
  * Take note of the test scenarios
* Start developing your code:
  * Pick **exactly one** failing test and **reproduce it locally** (turn it into an actual, concrete, runnable test)
  * Change the code to make the test (and all previous tests) pass.
  * Optionally, refactor to improve the implementation design
  * Repeat until all tests are passing on Gradescope

## Requirements

### Approved Includes

| header           | `LinkedList.cpp` | `DispatchScheduler.cpp` |
| :--------------- | :--------------: | :---------------------: |
| `<iostream>`     | &#x2714;         | &#x2714;                |
| `<limits>`       |                  | &#x2714;                |
| `<sstream>`      |                  | &#x2714;                |
| `<stdexcept>`    | &#x2714;         | &#x2714;                |
| `<string>`       |                  | &#x2714;                |
| `"Cities.h"`     |                  | &#x2714;                |
| `"LinkedList.h"` | &#x2714;         | &#x2714;                |

### Compile Without Warnings Or Errors \[1 point\]

`LinkedList.cpp` and `DispatchScheduler.cpp` must compile with the flags `-std=c++23 -Wall -Wextra -Weffc++ -pedantic-errors` without warnings or errors.

### Implement a Linked List \[50 points\]

Your linked list must implement the following methods:

* Constructors
  * `LinkedList()`
    * create an empty list
  * `LinkedList(const LinkedList&)`
    * make a copy of the other list
* Destructor
  * `~LinkedList()`
    * deallocate all nodes in the list
* Copy assignment
  * `LinkedList& operator=(const LinkedList&)`
    * replace the list with a copy of the other list
* Capacity
  * `bool empty() const`
    * `true` if the list is empty
  * `unsigned size() const`
    * The number of items in the list
* Element access
  * `int at(unsigned) const`
    * The value at the given index
    * Throw `std::out_of_range` if the index is out of bounds
  * `int front() const`
    * The first item in the list
    * Throw `std::out_of_range` if the list is empty
* Modifiers
  * `void add(int, unsigned)`
    * Add the value at the given index
    * Throw `std::out_of_range` if the index is out of bounds
  * `void remove(unsigned)`
    * Remove the value at the given index
    * Throw `std::out_of_range` if the index is out of bounds
  * `void clear()`
    * Remove all items from the list

### Implement the Dispatch Scheduler \[24 points\]

The dispatch scheduler is a terminal application using standard input and output that recognizes the following commands:

* `push <city>`: Add the city to the front of the schedule
  * If the city is unknown, print `Unknown city.`
* `pop`:  Remove the first city from the schedule
  * If the schedule is empty, print `Cannot pop from an empty schedule.`
* `add <city>`: Add the city to the schedule so that cities are in increasing order of location
  * Insert before the first city further than the new city
  * Do not add the city if the same city would appear consecutively in the schedule.
  * If the city is unknown, print `Unknown city.`
* `remove <city>`: Remove the first instance of the city from the schedule
  * If the city is not on the schedule, print `<city> is not on the schedule.`
  * If the city is unknown, print `Unknown city.`
* `print`: Print the current schedule and route length
  * Route length is the sum of the absolute differences between consecutive cities in the schedule, starting and ending at 0 (HQ or headquarters).
    * Example: the schedule \[3, 1, 4\] has route length 12
      * 12 = |0 - 3| + |3 - 1| + |1 - 4| + |4 - 0|
* `clear`: Clear the current schedule
* `quit`: End the program

If a command is not recognized, print `Unknown command.`

[See Example Test Scenarios](#example-test-scenarios) for example use cases of the dispatch scheduler.

### Avoid Memory Errors \[25 points\]

Your linked list and dispatch scheduler must avoid memory errors, such as:

* memory leaks
* use after free
* double free
* access out of bounds

### Submission

Submit these files:

* `LinkedList.cpp`
* `DispatchScheduler.cpp`

## Appendix

### Example Test Scenarios

#### Scenario: The empty schedule

- Given an empty schedule
- When I issue the following commands:
  - `print`
  - `quit`
- Then the output should be:
  - `The schedule is empty.`

#### Scenario: Push cities into schedule

- Given an empty schedule
- When I give the following commands:
  - `push Boston`
  - `push Pittsburgh`
  - `print`
  - `quit`
- Then the output should be:
  - `Pittsburgh -> Boston -> . (14)`

#### Scenario: Add cities to schedule

- Given an empty schedule
- When I issue the following commands:
  - `add Atlanta`
  - `add Boston`
  - `add Dallas`
  - `add New York`
  - `add Pittsburgh`
  - `print`
  - `quit`
- Then the output should be:
  - `Boston -> New York -> Pittsburgh -> Atlanta -> Dallas -> . (32)`

#### Scenario: Pop city from schedule

- Given the following schedule:
  - `Boston -> New York -> Pittsburgh -> Atlanta -> Dallas -> .`
- When I issue the following commands:
  - `pop`
  - `print`
  - `quit`
- Then the output should be:
  - `New York -> Pittsburgh -> Atlanta -> Dallas -> . (32)`

#### Scenario: Remove city from schedule

- Given the following schedule:
  - `Boston -> New York -> Pittsburgh -> Atlanta -> Dallas -> .`
- When I issue the following commands:
  - `remove Dallas`
  - `print`
  - `quit`
- Then the output should be:
  - `Boston -> New York -> Pittsburgh -> Atlanta -> . (26)`

#### Scenario: Clear the schedule

- Given the following schedule:
  - `Boston -> New York -> Pittsburgh -> Atlanta -> Dallas -> .`
- When I issue the following commands:
  - `clear`
  - `print`
  - `quit`
- Then the output should be:
  - `The schedule is empty.`

#### Scenario: Unknown command

- When I issue the following commands:
  - `push Austin`
  - `yeet Austin`
  - `quit`
- Then the output should be:
  - `Unknown command.`

#### Scenario: Unknown city

- When I issue the following commands:
  - `push College Station`
  - `add Bryan`
  - `remove t.u.`
  - `quit`
- Then the output should be:
  - `Unknown city.`
  - `Unknown city.`
  - `Unknown city.`

#### Scenario: Pop from empty schedule

- Given an empty schedule
- When I issue the following commands:
  - `pop`
  - `quit`
- Then the output should be:
  - `Cannot pop from an empty schedule.`

#### Scenario: Remove city from schedule that it’s not on

- Given the following schedule:
- `Boston -> New York -> Pittsburgh -> Atlanta -> Dallas -> .`
- When I issue the following commands:
  - `remove Houston`
  - `quit`
- Then the output should be:
  - `Houston is not on the schedule.`

#### Scenario: Add or push a duplicate city

- Given the following schedule:
  - `Boston -> New York -> Pittsburgh -> .`
- When I issue the following commands:
  - `add New York`
  - `push Boston`
  - `push Pittsburgh`
  - `print`
  - `quit`
- Then the output should be:
  - `Pittsburgh -> Boston -> New York -> Pittsburgh -> . (26)`

*Explanation: `A -> A` is redundant, so is not allowed.  `A -> B -> A` is allowed.*

### Cities

* The names and locations of all cities are provided in `Cities.h`.
* `City` is an `enum` (*enumeration*), which means its values are aliases for integers
  * E.g. `City::Boston == 1`, `City::Houston == 14`.
* The integer value is also the location of the city.
* You can use `enum City` values as integers.
* To turn an integer into a City, use `City(integer)`
  * E.g. `City(1)` will construct `City::Boston`.
* Given a string name of a city, use `StringToCity(string)` to get the corresponding `enum City` value.
  * E.g. `StringToCity("Boston")` will return the `enum City` value `City::Boston`
* Given an `enum City` value, use `CityToString(City)` to get the string name of the city.
  * E.g. `CityToString(City::Houston)` will return the string value `"Houston"`

### How to compile and run

(*you should have memorized this by now!*)

```sh
g++ -std=c++23 -Wall -Wextra -Weffc++ -pedantic -g -fsanitize=undefined,address *.cpp
./a.out
```
