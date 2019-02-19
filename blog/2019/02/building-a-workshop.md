---
title: Building A Workshop
date: 2019-02-19T12:00:00
tags: post
layout: blog
snippet: I recently built some workshops. It was a lot of work, but it was fun and I learned some things!
tagline: I recently built some workshops. It was a lot of work, but it was fun and I learned some things!
---

Presenting a 45-minute session at a meetup or conference is really fun. I've never thought that was enough time to do more than inspire people to research the topic. In 2018, I decided I wanted to get more out of speaking. I wanted to feel like I was _teaching_ people, in addition to inspiring them.

So I started leading workshops. I [led a half-day workshop at Music City Tech](https://twitter.com/MusicCityTech/status/1002264602422456331) on writing Test-Driven JavaScript, and then [a full-day workshop at Dev Up](https://twitter.com/pepopowitz/status/1049406551994306560) called "Building Your First React App". In early 2019 I [led my React workshop again at CodeMash](https://twitter.com/anaccidentaldev/status/1082665637229531141).

I've definitely walked away from these first few feeling like I'm teaching and making a difference. If workshops are something you've considered, I encourage you to give them a shot. I _think_ most conferences get significantly less submissions for workshops than talks, so it is easier to get started.

If that's you, then you might be interested in some things I've learned about building workshops in the past year!

## It takes a lot of time

A half-day workshop probably took me about 50 hours to put together; a full-day workshop took about 100 hours.

That's a lot of time! Before it scares you off, you should know these things for context:

- It takes me about 40 hours of work to put together a one-hour talk. I obsess over the flow of a talk, I add drawings, and I script (effectively) every talk I write. This is more time than most people put into a talk. So 50/100 hours is likely on the high side of what it would take you to build a workshop.

- I have a very specific balance of talking-to-hands-on that I strive for. I don't like to talk for more than 20 minutes before people get their hands on their keyboard for 20 minutes. I think this forces me to put more time into thinking about how exercises can build from each other, and how I can break exercises down into smaller pieces.

## Think a lot about what kind of workshop you want

The answer to this question probably has a big effect on how much time it takes to build your workshop. I've seen a few different styles of workshop, each with advantages and disadvantages.

### The self-driven workshop

Some workshop leaders say a few words at the beginning, then let people dig in on their own for the rest of the 4 hours. I call this a "self-driven workshop."

The self-driven workshop is a favorite of attendees who want to work on their own time. They don't really need the leader there, so they can take the exercises home with them.

On the other hand, this strategy gives learners more opportunity to distribute skill-wise. Fast learners will finish everything within an hour; slow learners will take more. Many learners will even leave when they realize it's completely self-driven, knowing they can work on it at their convenience.

My preference is to engage with learners early and often - so I stay away from the self-driven workshop. If you batch your exercises small, you see less of a gap between the fast and slow learners. You might end up with a range of 10 to 20 minutes with small exercises, compared to 1 hour to 3.5 hours for a self-driven workshop. This is more likely to keep everyone engaged for the entire session, and it gives me more opportunities to interact with people.

### The lecture

Some workshop leaders can fill all 4 hours with instruction. They are deep experts in their field, and have tons of knowledge to share.

I am not this level of expert. I also don't think 4 hours of lecture is engaging for an audience. Human attention span is short. You get maybe 20 minutes before people start to check out.

At a workshop, people have their laptops in front of them. If you give them an opportunity to check out, they will take it, and you will struggle to get them back. This doesn't mean they'll sit there and play minesweeper for the next 3 hours. It means they'll spend 20 minutes on Twitter, then decide "this sucks, I'm not getting anything out of it", then walk out to another session.

It isn't only 100% talking that makes for a boring workshop. Even if you split your workshop into 1 hour talking then 3 hours of hands-on, that first hour is an opportunity for people to check out before you even get to the exercises. At the very least, I'd consider breaking this balance into [30 minutes talking, 1:30 exercises, :30 talking, 1:30 exercises]. Even better would be 15 minutes talking/45 minutes exercise repeated 4 times.

### The interactive workshop

No surprise I'm sure, but this is definitely my preferred style of workshop. I strive for about 15 minutes of talking, then about 20-30 minutes of exercises of some sort.

Variety of exercise is also important in this style of workshop. Repetitive exercises can get boring. My favorite workshops that I've attended have used a variety of styles of exercise. A mix of hands-on coding, looking at code, pairing, just talking about things,… In my React workshop, I have learners draw components on handouts with a pen.

Running an interactive workshop requires strict time-boxing, to make sure you're covering all the things you want to cover. It is really easy to run over time on exercises. You're an expert in your field, and your audience is full of beginners - every exercise you write will take them longer than you think.

This is okay, they're learning! You just need to be okay with cutting an exercise short when you know time is up.

## Get people talking to each other within the first 20 minutes

If you're interested in leading a lecture or self-driven workshop, this is probably not necessary.

Agile coaches/speakers are especially great at making this happen. Even if it's a simple "meet your neighbor", getting people talking early sets the tone of keeping people interactive and engaged.

In my workshops, I've mostly only tried the "meet your neighbor". I required pairing for one exercise in my Test-Driven workshop, but it didn't go great. It seems like a lot of people have resistance to pairing. I have a deep love for pairing. I think if done well it can be career-changing, so I still want to share that experience with people.

I'll back off on the pairing _requirement_ in the future, and make it _optional but encouraged_. I also could better support pairing by taking time up front to say “if you want to pair, raise your hand right now…and find each other.” It would require people moving seats, but it might work.

## Written instructions are really helpful

It is **incredibly** helpful to give your audience detailed instructions for exercises. Anything less will leave them lost and confused. Don't assume anything is understood that you haven't already explained. Provide links to resources for things that you didn't explain. The more details you give them, the fewer questions you'll have to answer.

It's even helpful to include basic information that you _did_ cover in your lecture/instruction. Some people might not have understood it when you were speaking. Others might do better with reading than listening.

Even the exercises where laptops aren't used should have written instructions. Once your learners are conditioned to look at your written instructions for each exercise, they will look there even when there aren't any.

### Post the instructions in a public location

This isn't a requirement, but attendees are really appreciative when they can (a) finish the exercises on their own, and (b) share them with their coworkers. I put all of mine [in a GitHub repository](https://github.com/pepopowitz/your-first-react-app-exercises).

## Enable people to jump into later exercises easily

Very few people will complete every exercise in a workshop, from start to finish. Some might join your session halfway through. Some might get stuck on an exercise, and since [you're strictly time-boxing](#the-interactive-workshop), they might not have time to finish it.

To account for this, build your exercises in a way that someone can jump into a later one without having finished everything before it. This will help them focus on the current exercise, and it will free you up from solving issues from 3 exercises ago.

I accomplished this [in my React workshop](https://github.com/pepopowitz/your-first-react-app-exercises) by having each exercise start with the "completed" state of the previous. I have a separate folder for each exercise, and all the code for all exercises is readily available. I give them the starting point for each exercise, and a folder containing the completed state in case they get stuck.

I've also seen people accomplish this with git branches, commits, or tags.

## Finding the right difficulty level is...difficult

It's important to me to have a difficulty level that (a) isn't too hard for brand new beginners, but (b) doesn't bore the advanced learners. This is a really hard balance to find.

The way I first approached it, with my TDD workshop, was to try to make the exercises _so long_ that no one would ever finish. I thought this would keep the advanced learners interested, without the beginners having to worry about how far they got.

This approach definitely appeased the advanced learners, but it had a damaging effect on the beginners. They became stressed out that they were never able to finish. Several people commented on how far behind they felt after my workshop. This felt awful - I **never** want to make beginners feel that way.

With that knowledge in hand, I did a better job of planning exercises in my React workshop. I aimed for activities that would take _me_ about 5 minutes to complete. Because I have significantly more experience in the topic, this ends up being **plenty** of work for the advanced learners without overwhelming the beginners. Just in case an advanced student finished work quickly, I threw in a link to an interesting related article and/or a vague "bonus" exercise that could keep them busy.

You will get a wide range of experience levels in your workshop. It’s up to you to decide what you want to do with those people. Do you want to teach to the least experienced person in the room, at the risk of someone more advanced walking out? Are you more interested in keeping the advanced students happy at the risk of frustrating the beginners? I aim for the middle, and expect to lose a few people on either end.

## Be flexible with time

### Give people breaks

I knew going into my first workshop that I needed to account for breaks. _No one_ can sit for 4 hours, no matter how funny my dumb jokes are. I scheduled one break into my Test-Driven workshop, about halfway through.

We didn't get anywhere near halfway before we needed it. I could see the lack of focus in their eyes. We took our break earlier than expected, and then a second a little over an hour later. My schedule was a little messed up, but we recovered.

Now I factor in two breaks per 4 hour session, about ten minutes for each break. I don't schedule them, though. I find it more effective to gauge the temperature of the room when we've been sitting for an hour. I start looking ahead at my schedule (which is conveniently broken down into 15-20 minute chunks), to figure out when our next break will fit in.

### Let them choose the last topics

It's hard to stick to an exact schedule for a workshop. Embrace this by over-planning topics. Plan out a couple more than needed to fill the session, but let your group choose which topics they're most interested in at the end. They'll appreciate having control over the curriculum, they'll get more out of your session, and you'll feel like you've tailored your course for them.

## Watch out for logical leaps

I'm still learning this lesson.

It's easy, as an expert in your topic, to make logical leaps. In my React workshop, we talk about `setState` for managing component state. The next logical concept to me is application-level state. But there is a big difference between managing component state and managing application state. It took me months of experience to understand the nuances and differences between the two.

It's hard to boil that experience down into 15 minutes of lecture. It's a big leap for someone who just learned about component state to understand _what_ application state is, _how_ it's different from component state, _why_ it matters, and _OMG this doesn't look anything like component state_.

It is definitely your responsibility to figure out how to guide them through these leaps. But it's also easy to underestimate the size of those leaps. Err on the side of caution. Always assume the leap is bigger than you think it is, and never assume they'll be able to make the leap without a lot of assistance from you.

I look back at this tweet often, as a reminder of how slowly I should be transitioning through concepts while teaching:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Sometimes I read things on edutwitter from someone who thinks they have discovered something amazing, which often sounds profoundy, thinky, or researchy, and I sigh and reflect on how music educators have known said thing for years. In evidence I give you Mrs Curwen, 1886: <a href="https://t.co/fvPgXVJUL9">pic.twitter.com/fvPgXVJUL9</a></p>&mdash; Martin Fautley (@DrFautley) <a href="https://twitter.com/DrFautley/status/1024227769004306432?ref_src=twsrc%5Etfw">July 31, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Focus on the learners

It feels nice to have a room of people looking to you for guidance. Just remember that the workshop is not about you, or your ego, or all the things that you know - it's about the awesome people who came to learn from you. Do everything in your power to make learning easier for them.
