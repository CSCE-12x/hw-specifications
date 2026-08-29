# HW: Grade Calculator

Build a grade calculator for CSCE 120. The program should produce a summary report of grades in the course based on formatted score input. Use the course syllabus and provided test cases to design and implement the program.

## Grading Policy is in the Syllabus

There are two syllabi that your program must support:

1. [CSCE 120-200](https://tamu.simplesyllabus.com/en-US/doc/i01fhdygf/Fall-2026-College-Station-CSCE-120-200-%2857876%29-PROGRAM-DESIGN-%26-CONCEPTS?mode=view)
2. [CSCE 120-{512-517}](https://tamu.simplesyllabus.com/en-US/doc/9lg7v2vyy/Fall-2026-College-Station-CSCE-120-512-%2857882%29-PROGRAM-DESIGN-%26-CONCEPTS?mode=view)

## Test Cases

[Get the test cases.](testcases.zip)
* `test_cases/`
  * `input/` has the grade input data
  * `output/` has the expected grade summary output
  * corresponding input and output files have the same name

[More information on testing.](testing.md)

## Additional Requirements

If an apparent requirement is not specified in the syllabi and is not demonstrated sufficiently in the test cases and is not listed below (refresh the page in case it has been added since you last loaded the page), contact your instructor for clarification.

* Labwork scores are out of 10
* Quiz scores are out of 20
* The final weighted total is rounded to the nearest integer before conversion to the final letter grade
  * Ties round up: *X*.5 rounds to *X*+1

## Example of Input and Output

### Input

Input to the program is supplied via the standard input stream (e.g. in the terminal).

```txt
hw 98.88
lw 9.79
quiz 18.71
midterm-exam 90.59
final-exam 99.42
```

### Output

Output should be printed to the standard output stream (e.g. to the terminal).

```txt
summary:
      homework:  98.88
       labwork:  97.90
       quizzes:  93.55
 midterm exams:  90.59
    final exam:  99.42
----------------------
weighted total:  94.86
final letter grade: A
```

## Submission

Submit only these files to Gradescope:

* `grade_calculator.go`
