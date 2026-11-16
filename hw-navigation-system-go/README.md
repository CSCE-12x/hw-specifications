# HW: Navigation System

Build a navigation system. Your program will read a description of locations and paths, then answer route queries by finding the shortest path between two locations.

## Requirements

### Scenario

The university wants a program to help students find walking routes between campus buildings.

The campus consists of:
* locations, such as `Library`, `Gym`, `DiningHall`
* walking paths connecting pairs of locations
  - each path has a positive integer distance

Given a start and destination, the program should find a shortest route and report the total distance.

### Required Public Types

You must define the following types exactly:

```go
type RouteQuery struct {
	From string
	To   string
}
```

```go
type RouteResult struct {
	Path     []string
	Distance int
	Error    error
}
```

```go
type Graph struct {
	// TODO(student): choose the fields
}
```

The fields inside `Graph` are up to you because you may choose how to represent and store the adjacency information.

### Required Public Functions and Methods

You must implement the following functions and methods exactly.
All public methods except getters should trim leading and trailing whitespace from location-name arguments before validating or using them.
Names that are empty after trimming are invalid.

#### Constructor

```go
// Create and return an empty graph.
func NewGraph() *Graph
```

Each call to `NewGraph` must return a new, independent graph.

#### Getters

Access information about the graph.
Do not trim whitespace from location names in these methods.

```go
// Determine whether the graph contains a location (vertex).
// Returns true if the graph has the location.
func (g *Graph) HasLocation(name string) bool

// Determine whether the graph contains a path between two locations (edge).
// Returns true if the graph has an edge between the two locations.
func (g *Graph) HasPath(from, to string) bool

// Determine the distance/length of the path between two locations (edge weight).
// Returns the positive distance of a direct path (single edge).
// Returns -1 otherwise.
func (g *Graph) GetDistance(from, to string) int
```

#### Add a Location

```go
// Add a location to the graph.
func (g *Graph) AddLocation(name string) error
```

Rules:
* Location name must not be empty.
* A duplicate location must return an error.
* Location names are case-sensitive.
* If `AddLocation` returns an error, the graph must remain unchanged.

#### Add a Path

```go
// Add an undirected walking path between two locations.
func (g *Graph) AddPath(from, to string, distance int) error
```

Rules:
* Both locations must already exist.
* Distance must be positive.
* Paths are undirected.
  - If there is a path from `Library` to `Gym`, there is also a path from `Gym` to `Library`.
* A duplicate path between the same two locations must return an error.
* A location may not have a path to itself.
* If `AddPath` returns an error, the graph must remain unchanged.

#### Find a Shortest Path

```go
// Find a shortest path between two locations.
func (g *Graph) ShortestPath(from, to string) RouteResult
```

Return value:
* On success:
  * `Path` contains the complete route.
  * `Distance` contains the route's total distance.
  * `Error` is `nil`.
* On any failure, including an unknown location or no connecting route:
  * `Path` is `nil`.
  * `Distance` is `-1`.
  * `Error` is non-nil.

Rules:
* Both locations must exist.
* If `from` and `to` are the same location, the path is just that location and the distance is `0`.
* If no route exists, return an error.
* The graph must not be modified by this method.
* If multiple shortest paths have the same distance, your function may return any of them.

#### Batch Shortest Path Finding

```go
// Compute routes for multiple queries
func (g *Graph) ShortestPaths(queries []RouteQuery) []RouteResult
```

Notes:
* The returned slice must have the same length as the input slice.
* The result for `queries[i]` must appear at `results[i]`.
* `ShortestPaths` must not reorder the input slice or modify any `RouteQuery` value stored in it.
* Your implementation must comfortably handle graphs with at least 100 locations, 100 paths, and 1,000 route queries.
  - Do not enumerate every possible route.
* This function *may* be implemented concurrently using goroutines.
  - Use of concurrency is encouraged, but optional.

#### Main for Testing

```go
// Enable automated testing using dependency injection for input
// and output capture for output
func Main(reader io.Reader, writer io.Writer)
```

`Main` should sequence the top-level input, processing, and output steps.
Therefore, your `main` function (the program entry point) should just be:

```go
func main() {
    Main(os.Stdin, os.Stdout)
}
```

### Input Format

Each non-empty line contains one command.

Supported commands are:

```text
LOCATION name
PATH from to distance
QUERY from to
```

Rules:
* Trim leading and trailing whitespace from lines before processing
* Command words are case-insensitive.
* Command lines are order-insensitive.
  - Process locations first, then paths, then queries.
  - Within each command category, process commands in their original input order.
* `LOCATION name` adds a location.
  - Location names do not contain spaces.
* `PATH from to distance` adds a path between two locations.
  - Path distances are positive integers.
* `QUERY from to` requests a shortest path.
* Command fields are separated by whitespace.
* Lines beginning with `#` are comments and should be ignored.
  - Inline comments are not supported.
* Blank lines should be ignored.


### Output Format

For each query, your program must print a query result.
A single query result ends with a newline character.
When there are multiple queries, print a blank line between each result.

A syntactically valid `QUERY` always produces a query-result block.
If either location is unknown or no connecting route exists, the query should fail.

#### Successful Query

For a successful query, print:

```text
Route from START to END:
PATH
Distance: DISTANCE
```

Where `PATH` is the sequence of locations separated by `" -> "`.

#### Failed Query

For a failed query, print

```text
Route from START to END:
No route found
```

#### Example Input and Output

Input:

```text
# Campus map
LOCATION Library
LOCATION DiningHall
LOCATION Gym
LOCATION Dorm

PATH Library DiningHall 5
PATH DiningHall Gym 7
PATH Library Gym 15
PATH Dorm Library 4

QUERY Library Gym
QUERY Dorm Gym
QUERY Gym Gym
```

Output:

```text
Route from Library to Gym:
Library -> DiningHall -> Gym
Distance: 12

Route from Dorm to Gym:
Dorm -> Library -> DiningHall -> Gym
Distance: 16

Route from Gym to Gym:
Gym
Distance: 0
```

### Error Handling

Your program must not panic on bad input.

Unless explicitly stated otherwise, tests will check whether or not an error is `nil`, not its exact message.

#### Invalid Commands

A command is invalid if (any of):
* its command word is unknown
* it has the wrong number of fields
* a field cannot be parsed as the required type
* executing it would violate an `AddLocation` or `AddPath` rule

For invalid commands, print `invalid command: "COMMAND"`, where `COMMAND` is the entire original line (trimmed of whitespace), and then continue processing commands.
Every invalid command produces exactly one `invalid command` line.
Invalid-command lines do not receive surrounding blank lines and do not affect query-result separation.

Print structurally malformed-command diagnostics during parsing, in their original relative order.
Then process locations, paths, and queries in that order.
Print semantic location and path diagnostics during their respective phases, preserving original relative order within each category.
Consequently, diagnostic order is:

1. structural diagnostics
2. location diagnostics
3. path diagnostics
4. query results

### Testing

You must write tests that cover at least 90% of the statements in your program.

Run your tests with `go test -cover -race` to measure coverage and check for race conditions (if you use concurrency).

## Submission

You are required to submit:
* `go.mod`
* `navigation_system.go`
* `navigation_system_test.go`

You may also submit other files.
You should use `package main` and put `func main()` in `navigation_system.go`.
