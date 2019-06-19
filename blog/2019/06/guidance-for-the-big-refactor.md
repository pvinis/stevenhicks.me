---
title: Guidance For THE BIG REFACTOR
date: 2019-06-19T12:00:00
tags: post
layout: blog
snippet: Most refactoring resources are about specific actions in your code. This article aims to provide more general guidance for undergoing THE BIG REFACTOR.
tagline: Most refactoring resources are about specific actions in your code. This article aims to provide more general guidance for undergoing THE BIG REFACTOR.
---

Most refactoring resources are about specific actions you can take in your code. Extract method, Remove middle-man, ...the kinds of actions that are well-documented at [refactoring.com/catalog/](https://refactoring.com/catalog/). Missing is more general guidance for undergoing **THE BIG REFACTOR**. You know the one. The one you're dreading, but you know you'll need to eventually do. The one you have ideas for but can't figure out how to start. The one that will in the end pay off large amounts of technical debt, but will cost you large amounts of brain cycles along the way.

I'm currently in the middle of one of these. I feel a bit like I'm in the weeds right now, struggling to find open air. So, yeah - this article is as much for me as it is for you. But my situation prompted me to take a step back, and start thinking meta. As I struggle through my own **BIG REFACTOR**, and think about the things that have gone well or poorly, I offer this handful of suggestions to you - brave soul who is about to enter **THE BIG REFACTOR**.

## 1. Move things out of the way that don't belong

First things first, make yourself a clean workspace. There are functions that exist in the code you'll be tackling that shouldn't be there. Utilities that don't have anything to do with the current object. Objects that are _related_ to the code you're changing, but can live on their own. Move these things away from the problem - extract them to a method or object somewhere else.

## 2. Choose your replacement strategy

Will you...

- Modify the existing code-path? This requires you to complete before you can commit. Depending on how **BIG** this **BIG REFACTOR** is, this can be problematic and stressful.
- Create a second code-path side-by-side? Things can get out of sync this way. You'll need to look for changes to the original before merging, or enforce changes be made in both code-paths. This _does_ allow you to test side-by-side, which is nice.
- Incrementally introduce your new code, using [branch-by-abstraction](https://martinfowler.com/bliki/BranchByAbstraction.html)? I am adding this option to sound smart - I only learned about it while looking for some guidance today, and haven't figure out how to apply it in my current scenario. It sounds great, though!

I don't know what the right answer is, for me or for you. They all make sense, sometimes, and I don't have a good heuristic for identifying the right fit. I often regret the path I choose - I regret the path I initially chose for this **BIG REFACTOR**. I doubt you'd want to use my heuristic even if I had one.

Spend some time thinking about which of these paths best fits before you begin.

## 3. Cover the system with tests

Not just any tests, the _right_ tests. Not tests that test implementation of existing code - those will get deleted during your refactor, and won't tell you if you broke something.

The right tests are at a higher level than what you're replacing/rewriting, and which don't care about the implementation you're writing.

They might be integration tests. They might be UI tests (I'm totally digging [Cypress](https://cypress.io) for those right now). Possibly a controversial opinion on my part - they don't necessarily have to be _permanent_ tests - they can just be your guide for now, and you can delete them when you're done.

Cover _everything_ you'll be replacing with these tests. You'll use them along the way to test for regressions.

## 4. Focus on your health.

You will get swallowed up by the problem. Don't let it take away the things you know you need to be healthy and happy. Don't lose sleep, don't skip meals, don't skip exercise. Treat it like a marathon, not a sprint. Pace yourself. You're not going to power through **THE BIG REFACTOR**.

Take breaks. Let your mind wander and think about the problem on its own. Your brain will work on the problem without you forcing it to. It's called [incubation](<https://en.wikipedia.org/wiki/Incubation_(psychology)>).

## 5. Document everything.

Keep a NOTES.md file in your codebase, right next to your changes, so everyone can see it. Keep track of...

- Things you discover that you know you'll have to account for
- Things you think might help you solve problems along the way
- Issues you run into that you know you'll have to fix
- Ideas of things you want to change - make a backlog, don't work on them all at once

## 6. Commit & get feedback frequently.

Committing frequently is not so hard. Finish each phase of your **BIG REFACTOR** by committing the work and pushing it. This allows you to start each next phase with a clean slate; which makes it easier to revert when you get stuck in a corner or decide on a direction change.

Getting feedback frequently is harder, at least for me. I like for my work to be reasonably polished before I submit it for feedback. I'm trying to get better at this. As my coworker Chris told me today, he could have reassured me that I was on the right track with _half_ the work I'd done so far. My emotional state _definitely_ could have used that encouragement a day or two ago.

Feedback is especially hard with big problems, because you have the large problem space modeled in your head, and it's hard to share that with others. It can feel counterproductive to bring someone into your model - there's lots of explaining to do. Resist the temptation to drive forward on your own, though. Getting feedback will help you make sure you're on the right path, and give you ideas along the way.

## 7. Take baby steps.

Know generally where you're headed, but think about how you can get there in as small of steps as possible. Apply small refactoring actions, and commit them frequently.

Address the biggest issues early if you can, or defer them if you aren't sure of the right abstraction for them. The right time will present itself for you to address them - don't force it.

## 8. Acknowledge that **THE BIG REFACTOR** is hard work.

Allow yourself to take time. Writing code that solves a new problem is easier than writing code that solves an old problem. When you're solving a new problem, you don't know very many edge cases, and you can approach with simpler abstractions. When you're solving an old problem, the edge cases are all known, and the right abstractions to cover them all take more thought and consideration.

## Good luck!

I hope your **BIG REFACTOR** treats you well! Or at least, you pay off some debt with minimal scars. Let me know how it goes, and [send me an email](mailto:steven.j.hicks@gmail.com) or [hit me up on Twitter](https://twitter.com/pepopowitz) if you have advice that I didn't cover!
