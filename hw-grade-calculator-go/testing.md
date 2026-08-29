# Testing

## PowerShell

You can redirect the contents of a file to a program's standard input stream using the `Get-Content` cmdlet (aliased as `cat`) and the pipe operator `|`:

```ps
cat test_cases/input/complete_one_A.txt -Raw | go run grade_calculator.go
```

You can compare the output of your program to the expected output by saving the output to a file using the output redirection operator `>` and using the `Compare-Object` cmdlet (aliased as `diff`) to compare the expected file to the actual file:

```ps
cat test_cases/input/complete_one_A.txt -Raw | go run grade_calculator.go > summary.txt
diff (cat test_cases/output/complete_one_A.txt) (cat summary.txt)
```

If the output does not match, `diff` will show you, e.g. if my midterm exam grade was wrong, then the report would be:

```txt
InputObject            SideIndicator
-----------            -------------
 midterm exams:  86.75 =>
 midterm exams:  90.59 <=
```

In plain English, `diff` just said: `midterm exams:  86.75` is only in the right-side argument (a.k.a the second file, a.k.a. the `DifferenceObject`, a.k.a your actual output) and `midterm exams:  99.18` is only in the left-side argument (a.k.a the first file, a.k.a the `ReferenceObject`, a.k.a the expected output).


## *nix Shell (e.g. WSL, MacOS)

You can redirect the contents of a file to a program's standard input stream using the input redirection operator `<`:

```sh
go run grade_calculator.go < test_cases/input/complete_one_A.txt
```

You can compare the output of your program to the expected output by piping the standard output stream to the `diff` utility:

```sh
go run grade_calculator.go < test_cases/input/complete_one_A.txt | diff test_cases/output/complete_one_A.txt -
```

If the output does not match, `diff` will tell you where and show you, e.g. if my if my midterm exam grade was wrong, then the report would be:

```txt
5c5
<  midterm exams:  90.59
---
>  midterm exams:  86.75
```

In plain English, `diff` just said: "Line 5 of the first file (the expected output) has been changed to line 5 of the second file (your actual output)".
