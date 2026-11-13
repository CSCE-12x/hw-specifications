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

You must implement the following functions and methods exactly:

#### Constructor

```go
// Create and return an empty graph.
func NewGraph() *Graph
```

#### Getters

Access information about the graph.

```go
// Determine whether the graph contains a location (vertex).
func (g *Graph) HasLocation(name string) bool

// Determine whether the graph contains a path between two locations (edge).
func (g *Graph) HasPath(from, to string) bool

// Determine the distance/length of the path between two locations (edge weight).
// The locations must have a direct path (single edge) between them.
func (g *Graph) GetDistance(from, to string) int
```

#### Add a Location

```go
// Add a location to the graph.
func (g *Graph) AddLocation(name string) error
```

Rules:
* Location names must not be empty.
* A duplicate location should return an error.
* Leading and trailing whitespace should not be considered part of the name.
* Location names are case-sensitive.

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
* A duplicate path between the same two locations should return an error.
* A location may not have a path to itself.

#### Find a Shortest Path

```go
// Find a shortest path between two locations.
func (g *Graph) ShortestPath(from, to string) ([]string, int, error)
```

Return values:
* The path as a slice of location names,
* The total distance,
* An error if no valid route exists.

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
* The `Path` field of the `RouteResult` struct should contain at least two elements: the original query locations
* This function may be implemented concurrently using goroutines.

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
* Commands words are case-insensitive.
* Lines beginning with `#` are comments and should be ignored.
* Blank lines should be ignored.
* Command lines are order-insensitive.
  - Process locations first, then paths, then queries.
* `LOCATION name` adds a location.
  - Location names do not contain spaces.
* `PATH from to distance` adds a path between two locations.
  - Path distances are positive integers.
* `QUERY from to` requests a shortest path.

### Output Format

For each query, your program must print either a route or an error message.
A single route or error message ends with a newline character.
When there are multiple queries, print a blank line between each route or error message.

#### Successful Query

For a successful query, print:

```text
Route from START to END:
PATH
Distance: DISTANCE
```

Where `PATH` is the sequence of locations separated by `->`.

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

Your program should not panic on bad input.

For invalid or malformed commands, print a message to standard output: `invalid command: "COMMAND"` and continue processing commands.

### Testing

You must write tests that cover at least 90% of the statements in your program.

## Submission

You are required to submit:
* `go.mod`
* `navigation_system.go`
* `navigation_system_test.go`

You may also submit other files.
You should use `package main` in `navigation_system.go`.
You should put `func main()` in `navigation_system.go`.
