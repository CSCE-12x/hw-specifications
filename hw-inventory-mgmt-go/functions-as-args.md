# Functions as Arguments

In Go, functions are first-class citizens, meaning they can be passed as arguments to other functions, assigned to variables, and returned from functions.  To pass a function as an argument, you define a parameter with the function's signature (e.g. `func(int) string`) and pass either a named function or an anonymous function at the call site.

For example, a higher-order function can accept a callback to perform custom logic:

```go
package main

import "fmt"

// greet takes a function that accepts a string and returns nothing
func greet(callback func(string), name string) {
    callback(name)
}

func sayHello(name string) {
    fmt.Printf("Hello, %s!\n", name)
}

func main() {
    // Pass a named function
    greet(sayHello, "Alice")

    // Pass an anonymous function
    greet(func(name string) {
        fmt.Printf("Hi, %s!\n", name)
    }, "Bob")
}
```

This pattern is commonly used for callbacks, sorting (passing a comparison function), and functional programming techniques like mapping or filtering.
