# HW: Maze Solver

Implement a maze representation and a recursive depth-first search maze solver.

## Maze format

Mazes are rectangular and contain exactly one start and at least one exit. A maze may have multiple exits. Solvable mazes admit at least one path from the start to an exit. Not all mazes are solvable. Input is not guaranteed to be valid.
Coordinates are zero-based with the origin (0, 0) in the top-left corner.

### Example

```text
###############################
S       #       #       #     #
####### ### ### ##### # ### # #
#     # #   #   #   # #   # # #
### # # # ### ### # # ### ### #
#   # # # #   #   # # # # #   #
# ##### # # ### ### # # # # # #
# #     # #     # #   #   # # #
# # ##### ####### ##### ### # #
#   #         #       #   # # #
# ### ####### ### # # ### # ###
#   #     # #     # #     #   #
### ### # # ##### ##### ### # #
#       #   #       #         E
###############################
```

### Example (solved)

```text
###############################
S*******#       #       #     #
#######*### ### ##### # ### # #
#     #*#   #   #   # #   # # #
### # #*# ### ### # # ### ### #
#   # #*# #   #   # # # # #   #
# #####*# # ### ### # # # # # #
# #*****# #     # #   #   # # #
# #*##### ####### ##### ### # #
#***#*********#  *****#   # # #
#*###*#######*###*# #*### # ###
#***#***  # #*****# #***  #   #
###*###*# # ##### #####*### # #
#  *****#   #       #  *******E
###############################
```

### Maze symbols

| Symbol | Meaning |
| --- | --- |
| `#` | Wall |
| Space | Open cell |
| `S` | Start |
| `E` | Exit |
| `*` | Cell on the visible solution path |

## Requirements

### Structs and Methods

```go
type Maze struct {
	Grid [][]byte
	Rows int
	Cols int
  // you may add additional fields
}

func NewMaze(lines []string) *Maze
func (m *Maze) Start() (int, int)
func (m *Maze) IsOpen(row, col int) bool
func (m *Maze) Solve(startRow, startCol int) bool
func (m *Maze) String() string
// you may add additional methods and helper functions
```

#### `NewMaze`

- Convert the input rows into the maze grid and set the dimensions accordingly.
  - Every space in a row represents a cell and row whitespace must be preserved.
- Return `nil` if the input is invalid.
  - For example, empty input is invalid.
  - Finding other examples of malformed input is intentionally left as an exercise for the student to practice computational thinking.

#### `Start`

- Return two values: the row and column index of the start of the maze

#### `IsOpen`

- Return `true` for open cells, start, and exit.
- Return `false` for all other cells or coordinates outside the maze.
- Handle a `nil` maze receiver by returning `false`.

#### `Solve`

- Search from the supplied starting coordinates for a path to any exit.
  - The starting coordinates do not have to be the start of the maze.
- Recursion is a learning objective, so `Solve` must use recursion.
  - One option is to use depth-first search and backtracking.
- Return `true` if a path to any exit exists.
- Return `false` if no path to an exit exists or the start coordinates are out of bounds or point to a wall or blocked cell.
- A successful solve must leave a visible path from the starting coordinates to an exit marked with `*`. Do not change the original maze start, exit, or any wall cells.

#### `String`

- Return a string representation of the maze as rows joined with newlines.
- Return an empty string for a `nil` maze.


### Testing

You must write tests that cover at least 90% of the statements in your program.

Coverage is worth 30 points and your score can be negative (a penalty). Coverage is scored as follows, where *x* is the measured coverage in percentage:

| Coverage | Score |
| --- | --- |
| 0 &le; *x* &lt; 90 | (*x* - 90)/3 |
| *x* &ge; 90 | 30 |

To be clear: less than 90% coverage results in a penalty. The jump from approximately 0 points just below 90% coverage to 30 points at 90% coverage is intentional.

The remaining 70 points come from instructor tests.

## Submission

Use `package main`.
Submit only these files to Gradescope:

* `maze.go`
* `maze_test.go`
