---
title: Saving Myself One Minute Per Day With Netlify Functions And A Custom Search Engine
date: 2020-03-04T12:00:00
tags: post
layout: blog
snippet: I built a URL expander with Netlify functions, and connected my browser to it with a custom search engine. It saves about 1 minute per day and now it feels like my search bar is a CLI.
tagline: I built a URL expander with Netlify functions, and connected my browser to it with a custom search engine. It saves about 1 minute per day and now it feels like my search bar is a CLI.
---

I visit the [artsy/reaction](https://github.com/artsy/reaction) repository in GitHub about 15 times a day. It's the repo I most contribute to at Artsy, and I spend a lot of time working with PRs there.

You might think I've bookmarked it in my browser, but I haven't. I don't really use bookmarks very much - I've become one of those people who wants to type commands instead of looking for items in a UI list.

You also might think that I can easily find the URLs I frequently visit in my Chrome omnibar results. You're not totally wrong...the result I'm looking for when I type `reaction` is usually in the dropdown. But there's often a lot of noise in those results, and it takes me a few seconds to find the one I'm looking for.

Here, take a look:

<img class="square-corners" src="../search-for-reaction-before.gif" alt="Me entering `reaction` into Chrome and having to scour half a dozen results to find the URL I want" />

There's only about half a dozen results in the omnibox, but that's enough to confuse me. Some are general Google search terms - those are especially noisy. The others are all very similar and it's hard for me to pick out which one I'm looking for. I _know_ this is not that big of a deal but it just bothered me.

It takes me a few seconds each time! 15 times a day! Do I look like I live in a cave? Each one of those few seconds is a tiny paper-cut. What I'd _love_ to be able to do is open my browser, type some variation of `reaction`, and magically end up at [github.com/artsy/reaction](https://github.com/artsy/reaction).

You could solve this problem many ways, but I chose JavaScript. I **always** choose JavaScript. JavaScript and I are like super best friends. In this case, I added a custom search engine to my browser...to send a query to a function I have running on Netlify...to interpret the text and redirect me somewhere. I already have several alternatives installed that could have solved the problem (including [Alfred](https://www.alfredapp.com/)) - but my approach fit best with my habits. If you're interested in just seeing the code, it lives at [github.com/pepopowitz/goto](https://github.com/pepopowitz/goto).

## Adding A Custom Search Engine

You might not know this feature is there, but you can add custom search engines to your browser. Custom search engines enable you to search a specific URL by typing a specific word or phrase into your search bar, followed by the query.

In fact, your browser has probably added a bunch for you already. I use Chrome and this is what my custom search engines look like in my settings:

<img class="square-corners" src="../custom-search-engines.jpg" alt="Custom Search Engines in Chrome" />

I didn't add any of those. I suspect Chrome added them for me whenever I visited a page that took a search argument in the URL.

At any rate, we can add one of these ourselves. It's not a complicated entry form. You specify a name, a shortcut (which you'll enter into your search bar when you want to use the custom search engine), and a URL pattern that will include your query. Here's the search engine I entered for my problem:

<img class="square-corners" src="../goto-search-engine.jpg" alt="GOTO search engine in Chrome" />

I chose the shortcut `goto`. Now when I type `goto` into my search bar, Chrome will forward the text that follows to my custom URL.

## Building A URL Expander To Respond To The Custom Search Engine Requests

Now that I've got an entry point into my custom function, I needed to process a query. Effectively, I want a URL expander that that takes a code and redirects you to a URL.

My first attempt at building a URL expander was to write an Express app that I could run locally. The code was not difficult to write, and it worked! Keeping it running locally was a challenge, though. I figured there was a way to automate startup, but it seemed complicated, and I wasn't really excited to figure it out. In the meantime, every time I rebooted I opened a terminal and started the server. This wasn't a burden....at first. But then I had a week where my MacBook couldn't maintain a wifi connection, and I had to reboot at least once a day. Restarting my Express app became a burden and I started thinking about ways to keep my link expander always running.

From my personal website, I know that I can create a [`_redirects.md` file](https://github.com/pepopowitz/stevenhicks.me/blob/master/_redirects) in any Netlify-hosted project and [Netlify will handle redirects for me](https://docs.netlify.com/routing/redirects/). This is how I handle "link shortening" for slides when I give talks. But it's a static map of URLs, and I wanted something a little smarter.

I remembered reading [Phil Hawksworth's article on building a link shortener](https://medium.com/netlify/creating-your-own-url-shortener-with-netlify-forms-and-functions-a4286f55ea6c) so I looked at that. Unfortunately, this wasn't quite a match. In Phil's example, you shorten a link by submitting it through a form, and a corresponding redirect gets committed to a file. The redirects themselves are still statically defined.

I wanted my redirects to be evaluated _dynamically_. There are a lot of URLs I visit within github.com, and I didn't want to have to add a new rule every time I started working on a different project. If I suddenly start working on the [Artsy iOS app](https://github.com/artsy/eigen), I don't want to have to update my redirects. I want my link expander to understand that I'm requesting a different Artsy repository and just redirect me there.

It struck me that this would be a good opportunity to play with Netlify functions. I'm a massive Netlify fan, but haven't had a reason to take advantage of functions yet. I wanted a function that would take a query and redirect recognized queries to a mapped URL and unrecognized queries to Google. The logic of the function seemed straightforward.

## Netlify Functions

[Netlify functions](https://docs.netlify.com/functions/overview) are an abstraction around AWS Lambda functions. They're self-contained serverless functions that you include in the source of your Netlify-hosted site. Netlify takes care of a whole bunch of AWS infrastructural nonsense that you don't want to deal with. When Netlify deploys your site, it also deploys your Netlify functions to AWS, and makes them accessible at a path on your site. When you want to run a function, you request the endpoint that Netlify deployed for you.

[The Netlify docs](https://docs.netlify.com/functions/build-with-javascript/) do a great job of describing how to write a Netlify function in JavaScript. Kent C. Dodds also wrote [a really great walkthrough of setting up your first Netlify function](https://kentcdodds.com/blog/super-simple-start-to-serverless).

## Implementing A URL Expander In A Netlify Function

A crude implementation of a URL expander might look like this:

```javascript
exports.handler = function(event, _context, callback) {
  const query = event.queryStringParameters.query;
  let redirectUrl = 'https://google.com?q=' + query;
  if (query.toUpperCase() === 'REACTION') {
    redirectUrl = 'https://github.com/artsy/reaction';
  }

  callback(null, {
    statusCode: 302,
    headers: {
      Location: redirectUrl,
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify({}),
  });
};
```

The interface to this function is [described in the AWS docs](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html). Here's a line-by-line recap of this implementation.

```javascript
exports.handler = function(event, _context, callback) {
```

In the line above, we're exporting a function named `handler`. It must be named `handler`, or AWS won't know how to run it.

There are three arguments into our handler: `event`, `context`, and `callback`. `event` gives us access to information about the request. `context` gives us access to the execution environment in AWS. `callback` is how we send a response from our function.

```javascript
const query = event.queryStringParameters.query;
```

In this line, we access the search term from the query string parameters on the `event` argument.

```javascript
let redirectUrl = 'https://google.com?q=' + query;
if (query.toUpperCase() === 'REACTION') {
  redirectUrl = 'https://github.com/artsy/reaction';
}
```

This is the first bit of code that is unique to our implementation. We'll default our `redirectUrl` to a google search for the term. If it's something we recognize, we'll override the `redirectUrl`.

```javascript
callback(null, {
  statusCode: 302,
  headers: {
    Location: redirectUrl,
    'Cache-Control': 'no-cache',
  },
  body: JSON.stringify({}),
});
```

We're back to some Lambda paperwork. We call the `callback` function that is passed into our function. The first argument is for an error, which we don't have, so we're passing `null`.

The second argument is an object describing our response. In our case that includes a `statusCode` of `302`, which means the page has moved temporarily. I'm scared of using the `301` status, for permanent redirects, in a tool that I'm actively developing. Maybe I'm being silly.

We're specifying a couple headers, including the `Location` to redirect to.

Finally, there is an empty `body`. Even though the contents are empty, this property is required - otherwise you'll get an `Incorrect function response body` error.

## A Better URL Expander In A Netlify Function

The previous example shows the gist of how we'll translate search terms into URLs, but it isn't very future-proof. Every time we need to translate a new term, we'd need to update the function. This sounds super not fun.

The implementation I ended up with lives at [https://github.com/pepopowitz/goto](https://github.com/pepopowitz/goto/blob/master/functions/goto/goto.js). The code is interesting (and recursive so I'm expecting a stack overflow any minute 😅), but the most exciting thing to me is the way I'm able to manage rules with a single JSON object:

```javascript
exports.urlMap = {
  staging: 'https://staging.artsy.net',
  prod: 'https://artsy.net',
  // ...
  gh: {
    '': 'https://github.com',
    '*': 'https://github.com/artsy/{0}',
    '**': 'https://github.com/artsy/{0}/{1}',
    prs: 'https://github.com/notifications/beta',
    me: {
      '': 'https://github.com/pepopowitz',
      '*': `https://github.com/pepopowitz/{0}`,
      '**': 'https://github.com/pepopowitz/{0}/{1}',
    },
    // ...
```

Explaining all of these rules could be its own blog post, but here's a high level overview:

- The keys of any object indicate a search term. In other words, `production` will take me to the Artsy production site.
- Nested objects indicate sequential search terms. Example: `gh prs` goes to the new GitHub notifications view (which is 🔥).
- Rules with `*` in them are wildcards. Words that follow the search term are used as arguments to format the URL. For example, `gh reaction pulls` will go to `https://github.com/artsy/reaction/pulls`.

The best part about these rules is that I don't need to change them when I need to start working on a new Artsy project. The second best part is that it's a single file that contains all the rules. The third best part is that since Netlify deploys this function, I can change my rules by pulling up the file on GitHub, editing it in the browser, and committing the changes. It's magical.

## The Result

This is what it looks like when I want to visit the Artsy `reaction` repository today:

<img class="square-corners" src="../search-for-reaction-after.gif" alt="Me entering `gh reaction` into Chrome and going directly to the repo I'm looking for" />

That's 15 fewer paper-cuts per day! Now I can spend them somewhere else.

## What's Next?

`goto` is pretty stable for my needs right now. I'm mostly just adding static rules at this point. I might add a secret search term that lists out all known search terms, for when I forget about older rules.

But what's next could be something more. It might be completely unrelated to expanding URLs. This project illustrated to me that I've found a powerful combination. Point a custom search engine at a Netlify function that can interpret commands, and you have all the power of a CLI right in your browser.
