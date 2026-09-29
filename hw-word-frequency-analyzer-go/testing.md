# Testing

## Testing functions that expect a filename

You can use `os.WriteFile` to create file that contains text data for passing to functions that expect a filename argument.

```go
data := []byte("Hello, Gophers!")
err := os.WriteFile("example.txt", data, 0644)
if err != nil {
    log.Fatal(err)
}

actual := openFileAndDoTheThing("example.txt")
```

## Testing functions that expect an `io.Reader`

You can use `strings.NewReader` to create a reader that contains text data for passing to functions that expect an `io.Reader` argument.

```go
reader := strings.NewReader("Hello, Gophers!")

actual := readAndDoTheThing(reader)
```

Since `*os.File` satisfies the `io.Reader` interface, you can also pass a file pointer to a function that expects an `io.Reader`.

```go
file, err := os.Open("example.txt")
if err != nil {
    log.Fatal(err)
}
defer file.Close()

actual := readAndDoTheThing(file)
```