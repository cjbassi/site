---
title: Comparing Interactive Unix Shells
draft: true
---

For writing scripts, I'm quite content using Bash for shell scripting and Python for more complex and general scripts. However, finding a good shell for interactive usage still feels like an unsolved problem, with a growing number of shells being written as replacements for the default Bash and Zsh shells which are showing their age. The alternative shells that are on my radar and I'd like to compare include:

1. [fish]
2. [xonsh]
3. [Ion]
4. [Elvish]
5. [Nu]

To start, Bash and Zsh aren't great interactive shells for a number of reasons, largely due to their age and focus on portability and stability, rather than on ease of use and a friendly interactive UI. While you can create a nice looking and friendly shell out of either, each has its own limitations, baggage, and each requires a lot of effort to configure due to their lack of sane defaults.

Instead, I propose the following standards that should define a good interactive shell:

1. Reasonably fast and responsive
2. Includes useful interactive features out of the box and has sane configuration defaults while remaining highly configurable
3. A shell language with more friendly syntax than Bash and POSIX, while keeping the familiar and sane parts
4. The shell language supports modern programming language features and isn't just a DSL

If we rank Bash and Zsh according to these rules:

1. Both are responsive enough
2. Both have little out of the box support for useful interactive features, both have very poor configuration defaults, but both are mostly configurable
3. Both have familiar but very poor syntax
4. Both languages lack a lot of modern features: no named parameters, lacking data structures like native sets, no type hints, no slicing, etc

So overall, both do quite poorly as interactive shells.

## fish

[fish], the "friendly interactive shell", is the most popular alternative interactive shell, and is indeed very friendly. First and foremost, it provides a solid out of the box experience with things like syntax highlighting auto autosuggestions, and it can be customized through a built in browser based GUI settings menu. fish is my current shell, and has been great. The syntax is pretty good and fixes most of my gripes with Bash syntax. Completion is also great with auto man page parsing to generate CLI flags. One feature I love that is not available in Bash or Zsh is that completions for a given command are exposed through the `complete` command. The output of this can be passed to `fzf` which allows fuzzy finding through the list of possible completions at any time on the CLI thus making tab completion obsolete.

A few issues with fish:

1. Lack of configurability since apparently [Configurability is the root of all evil](https://fishshell.com/docs/current/design.html). For example, there is no setting to enable dotfiles being globbed: [#1568](https://github.com/fish-shell/fish-shell/issues/1568).
2. Some language features have been unnecessarily changed, for example arrays start at 1, `$UID` is not set by default, brackets have been replaced with the `end` keyword, etc.
3. Missing some modern language features like named function parameters, optional type hints, etc.

On top of that, my experience with fish has been very buggy: it frequently freezes up and/or consumes a whole CPU core until killed and the history frequently gets erased.

## xonsh

[xonsh] is an interesting shell because it's written in and syntactically very similar to Python. 

## Ion

[Ion] is a modern shell written in and inspired by Rust focusing on providing a very modern shell language. It includes named function arguments, optional typing, string and array slicing, Rust style `match` statements, and more. It also includes handy builtin functions for manipulating strings and arrays like `extension` for getting the extension of a path, and `join` for joining an array into a string. Ion is still a WIP so we'll have to keep an eye on it in the future.

## Elvish

[Elvish] is a "friendly interactive shell and an expressive programming language" written in Go. From first glance, it seems like it's a bit of a WIP, but still ready for usage. Some of the things that look great already are the syntax, its intention to be a fully featured programming language, support for structured data pipelines, and its intention to be usable out of the box. It includes *a lot* of out of the box features that aren't seen in other shells, like a builtin file manager inspired by Ranger, a builtin package manager for plugins, and an interactive terminal UI for searching directory and command history. Unfortunately, I'm not a fan of all the builtin features included by default, especially since other programs do them better, like Ranger for file managing, and fzf for searching through command and directory history.

## Nu

[Nu] is a *new* shell written in Rust with a focus on structured data pipelines and is inspired by PowerShell. The shell language is very convenient for piping and manipulating data, where instead of having to chop up and manipulate text streams with tools like `cut`, `awk`, etc, you can simply operate on data in SQL like syntax. However, the focus does seem to be less on interactive usage, where typing `ls` presents an unwieldy table which is better served by an `ls` replacement like `exa`. I'm curious to see how Nu develops, and if interactive features will become a focus.

## Conclusion

Overall, there's a lot of interesting and unique shells for interactive use, but there still doesn't seem to be one shell that checks all the boxes. I still plan on using fish, but in the future I'd like something that has the out of the box experience of fish, with more configurability, better syntax, and more modern language features. And of course, it should be written in Rust. I'm also undecided about whether structured data would be a useful thing to build into the shell by default, so I plan to keep an eye on shells with that feature as they develop.

[fish]: https://github.com/fish-shell/fish-shell
[xonsh]: https://github.com/xonsh/xonsh
[Ion]: https://github.com/redox-os/ion
[Elvish]: https://github.com/elves/elvish
[Nu]: https://github.com/nushell/nushell
