# Functions as Arguments

Functions are first-class citizens in Go: they can be passed as arguments to other functions, assigned to variables, and returned from functions.
To pass a function as an argument, you define a parameter with the function's signature (e.g. `func(int) string` is the signature of a function which takes an integer argument and returns a string) and pass either a named function or an anonymous function at the call site.

For example, a higher-order function can accept a function argument to perform custom logic:

```go
package main

import (
	"fmt"
	"math"
)

// isTriangle takes a function that accepts two ints and returns a float64
func isTriangle(a, b, c int, dist func(int, int) float64) bool {
	// invoke the function by name
	return dist(a, b)+dist(b, c) >= dist(a, c)
}

func l2Norm(a, b int) float64 {
	return math.Abs(float64(a) - float64(b))
}

func main() {
	// Pass a named function
	p := isTriangle(3, 4, 5, l2Norm)

	// Pass an anonymous function
	q := isTriangle(3, 4, 5,
		func(a, b int) float64 {
			return float64((a - b) * (a - b))
		})

	fmt.Printf("p = %v\n", p)
	fmt.Printf("q = %v\n", q)
}
```

This pattern is commonly used for callbacks, sorting (passing a comparison function), and functional programming techniques like mapping or filtering.
