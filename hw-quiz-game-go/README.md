# HW: Quiz Game

Build a quiz game with multiple question types.  Once done, you can extend it and use it to help you study for your classes.


## Requirements

Here is an example of code I want to write:

```go
// main.go
package main

import "fmt"

func main() {
	questions := MakeQuiz()
	score := TakeQuiz(StdioQuizTaker{}, questions)
	fmt.Printf("score: %d/%d\n", score, len(questions))
}

func MakeQuiz() []Question {
	// question data could be loaded from file(s)
	return []Question{
		NewTrueFalseQuestion(
			"There is more than one way to place curly braces.", // prompt
			false, // correct answer
		),
		NewMultipleChoiceQuestion(
			"Which interface should a type implement in order to be easily printable?", // prompt
			[]string{ // options
				"strconv.Printer",   // option (a)
				"strings.Printable", // option (b)
				"fmt.Stringer",      // option (c)
				"types.Stringify",   // option (d)
			},
			"c", // correct option
		),
		NewMultipleAnswerQuestion(
			"Which statements are true in Go?", // prompt
			[]string{ // options
				"Interface types specify required behaviors with a set of methods.",   // option (a)
				"Interfaces are satisfied implicitly by new or existing code.",        // option (b)
				"A structure will satisfy the interfaces that embedded type satisfy.", // option (c)
				"Interfaces should be as big as possible.",                            // option (d)
			},
			[]string{"a", "b", "c"}, // correct answers (order not significant)
		),
		NewFillInTheBlanksQuestion(
			"Favor object _____ over class inheritance.", // prompt
			"composition", // correct answer
		),
		NewFillInTheBlanksQuestion(
			"Use _____ for indentation and _____ for alignment.", // prompt
			"tabs blanks", // correct answers (order significant)
		),
		NewSequenceQuestion(
			"Put the code in the correct order:", // prompt
			[]string{ // items in correct order
				"package main",
				"import \"fmt\"",
				"func main() {",
				"\tfmt.Println(\"Hello, World.\")",
				"}",
			},
		),
	}
}

func TakeQuiz(qt QuizTaker, questions []Question) int {
	score := 0
	for _, q := range questions {
		response := qt.Ask(q.Text())
		if q.IsCorrect(response) {
			score++
		}
	}
	return score
}
```

```go
// stdio_quiz_taker.go
package main

import (
	"bufio"
	"fmt"
	"os"
)

type StdioQuizTaker struct{}

func (qt StdioQuizTaker) Ask(text string) string {
	fmt.Println(text)
	s := bufio.NewScanner(os.Stdin)
	if s.Scan() {
		return s.Text()
	}
	return ""
}
```

You need to identify, define, and implement the interfaces and types required in order for code like the above to work correctly.

Your goal is not just to make the program work, but to organize the program around meaningful behaviors. The main behavior of your program must be implemented in types, functions, and methods that can be called directly from tests.  Types (structs and interfaces) should represent important concepts in the problem. Functions and methods should describe what those concepts can do.


### Testing

You must write tests that cover at least 90% of the statements in your program.


## Submission

The only restriction on filenames for this assignment is that they must end with `.go`.
The exceptions are files named `main.go` and `stdio_quiz_taker.go`, which you should not submit because they are provided and your versions will be overwritten.
Test files should end with `_test.go`.
Do not submit any files with a `main` function.
