---
title: Saving Myself One Minute Per Day With Netlify Functions And A Custom Search Engine
date: 2020-02-06T12:00:00
tags: post
layout: blog
snippet: I built a URL expander with Netlify Functions, and connected my browser to it with a custom search engine. It saves about 1 minute per day and it was totally worth it.
tagline: I built a URL expander with Netlify Functions, and connected my browser to it with a custom search engine. It saves about 1 minute per day and it was totally worth it.
---

I visit the [artsy/reaction](https://github.com/artsy/reaction) repository in GitHub about 15 times a day. It's the repo I contribute most to at Artsy, and I spend a lot of time working with PRs there.

You might think I've bookmarked it, but I haven't. I don't really use bookmarks very much - I've become one of those people who just wants to type commands instead of looking for items in a UI list.

You also might think that I can easily find the URLs I visit frequently in my Chrome omnibar results. You're not wrong...I can find them pretty easily, most of the time. But there's often a lot of noise in those results, and it takes me a few seconds to find the one I'm looking for.

A few seconds! 15 times a day! Do I look like I live in a cave? Each one of those few seconds is a tiny papercut. What I'd _love_ to be able to do is open my browser, type some variation of "reaction," and magically end up at [github.com/artsy/reaction](https://github.com/artsy/reaction).

I accomplished this by adding a custom search engine to my browser, which will send a query to a function I have running on Netlify, which will interpret the text and redirect me somewhere. There are many ways I could have solved the problem - I even have several alternatives installed already - but this is the approach that fit best with my habits. If you're just interested in the code, it lives at [github.com/pepopowitz/goto](https://github.com/pepopowitz/goto).

## The Problem

Here's a gif of me entering `reaction` into Chrome:

![Me entering `reaction` into Chrome and having to scour half a dozen results to find the URL I want](./search-for-reaction-before.gif)

There's only about half a dozen results in the omnibox, but that's enough to confuse me. Some are general Google search terms - those are just noise to me. The others are all very similar - it's hard for me to pick out which one I'm looking for. I _know_ this is not that big of a deal but it just bothered me. So I fixed it.

## A URL Expander

My first attempt at building a link expander was to write an Express app that I could run locally. The code was not difficult to write, and it worked! Keeping it running locally was a challenge, though. I never figured out how to get it running at startup. It seemed complicated, and I wasn't too burdened by starting up the local server in a terminal....at first. Eventually I became tired of having to restart the local server. It was exacerbated by the wifi on my MacBook becoming less stable, a problem I have only been able to fix by rebooting a couple times a week.

It struck me that this would be a good opportunity to play with Netlify functions. I'm a massive Netlify fan, but haven't had a reason to take advantage of functions yet. I wanted to build a function that would take a query, and redirect recognized queries to a mapped URL and unrecognized queries to Google. The logic of the function seemed straightforward. Working with Netlify functions was new, but there are a lot of good tutorials and projects to reference.

I remembered reading [Phil Hawksworth's article on building a link shortener](https://medium.com/netlify/creating-your-own-url-shortener-with-netlify-forms-and-functions-a4286f55ea6c) so I started there. Unfortunately, this wasn't quite a match. In his example, you shorten a link by submitting it through a form, and a corresponding redirect gets added to a file. The redirects themselves are statically declared. I wanted my redirects to be evaluated dynamically. There are a lot of URLs I visit within github.com, and I didn't want to have to add a new one every time I started working on a different project. 

I 

## Custom Search Engines

You might not know this feature is there, but you can add custom search engines to your browser. In fact, your browser has probably added a bunch for you already. I use Chrome, so this is what my custom search engines look like in my settings:

TODO: image of custom search engines

I sure didn't add all those. I think Chrome adds them for you when you visit a site that features the ability to search.

At any rate, we can add one of these ourselves. 
