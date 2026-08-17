# HW: Fractal Music Composer

Write a program that reads a text file written in a small recursive music-description language and produces music in ABC notation.
The fractal music language lets composers define short musical motifs recursively, where each recursive occurrence may be transformed through transposition and time scaling.

## Requirements

Your program should build and run like this:

```sh
go build -o fmusic

./fmusic example.fm > example.abc
```

If `example.fm` contains

```txt
title Example
meter 4/4
unit 1/4
tempo 180
key C
start example 2

motif example
base
    note C4 1/4
    note E4 3/4
    rest 1
    note G4 2
recur
    call example time 1/2
    call example transpose 7 time 2
end
```

Then `example.abc` should contain:

```txt
X:1
T:Example
M:4/4
L:1/4
Q:1/4=180
K:C
C/16 E3/16 z/4 G/2 d/4 ^f3/4 z a2 G/4 B3/4 z d2 d ^f3 z4 a8
```

### The Fractal Music Programming Language

#### Headers

A fractal music file begins with metadata:

```txt
title Example
meter 4/4
unit 1/4
tempo 180
key C
start example 2
```

| header | meaning |
| ------ | ------- |
| `title Example` | ABC title, output as `T:Example` |
| `meter 4/4` | ABC meter, output as `M:4/4` |
| `unit 1/4` | ABC base note length, output as `L:1/4` |
| `tempo 180` | ABC tempo, output as `Q:1/4=180` |
| `key C` | ABC key, output as `K:C` |
| `start example 2` | entry point: render motif `example` at recursion depth 2 |

THe metadata should always be in that order.

#### Motifs

A fractal music file has one or more motifs.
A motif has the form:

```txt
motif name
base
    commands...
recur
    commands...
end
```

The keywords are: `motif`, `base`, `recur`, and `end`.
The keyword `motif` marks the start of a motif and is followed by the name of the motif.
The `base` section contains commands to execute at recursion depth 0.
The `recur` section contains commands to execute at recursion depths &gt; 0.
The keyword `end` marks the end of the motif.

The name of a motif can be any string that does not contain spaces.

Commands are given one-per-line.
The commands are:
* `note <pitch> <duration>`
  - e.g. `note C4 1`
* `rest <duration>`
  - e.g. `rest 1/2`
* `call <name> [transpose <n>] [time <f>]`
  - e.g. `call brass-monkey`
  - e.g. `call sabotage time 1/2`
  - e.g. `call time-to-get-ill transpose 12`
  - e.g. `call intergalactic transpose 12 time 1/2`
  - A call always renders the target motif at one lower recursion depth


### ABC Music Notation

[ABC notation](abcnotation.com) is a text-based music notation system.
We will only use a small subset of it for this assignment.

An abc file consists of one or more tune transcriptions.
In this assignment, we will only have one tune per file.
An abc tune consists of a tune header and a tune body.

#### Tune Header

The tune header is composed of several information field lines:

```abc
X:1
T:Twinkle Little Star
M:4/4
L:1/4
Q:1/4=120
K:C
```

| field | name | notes |
| ----- | ---- | ----- |
| `X` | reference number | must be first, value not significant |
| `T` | title | must be second |
| `M` | meter | necessary for accurate playback |
| `L` | unit note length | necessary for accurate playback |
| `Q` | tempo | necessary for accurate playback |
| `K` | key | must be last |

ABC has [many more information fields](https://abcnotation.com/wiki/abc:standard:v2.1#information_fields), but these are all we need.


#### Tune Body

The tune body contains the music code:

(anything after a `%` is a comment)

```abc
% twinkle twinkle little star
C C G G A A G2
F F E E D D C2
G G F F E E D2
G G F F E E D2
C C G G A A G2
F F E E D D C2
```

Notes have pitch and duration:

```abc
C    % C4
^D   % D#4
E2   % E4 with a duration of 2 units
F/4  % F4 with a duration of 0.25 units
G3/2 % G4 with a duration of 1.5 units
c    % C5 (one octave above C4)
c'   % C6 (two octaves above C4)
C,   % C3 (one octave below C4)
z    % rest
```

There is [a lot of expressiveness possible in the tune body](https://abcnotation.com/wiki/abc:standard:v2.1#the_tune_body), but we will only use pitch, accidentals (and only sharp), note lengths, and rests (and only `z`).


### Advice

A very good &mdash; some may say the *best* &mdash; place to start is to do these three things:

1. Identify the behaviors of the program, i.e. what does it do?
2. Identify and define useful interfaces and types that represent the important concepts in the problem, i.e. what are the things that do the behaviors?
3. Define functions and methods that describe what those concepts can do, i.e. what are the actions that result in the behaviors?

And then do them again with those lower-level behaviors that you just identified.
That's right: it's **recursive decomposition**.

[Additional advice](advice.md) is available.


### Testing

You must write tests that cover at least 90% of the statements in your program.

#### Listen to your music

To listen to your music, use one of the [abc software packages](https://abcnotation.com/software).
I have used these web-based tools and found them acceptable:

* [abc player and editor](https://abc.rectanglered.com/)
* [abc notation editor](https://0x0bee.com/en-US/tools/abc-notation)
* [abcjs quick editor](https://editor.drawthedots.com/)


## Submission

Submit only `*.go` files.
You should have exactly one `main` function.
