# Testing

You can redirect the contents of a file to a program's standard input stream using the input redirection operator `<` in the shell:

```sh
go run grade_calculator.go < test_cases/input/complete_one_A.txt
```

You can compare the output of your program to the expected output by piping the standard output stream to the `diff` utility:

```sh
go run grade_calculator.go < test_cases/input/complete_one_A.txt | diff test_cases/output/complete_one_A.txt -
```

If the output does not match, `diff` will tell you where and show you, e.g. if my spacing was off in the 5th line, then the report would be:

```txt
5c5
<  midterm exams:  93.12
---
>  midterm exams: 93.12
```

In plain English, `diff` just said: "Line 5 of the first file (the expected output) has been changed to line 5 of the second file (your actual output)".
