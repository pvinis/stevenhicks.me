---
title: VS Code Can't Handle Large Folders
date: 2019-05-31T12:00:00
tags: post
layout: blog
snippet: My MacBook had a rough day today, with out-of-control CPU usage. I learned that VS Code can't handle large folders.
tagline: My MacBook had a rough day today, with out-of-control CPU usage. I learned that VS Code can't handle large folders.
draft: true
---

## TL;DR

There is a setting in VS Code named `files.watcherExclude`. If you're experiencing high CPU issues from VS Code, it _might_ be because you have a very large folder open, and VS Code is having trouble watching everything in it.

If this is the case, you can add a pattern to the `files.watcherExclude` setting to disable watching for specific patterns.

![](2019-05-31-15-32-33.png)

![](2019-05-31-16-01-14.png)

![](2019-05-31-16-18-25.png)

```
/Users/stevenhicks/!(_src)*/**
/Users/stevenhicks/.*/**
```

links

original issue:

https://github.com/Microsoft/vscode/issues/51757

https://github.com/Microsoft/vscode/wiki/Performance-Issues#visual-studio-code-is-consuming-a-lot-of-cpu

https://github.com/microsoft/vscode/issues/3998

globs:

https://unix.stackexchange.com/questions/164025/exclude-one-pattern-from-glob-match
