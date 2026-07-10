# HW: Grade Calculator

Build a grade calculator for CSCE 120. The program should calculate summary grades in the course based on formatted score input. Use the course syllabus and provided test cases to design and implement the program.

## Objectives

* Compile and run a Go program
* Use data types: numeric and string
* Use control structures: sequence, selection, iteration, and function invocation
* Read and write data to standard streams
* Process data "online" (as you read it)
  * I.e. You don't need to save it in an array, list, map, etc.
* Read and extract information from the course syllabus and test cases

## Submission

* Go to the assignment in Canvas
* Click on the link to open Gradescope
* Submit only these files to Gradescope:
  * `grade_calculator.go`

## Starter Code and Test Cases

[Get the starter code and test cases](starter.zip)
* `grade_calculator.go`
* `test_cases/`
  * `input/` has the grade input data
  * `output/` has the expected grade summary output
  * corresponding inputs and outputs have the same name
    * given the data in `input/complete_many_A.txt` as input,
    * the expected output is in `output/complete_many_A.txt`

## Input and Output Formatting

### Input

Grade items are specified one per line with the format `<category> <score>`, where

* `<category>` is one of `hw`, `lw`, `quiz`, `midterm-exam`, `final-exam`, `honors-project`
* `<score>` is a non-negative decimal number.

For example, the input will look like:

```txt
lw 100
hw 96.40
quiz 94.18
midterm-exam 93.12
final-exam 95.63
```

Input to the program is supplied via the standard input stream (e.g. in the terminal) and is terminated by the end-of-file symbol (ctrl+D).

### Output

A grade summary reported should be printed to the standard output stream (e.g. to the terminal).  The expected format of the output is demonstrated in the test case output files, e.g.

```txt
summary:
      homework:  94.47
       labwork:  90.00
       quizzes:  95.23
 midterm exams:  95.64
    final exam:  92.92
----------------------
weighted total:  94.19
final letter grade: A
```

## Testing

You can redirect the contents of a file to a program's standard input stream using the input redirection operator `<` in the shell:

```sh
go run grade_calculator.go < test_cases/input/complete_one_A.txt
```

You can compare the output of your program to the expected output by piping the stanrdard output stream to the `diff` utility:

```sh
go run grade_calculator.go < test_cases/input/complete_one_A.txt | diff test_cases/output/complete_one_A.txt -
```

If the output does not match, `diff` will tell you where and show you, e.g. if my spacing was off in the 5th line the report would be:

```txt
5c5
<  midterm exams:  93.12
---
>  midterm exams: 93.12
```

In plain English, `diff` just said: "Line 5 of the first file (the expected output) has been changed to line 5 of the second file (your actual output)".

## Two Syllabi

There are 2 syllabi that your program must support: regular and honors.  You can both both syllabi in Simple Syllabus:

* TODO: link to honors syllabus
* TODO: link to regular syllabus

### Additional Details

If a detail that you think is necessary for this assignment is not specified in the syllabi and is not listed below (refresh the page in case it has been added since you last loaded the page), contact your instructor for clarification.

* Labwork scores are `0` or `100`
  * `0`: not complete
  * `100`: complete
* The final weighted total is rounded to the nearest integer before conversion to the final letter grade
  * Ties round up: *X*.5 rounds to *X*+1
