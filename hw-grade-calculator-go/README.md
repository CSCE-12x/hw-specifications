# HW: Grade Calculator

Build a grade calculator for CSCE 120. The program should produce summary report of grades in the course based on formatted score input. Use the course syllabus and provided test cases to design and implement the program.

## Grading Policy is in the Syllabus

There are two syllabi that your program must support:

1. [CSCE 120-200](https://tamu.simplesyllabus.com/en-US/doc/i01fhdygf/Fall-2026-College-Station-CSCE-120-200-%2857876%29-PROGRAM-DESIGN-&-CONCEPTS?mode=view)
2. [CSCE 120-{512-517}](https://tamu.simplesyllabus.com/en-US/doc/9lg7v2vyy/Fall-2026-College-Station-CSCE-120-512-%2857882%29-PROGRAM-DESIGN-&-CONCEPTS?mode=view)

## Starter Code and Test Cases

[Get the starter code and test cases](starter.zip)
* `grade_calculator.go`
* `test_cases/`
  * `input/` has the grade input data
  * `output/` has the expected grade summary output
  * corresponding input and output files have the same name

[More information on testing.](testing.md)

## Additional Requirements

If an apparent requirement is not specified in the syllabi and is not demonstrated sufficiently in the test cases and is not listed below (refresh the page in case it has been added since you last loaded the page), contact your instructor for clarification.

* Labwork scores are `0` or `100`
  * `0`: not complete
  * `100`: complete
* The final weighted total is rounded to the nearest integer before conversion to the final letter grade
  * Ties round up: *X*.5 rounds to *X*+1

## Example of Input and Output

### Input

Input to the program is supplied via the standard input stream (e.g. in the terminal).

```txt
lw 100
hw 96.40
quiz 94.18
midterm-exam 93.12
final-exam 95.63
```

### Output

Output should be printed to the standard output stream (e.g. to the terminal).

```txt
summary:
      homework:  96.40
       labwork: 100.00
       quizzes:  94.18
 midterm exams:  93.12
    final exam:  95.63
----------------------
weighted total:  95.06
final letter grade: A
```

## Submission

Submit only these files to Gradescope:

* `grade_calculator.go`
