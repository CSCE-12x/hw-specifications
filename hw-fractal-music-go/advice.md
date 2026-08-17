# Advice for Fractal Music Composer

## Decomposition

Here is a first pass at the initial decomposition:

1. The program should read a fractal music program as input, parse and run that program to produce a sequence of musical events, and write the ABC notation of those events as output.
2. Useful interfaces and types are:
  * `Program` represents a fractal music program
    - encapsulate header information and motifs
  * `Event` represents a musical event
    - represent playing a note or taking a rest
3. Functions and methods:
   * `Program`
     - evaluate to produce a sequence of events
   * `Event`
     - express in ABC notation

You might decompose the problem differently.
From here, you would further decompose the problem, looking for other types, interfaces, and methods that would be useful, or modifying existing types to fit your evolving understanding of the problem and program design.

An important thing to remember is that part of the objective of programming assignments is for you, the student, to do the work of program design, which includes activities like problem analysis and decomposition.
For that reason, we have left this assignment relatively wide open in the middle so that students will have maximum opportunity to take chances, make mistakes, and get messy &mdash; to learn!


## Milestones

*Breaking a project into milestones is a form of decomposition.*

The particular set of milestones and their order depends on how you decompose the problem and design a solution.
These milestones are some that we think you should meet regardless of which direction you take to solve to problem, i.e. every solution should include these.

1. ABC note output
   1. Parse notes and rests into an intermediate representation (IR)
      - The input will include commands like `note F#5 3/2`
      - `F#5` is the pitch
      - `3/2` is the duration
   1. Convert IR to ABC notation
      - The IR for `note F#5 3/2` should become the ABC notation `^f3/2`
      - The IR for `rest 1` should become the ABC notation `z`
1. Transposition
   - Shift a note's pitch up or down by some number of semitones
     - `note C4 1` transposed by +1 is `note C#4 1`
     - `note C4 1` transposed by -1 is `note B3 1`
1. Time scaling
   - Multiply a note's duration by some fraction
     - `note C4 1/2` scaled by 1/2 `note C4 1/4`
     - `note C4 1/2` scaled by 2 is `note C4 1`
1. Render nonrecursive motifs
   - Produce a sequence of events from a motif that contains only `note` and `rest` commands
1. Render simple recursive motifs
   - Produce a sequence of events from a motif that includes a `call` command
1. Render complex recursive motifs
   - multiple `call` commands
     - mutual recursion between 2+ motifs
   - `call` commands with `transpose`
   - `call` commands with `time`
   - `call` commands with both `transpose` and `time`
1. Parse and run an entire program
   1. Headers
   2. Produce event list
   3. Emit ABC notation

## Rendering Recursive Motifs

So as not to spoil your fun in doing this assignment on your own, let us consider an example of rendering recursive motifs in another, similar domain: [L-systems](https://en.wikipedia.org/wiki/L-system).

Lindenmayer's original L-system for modelling the growth of algae was (simplified):

* **axiom** : `A`
* **rules** : (`A` &rarr; `AB`), (`B` &rarr; `A`)

which produces:

* n = 0 : `A`
* n = 1 : `AB`
* n = 2 : `ABA`
* n = 3 : `ABAAB`
* n = 4 : `ABAABABA`

At each step, according to the rules, every `A` becomes `AB` and every `B` becomes `A`:

```txt
        A        n=0: axiom (start)
       / \
      A   B      n=1: A -> AB by rule 1
     /|   |
    A B   A      n=2: A -> AB by rule 1 and B -> A by rule 2
   /| |   |\
  A B A   A B    n=3: Every A becomes AB and every B becomes A
 /| | |\  |\ \
A B A A B A B A  n=4: And so on...
```

We could represent these rules in a `map` where the key/left side is a variable and the value/right side is what that variable becomes:

```go
algae: map[string]string{
   "A": "AB",
   "B": "A",
}
```

If we want to render this L-system to a depth of 4, we might use:

```go
Render(algae, "A", 4)
```

And the `Render` method could be defined as:

```go
// Recursively render the product of starting with the named rule and stopping at the given depth.
func Render(rules map[string]string, name string, depth int) string {
   // if we have reached the bottom, just "emit" the key/left/name of the rule
   if depth == 0 {
      return name
   }

   // else, expand the value/right side and recursively render each element
   //       and concatenate the results
   // e.g. render rule A (A -> AB) at depth k
   //      -> (render rule A at depth k-1)(render rule B at depth k-1)
   var s string
   rhs := rules[name]
   for _, r := range rhs {
      s += Render(rules, string(r), depth-1)
   }
   return s
}
```

In our fractal music language, Lindenmeyer's algae L-system can be expressed as:

```txt
motif rule_A
base
    note A 1
recur
    call rule_A
    call rule_B
end

motif rule_B
base
    note B 1
recur
    call rule_A
end
```

With `start rule_A 4`, the resulting sequence of notes should be exactly `A B A A B A B A`.
Don't take my word for it, verify this yourself (by hand)!
