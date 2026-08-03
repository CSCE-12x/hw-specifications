# Testing

## General test pattern

As you should already know from class, the general pattern for testing looks like:

* **Given**: set up pre-conditions
* **When**: take some action
* **Then**: check post-conditions

For example:

```go
// Given:
// * cat moves toward the statue at 1 m/s
// * cat moves around the statue at 1.25 m/s
// * cat will give up after 30 minutes
// * mouse moves at 1 m/s
// * statue diameter is 2 m
p := Parameters{1.0, 1.25, 30, 1.0, 2.0}
// And cat initial position is 4 m and 0 radians
c := Cat{4.0, 0.0}
// And mouse initial position is 1 radian
m := Mouse{1.0}

// When I run the simulation
caught, catRecords, mouseRecords := CatCatchesMouse(p, c, m)

// Then the cat should catch the mouse at time 10
if !caught {
    fmt.Println("fail: expected cat to catch mouse")
}
if len(catRecords) != 11 {
    fmt.Printf("fail: expected exactly 11 cat records, got %d\n", len(catRecords))
}
if len(mouseRecords) != 11 {
    fmt.Printf("fail: expected exactly 11 mouse records, got %d\n", len(mouseRecords))
}
// And the cat and the mouse should have the same final angle
finalCatAngle := catRecords[len(catRecords)-1].angle
finalMouseAngle := mouseRecords[len(mouseRecords)-1].angle
if finalCatAngle != finalMouseAngle {
    fmt.Printf("fail: expected cat to stop at mouse, got %f != %f", finalCatAngle, finalMouseAngle)
}
```

## Testing functions which expect user input

You can specify the "user" input to your program and capture the output of your program by giving the `Main` function arguments that satisfy the `io.reader` and `io.writer` interfaces:

```go
input := strings.NewReader("your\ninput\ngoes\nhere\n")
var output bytes.Buffer
Main(input, &output)
// test output for correctness
```

When `Main` reads from its reader (1st argument, `input`), it will read from the string you provided.  When `Main` writes to its writer (2nd argument, `output`), it will write to the buffer you provided.  You can get the contents of the buffer as a string: `output.String()`.

This same tactic works for testing any function that has `io.reader` and `io.writer` parameters.

## Coverage Report

You can create a coverage report that shows you which lines are covered and which are not by using this command in the terminal:

```sh
go test -coverprofile=coverage.out && go tool cover -html=coverage.out -o coverage.html
```
