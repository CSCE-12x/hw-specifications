# HW: Word Frequency Analyzer

Write a program to analyze the frequency of words in text.

## Requirements

### Input and Output Formatting

The program expects two or three command line arguments:

1. path to input file **(required)**
2. path to output file **(required)**
3. word to find *(optional)*

The input file contains ASCII-encoded printable characters: e.g. letters, numbers, punctuation, whitespace.

The output file should contain a list of words and counts, one per line.  The list should be sorted in numerically descending order by count, then (within the same count) in lexicographically ascending order by word.  For this assignment, words are case insensitive, contain only letters and apostrophes, start and end with a letter, and contain no two consecutive apostrophes. E.g. "y'all" and "you'dn't've" are words but "'cept", "'n'", and "ol'" are not (they should be counted as instances of "cept", "n", and "ol", respectively).

If the third command line argument is present, standard output (i.e. the terminal) should contain a report on how many times the word appears and the location (line and position number) of each appearance in the original text. If the word is invalid, the report should be `"<string>" is not a word.`.

#### Example

Given that `input.txt` contains:

```txt
It's a truth universally acknowledged, that a single man in possession
of a 'good fortune' must be in want of a wife!

However little known the feelings (or views) of such a man may be on his
first entering a neighbourhood, this truth is so well fixed in the minds
of the surrounding families: that he is considered as the rightful
"property" of some one (1) or other of_their_daughters.
```

When I run:

```sh
go run word_frequency_analyzer.go input.txt output.txt truth
```

Then `output.txt` should contain:

```txt
a: 6
of: 6
the: 4
in: 3
be: 2
is: 2
man: 2
or: 2
that: 2
truth: 2
acknowledged: 1
as: 1
considered: 1
daughters: 1
entering: 1
families: 1
feelings: 1
first: 1
fixed: 1
fortune: 1
good: 1
he: 1
his: 1
however: 1
it's: 1
known: 1
little: 1
may: 1
minds: 1
must: 1
neighbourhood: 1
on: 1
one: 1
other: 1
possession: 1
property: 1
rightful: 1
single: 1
so: 1
some: 1
such: 1
surrounding: 1
their: 1
this: 1
universally: 1
views: 1
want: 1
well: 1
wife: 1
```

And standard output should contain:

```txt
The word "truth" appears 2 times:
1) Ln 1 Pos 8
2) Ln 5 Pos 38
```

### Testing

You must write tests that cover at least 90% of the statements in your program.

#### Coverage Report

You can create a coverage report that shows you which lines are covered and which are not by using this command in the terminal:

```sh
go test -coverprofile=coverage.out && go tool cover -html=coverage.out -o coverage.html
```

## Submission

Submit only these files to Gradescope:

* `word_frequency_analyzer.go`
* `word_frequency_analyzer_test.go`
