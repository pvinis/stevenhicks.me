---
title: Working With Variables In Cypress Tests
date: 2020-02-18T12:00:00
tags: post
layout: blog
snippet: I'd read that working with variables in Cypress tests was tricky, but I dismissed it as an edge case I didn't need to know about. Then I needed to store a variable in a test and hilarity ensued.
tagline: I'd read that working with variables in Cypress tests was tricky, but I dismissed it as an edge case I didn't need to know about. Then I needed to store a variable in a test and hilarity ensued.
---

[Cypress](https://cypress.io) is a great tool for writing automated tests against your web app. It can make end-to-end tests a lot less scary for a JavaScript developer like me. One of the most impressive things to me is how excited developers are to write Cypress tests. It says a lot about a tool when people are practically falling over each other to introduce it into their codebase.

Cypress has [several self-acknowledged limitations](https://docs.cypress.io/guides/references/trade-offs.html). When I first learned of Cypress, I read that [working with variables was significantly more difficult than most of the JavaScript I've written](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html). I initially dismissed this as an edge case that I didn't need to worry about. And I was correct for my first handful of tests!

And then I wasn't correct anymore. I wanted to write a test that did three things:

1. View a list of articles
2. Click on the first article
3. Request a separate API endpoint for that article to get more information

I'll refer to this test as `myExtractedURLParamTest` in the rest of this article.

I couldn't hard-code the API URL, because the ID might be different every time the test ran. I knew I had access to the URL in my Cypress test, so I thought I'd grab that when I viewed the article page, extract the ID, and then make a request to the API based on the extracted ID. This is when I learned that working with variables in a Cypress test is not intuitive.

## Why is it hard to work with variables in Cypress?

The Cypress docs include [a lengthy writeup on how to work with variables](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html), including this short paragraph on why traditional `const`/`let`/`var` assignments don't work as expected:

> You cannot assign or work with the return values of any Cypress command. **Commands are enqueued and run asynchronously.**

The emphasis is my own. When you write a Cypress test, it feels like each command is a statement that's executing immediately, but that's not the case. [Each command you write in a Cypress test is added to a queue of commands](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Commands-Are-Asynchronous), each of which will be executed in order _asynchronously_ when the test runs. Your test is effectively a script for Cypress to play back at a later date. This asynchronous nature of commands enables one of Cypress's greatest features: automatic waiting for each command.

But it also means you can't return values from one command and use that value in the next command. [That lengthy Cypress help doc](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html) comes in handy to understand how to work with variables, but there are several concepts on that page and others that we'll tie together to write `myExtractedURLParamTest`.

## Extracting the URL parameter

Cypress gives us access to the current URL through the [`.location()` command](https://docs.cypress.io/api/commands/location.html#Syntax). In our `myExtractedURLParamTest` test, when we're visiting the first article page, `.location()` might return something like `http://localhost:1234/articles/5678` where `5678` is the article ID. We don't really care about the origin (`http://localhost:1234`), and we can specify only the portion of the location that we're interested in, in this case the `pathname`:

```javascript
cy.location('pathname'); // /articles/5678
```

Note that a series of commands starts by accessing the `cy` global variable.

## Extracting the article ID

The pathname includes information we don't need: the prefix `/articles/` is not part of the article ID. What I'd _like_ to do is take the result of the pathname, [`.split() it`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) based on slashes, and take the last fragment.

My initial instinct for this test was to write something like this:

```javascript
// this is tempting but it will not work.
const articleID = cy.location('pathname').split('/')[2];
```

But this doesn't work. Remember how all Cypress commands are asynchronous? In JavaScript, asynchrony is handled with [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Cypress commands [are a specific implementation of promises](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Commands-Are-Promises). We can't `.split("/")` the result of `cy.location("pathname")`, because the return value isn't a string - it's a Cypress version of a promise!

If you're familiar with promises, you might predict the proper way to split the pathname - by chaining the `.location()` call to [`.then()`](https://docs.cypress.io/api/commands/then.html#Syntax), and working with the result of the `.location()` promise. Like this:

```javascript
cy.location('pathname').then(path => {
  // path is the value from the previous command, `location("pathname").
  //   In our example, the value of `path` is "/articles/5678".
  const articleID = path.split('/')[2];
});
```

_**Update:** [Gleb from Cypress](https://dev.to/bahmutov) pointed out in a comment on dev.to that I could use the `.invoke()` and `.its()` commands to simplify this code. [Take a look at his suggestions!](https://dev.to/bahmutov/comment/ll1o)_

## Storing the article ID for future use

Cool, now we've got the ID of the article. We aren't going to use it right away, so we want to store it somewhere that our test can access it later. Cypress provides a feature named ["aliases"](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Aliases) for storing variables for future use. Specifically, we'll use the [`.as()` command](https://docs.cypress.io/api/commands/as.html#Syntax) to alias a value.

The challenge in our test is that `.as()`, like all commands, can only be called from a Cypress chain. Remember that Cypress chains start with accessing the `cy` global object, then chaining any commands onto it. We need to get our `articleID` into this sequence of commands somehow:

```javascript
cy.????.as("articleID")
```

Cypress provides a command named [`.wrap()`](https://docs.cypress.io/api/commands/wrap.html#Syntax) to accomplish this. `.wrap()` takes a value and yields it as the result of a command, which can then be chained to any other Cypress commands. Our example test will look like this:

```javascript
cy.location('pathname').then(path => {
  const articleID = path.split('/')[2];
  cy.wrap(articleID).as('articleID');
});
```

Once the `.as('articleID')` command runs, we'll have access to our article ID from any command later in the test, aliased as `articleID`.

## Accessing the aliased article ID

Aliased values can be accessed using another command: [`.get()`](https://docs.cypress.io/api/commands/get.html#Syntax). When retrieving values with named aliases, as in our situation, we specify the name with an `@` prefix, like this:

```javascript
cy.get('@articleID');
```

We'll chain another `.then()` command to work with the result of the call to `.get()`:

```javascript
cy.get('@articleID').then(articleID => {
  // do stuff with the articleID
});
```

For `myExtractedURLParamTest`, we'd build up a new URL in that function body, and call `cy.request()` to hit our API, like this:

```javascript
cy.get('@articleID').then(articleID => {
  cy.request(`/api/articles/${articleID}`).then(response => {
    expect(response.status).to.eq(200);
    // And any other assertions we want to make with our API response
  });
});
```

## Tying it all together

The final test looks like this:

```javascript
it('myExtractedURLParamTest', () => {
  // Visit the articles list and click on the first link
  cy.visit('/articles');
  cy.get('[data-cy=article]').click();

  // Wait until we're on an article page
  cy.location('pathname').should('match', /^\/articles\/.*$/);

  // Extract the article ID from the URL and alias it
  cy.location('pathname').then(path => {
    // path = "/articles/234234234"
    const articleID = path.split('/')[2];
    cy.wrap(articleID).as('articleID');
  });

  // Access the article ID from the alias
  cy.get('@articleID').then(articleID => {
    // do stuff with the articleID
    cy.request(`/api/articles/${articleID}`).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq(
        'A stolen $15,000 wooden monkey was returned to a Danish art museum?'
      );
    });
  });
});
```

In the end, we used the following Cypress commands to string this all together:

- The [`.location()` command](https://docs.cypress.io/api/commands/location.html#Syntax) to access the current URL
- The [`.then()` command](https://docs.cypress.io/api/commands/then.html#Syntax) to work with the result of the previous command
- The [`.wrap()` command](https://docs.cypress.io/api/commands/wrap.html#Syntax) to yield a known value from a new command
- The [`.as()` command](https://docs.cypress.io/api/commands/as.html#Syntax) to alias a value and store it for other commands to use
- The [`.get()` command](https://docs.cypress.io/api/commands/get.html#Syntax) to access an aliased value

It's a little more roundabout than most of the JavaScript I've written in my life. The asynchronous nature of Cypress commands changes the way we pass information between them, but the features are all there for us to write robust tests.

## Update

[Gleb from Cypress](https://dev.to/bahmutov) [pointed out in a comment on dev.to](https://dev.to/bahmutov/comment/ll1o) that I could simplify the step where we extract the ID from the URL and alias it. Instead of this:

```javascript
cy.location('pathname').then(path => {
  const articleID = path.split('/')[2];
  cy.wrap(articleID).as('articleID');
});
```

...we can take advantage of two more commands built into Cypress. The [`.invoke()` command](https://docs.cypress.io/api/commands/invoke.html#Syntax) will invoke a function on the result of the previous command, and the [`.its()` command](https://docs.cypress.io/api/commands/its.html#Syntax) will access a property on the result of the previous command. The simplified code looks like this:

```javascript
cy.location('pathname')
  .invoke('split', '/')
  .its(2)
  .as('articleID');
```

Much more readable. Thanks, Gleb!
