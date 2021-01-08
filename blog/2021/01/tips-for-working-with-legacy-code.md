---
title: Tips For Working With Legacy Code, Courtesy Of My New Kitchen Faucet
date: 2021-01-07T12:00:00
tags: post
layout: blog
snippet: I recently replaced my kitchen faucet. The project reminded me of working with legacy code.
tagline: I recently replaced my kitchen faucet. The project reminded me of working with legacy code.
---

This holiday break I replaced our kitchen faucet. The neck was loose and it wiggled, and there was a little bit of water starting to pool at the base. It wasn't leaking yet but it seemed like it might start leaking soon. There's probably a gasket or something I could have replaced but the faucet wasn't great and I had the time off of work. I figured now would be a good time to replace it.

We own an old<sup>[(1)](#footnote-1)</sup> home. The main drawback of owning an old home is that every project takes five times longer than you expect it to. Anything that's hidden behind walls is made of old materials and it was introduced when building codes were far less safe. As you start opening things up during a project you find solutions from long ago, many of which are terrifying to work with. Like this electrical box containing 10 old wires with crumbling insulation that killed another of my holiday break projects:

![An absolute mess of an electrical box containing 10 wires with crumbling insulation](../nightmare-electrical-box.jpg)

My kitchen faucet project had all the makings of a classic old-home project. The instructions for installing the new faucet were very well-written and easy to follow! But my kitchen is old. Who would win — the new faucet or the old home?

The old home won. As things went wrong, I noticed parallels between my faucet installation project and working with legacy code. I've distilled the experience into a handful of tips.

## Tip 1: Reframe "legacy code"

There doesn't seem to be a canonical definition of "legacy code", but it seems software engineers use the term to mean "code that I inherited that I must support." This definition isn't itself negative, but it has very negative connotations for most engineers. Since the code is inherited, it probably doesn't follow the patterns or style the new owner would like to see. It probably doesn't have enough test coverage to thoroughly describe its intentions or prevent regressions. There's likely technical debt that has been accrued over its lifetime. All of these factors make it difficult to change. But we _need_ to change it, because it's still in production, and we still need to support it.

Much of what I've described above is purely factual, but our cognitive biases and past experiences with legacy code apply a layer of emotional distortion. [The fundamental attribution error][fundamental-attribution-error] convinces us that the existing code wasn't well-factored or well-conceived by the original author. The [hindsight bias][hindsight-bias] convinces us that it could have been written much more simply and clearly. We remember the last time we had to support legacy code and how we broke production while trying to make a single small change. We start thinking it would be much easier to rewrite this code from scratch than to support it.

As I began my faucet project, I noticed similar feelings. The last time I'd tried to do a simple project in this house I found that mess of wiring, closed the box up, and called an electrician. How could the previous owners have been so careless with electricity? They must have had a death wish, I thought.

I started thinking about how if this were a software project, I'd want to rewrite the entire kitchen. Correction — I'd rewrite the entire _house_. The wiring is confusing and nasty all over, not just the kitchen. New construction would be **so much easier** to work with.

But I know "the big rewrite" is a trap in software. The hindsight bias and overuse of the phrase "technical debt" discredit the learning and the journey that went into creating legacy code. They overlook all of the features that are working well. If "the big software rewrite" were like building a new house from scratch, you'd move into a house with a beautiful kitchen and overall layout...but cardboard boxes for furniture, bathrooms with buckets for toilets, and nowhere to park your car.

This thought gave me a lot of appreciation for my old home. I don't want to do a big rewrite on it. The neighborhood is amazing. The house is the perfect size for us. We just finished our basement. Sure, the electrical is terrifying in most of the house and the main bathroom is peach, but just like existing software, it's **a legacy**. There's too much good stuff here to throw it all away and start over. Incremental improvement is the way to go — just like with a legacy software project.

### Tip 1A: Dealing with integration problems **is the job**

In [a talk that I love to give about getting unstuck][getting-unstuck], I encourage software developers to reframe our understanding of getting stuck on difficult problems. Getting stuck isn't something that prevents you from doing your job as a software engineer; it _**is**_ the job of a software engineer. We get stuck and have the persistence to get unstuck. That's problem solving. We're good at it, and that's why we get paid to do this job.

This perspective ran through my mind as I thought about the things that typically go wrong with a home improvement project. I've always considered problems with old plumbing or electrical to be a nuisance. Steps that I shouldn't need to take. A distraction from the _actual_ home improvement project. But I was wrong — integration with the existing plumbing/electrical/construction _**is**_ the home improvement project.

It's similar to working with legacy code. When you introduce new code, you'll always face the challenge of integrating it with the existing system. Somehow you need to make a seam for your changes. Once your changes are introduced you need to verify they don't negatively affect the existing system. These aren't merely tasks that _impede you_ from supporting legacy code...these tasks _are_ the legacy code support.

## Tip 2: Identify incremental improvement opportunities by de-risking

So now we've all gained appreciation for the existing system, and we're in agreement that the best way to make changes is through incremental improvement. Where do we start? How do we know _which parts_ of the system to improve first?

Often the system will present the answer to you. Is there a subsystem that's flaky and needs to be reset often? A section of code that breaks every time you try to make a small change? Is there a service that was written by a departed teammate in a language that no current engineers feel confident supporting? Start there.

This is de-risking. You can't predict exactly when a line of code will fail, but you _can_ predict which services or subsystems are likely to fail sooner rather than later. Identify them and improve them before they get a chance to fail.

With my kitchen sink, I'd been noticing water pooling at the base of the neck for a couple weeks. It was nothing catastrophic, but it was an indication of a weakness. It may not be failing now, but it would likely fail soon.

## Tip 3: _You_ own the code

The first integration problem I ran into with my kitchen faucet was that the window sill behind the faucet extends as a shelf, and it was in the way:

![A kitchen faucet unable to be installed, due to a shelf obstructing it.](../shelf-in-the-way.jpg)

When we picked out a new faucet, I never considered that the faucet currently installed was probably deliberately chosen because of its short height. This allowed them to install it below the shelf. We chose a taller replacement faucet though, and the shelf prevented us from installing it.

My initial instinct was to return the faucet and find a shorter one. My partner suggested I cut a notch into the shelf. I resisted and thought "but this shelf is part of the house." She convinced me pretty quickly. It took us a while to pick out this faucet and we both really liked it, and this is _our_ house, so we can do whatever we want with the shelf. We're planning on renovating the kitchen in the next few years, and it's very unlikely the shelf will survive that remodel. We could survive a few years with a notch in a shelf, especially if it means we enjoy the feature we use the most in our house.

So I cut a notch in the shelf with a reciprocating saw:

![The kitchen faucet in place, with a notch cut into the shelf to make space.](../notch.jpg)

As I painted the new edges, I thought about how this was classic Steve — amplifying the importance of an _existing_ feature at the expense of a new feature. I do this when I'm working with code. If code is already there and it's working well, I have an intense aversion to modifying it. I avoid refactoring anything that I don't _need_ to change. This is extremely noticeable when I'm working with teammates who refactor freely. I get feelings of anxiety and discomfort as they make more changes than I would, and I get visions of a late night fixing an outage caused by a change that didn't need to be made.

My aversion to refactoring sometimes leads to a feeling of _borrowing_ code — like the codebase isn't mine, it's the previous owner's, and I'm temporarily passing through. But like the flimsy shelf above my faucet, it's helpful to remind myself that **I own this code**. If there is code that doesn't look right, **I can change it**, because it's mine, and I'm the one supporting it.

## Tip 4: Perfect is the enemy of done

My aversion to unnecessary refactoring has one major benefit: it prevents me from blowing a project into something much larger. When modifying a legacy codebase you regularly face decisions about how far to pull a loose thread.

There were several points in my faucet project where I caught myself in this kind of decision point. From the start, I wasn't sure if I'd be content with replacing only the faucet. It'd be nice to have a new sink too...but it wasn't as critical as the faucet. The entire kitchen needs a remodel...but that would be **way** too much work for a holiday project. The connectors on the faucet supply lines didn't fit the valves coming out of the wall, and I could have replaced the valves with something more modern...but that would have meant doing real actual plumbing. Even the window sill/shelf could have become a bigger project if I'd decided to remove it entirely.

Somewhere in between refactoring nothing and refactoring everything is a sweet spot for navigating these types of decision points. Practice helps you find that sweet spot. [Time-boxing][time-boxing] or [the Pomodoro technique][pomodoro] can be helpful for preventing yourself from pulling a refactoring thread too far. Being transparent and detailed in standup about the changes you're making makes it hard for you to go days with a vague update of "I'm still refactoring." Working with your team lead or product owner to prioritize the exact bits that _need_ to change will help you avoid nebulous tasks with no end in sight.

And sometimes it comes down to showing self-restraint and acceptance that something is "good enough". It's okay to ship code that you wouldn't show in an interview. It's okay to not refactor the next code down the call stack. If you need it, I grant you permission to not solve _all_ the problems today.

Oh, and here's my new kitchen faucet:

![A shiny new kitchen faucet installed in an old kitchen.](../finished-installation.jpg)

---

<a name="footnote-1"></a>
<sup>1</sup> as a resident of the Milwaukee area working for a company based in New York, I've discovered that "old home" is a very relative term, depending on where you live. My home was built in the 1930s — around here, that's pretty old. It's certainly not pre-revolutionary...but it's old enough to make home improvement difficult.

[fundamental-attribution-error]: https://en.wikipedia.org/wiki/Fundamental_attribution_error
[hindsight-bias]: https://en.wikipedia.org/wiki/Hindsight_bias
[getting-unstuck]: https://www.youtube.com/watch?v=3XscuivvUzI
[time-boxing]: https://en.wikipedia.org/wiki/Timeboxing
[pomodoro]: https://en.wikipedia.org/wiki/Pomodoro_Technique
