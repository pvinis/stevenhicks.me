---
title: Generating Social Sharing Images In Eleventy
date: 2020-12-10T12:00:00
tags: post
layout: blog
snippet: Standing on the shoulders of giants makes it possible to generate social sharing images with very little code.
tagline: Standing on the shoulders of giants makes it possible to generate social sharing images with very little code.
---

Inspired by [Jason Lengstorf](https://twitter.com/jlengstorf), I added social sharing images to all my blog posts on this site. This means that when you share an article here to a place like Twitter, you'll get a nice big card like this:

![Example of sharing an article from this site on Twitter](../twitter-example.png)

Sweet! I can't get enough of those 70s shag carpet vibes.

## Prior art

Before I show you how _I_ hooked this up to my eleventy site, consider [this article by Stephanie Eckles about using puppeteer to generate social share images](https://dev.to/5t3ph/automated-social-sharing-images-with-puppeteer-11ty-and-netlify-22ln). If you want to use HTML & CSS to create your social sharing images, that is probably what you're looking for!

I decided on using [Cloudinary](https://cloudinary.com/) to overlay text on my social sharing images<sup>[(1)](#footnote-1)</sup>.

Most of what I needed was covered by Jason in his articles on [adding text overlays in Cloudinary](https://www.learnwithjason.dev/blog/add-text-overlay-cloudinary/), [designing a social sharing card](https://www.learnwithjason.dev/blog/design-social-sharing-card/), and [auto-generating social share images with `get-share-image`](https://www.learnwithjason.dev/blog/auto-generate-social-image/). Thanks, Jason!

Heads up that the most time-consuming part was tweaking the Cloudinary text overlays. Lots of fiddling with cryptic arguments. It's literally pushing pixels to get text in the right place.

## Emitting the image URLs in eleventy

Here's my addition to this problem space: [a PR that shows everything I needed to do to hook up the images in eleventy](https://github.com/pepopowitz/stevenhicks.me/pull/14)!

There's not a lot there, but let's walk through it.

### 1. Add the `get-share-image` dependency

You'll do this with `npm install @jlengstorf/get-share-image` or `yarn add @jlengstorf/get-share-image`. [I added it to my `devDependencies`](https://github.com/pepopowitz/stevenhicks.me/pull/14/files#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519R20) because I care about separating dev dependencies from runtime dependencies. Maybe you don't care — I'm not going to arm-wrestle you over it.

### 2. Add an eleventy computed data file

[Eleventy's computed data files](https://www.11ty.dev/docs/data-computed/) inject computed properties into a page template for each page they apply to. Like maybe you want to compute a social sharing image URL that's based on the article title!

I [added a file named `blog.11tydata.js` to the `blog/` folder](https://github.com/pepopowitz/stevenhicks.me/pull/14/files#diff-e45e8998b62ae0dac0f40e46f3db483cf93f3b027a20b4649e8988a78785b371). I chose to put it in the `blog/` folder because I only wanted to generate social images for my blog articles; it seemed silly to me to generate a social image for my about page that said "About". I'm not sure if the file name needs to start with `blog`, but that's what the docs did in their example (`posts/posts.11tydata.js`), so I just went with it.

The contents of `blog/blog.11tydata.js`:

```javascript
const getShareImage = require('@jlengstorf/get-share-image').default;

module.exports = {
  eleventyComputed: {
    shareImage: (data) => {
      return getShareImage({
        // settings for cloudinary overlays
      });
    },
  },
};
```

1. We pull in the `get-share-image` dependency.
2. We export an object with a property named `eleventyComputed`.
3. Each property of `eleventyComputed` is a computed property that becomes available in your page templates. In our case, we compute a property named `shareImage`. The value of it is the result of a call to `getShareImage` with a bunch of configuration for the Cloudinary overlay.

This `shareImage` property gets computed for each page within `blog/`, based on its metadata (that's what the `data` argument passed into the function represents).

The only dynamic data here for my site [was the `title` property that gets passed to `getShareImage`](https://github.com/pepopowitz/stevenhicks.me/pull/14/files#diff-e45e8998b62ae0dac0f40e46f3db483cf93f3b027a20b4649e8988a78785b371R20):

```javascript
module.exports = {
  eleventyComputed: {
    shareImage: (data) => {
      return getShareImage({
        // ...
        title: data.title,
        // ...
      });
    },
  },
};
```

### 3. Emit the `shareImage` property in your template

I have [one base page template for my site](https://github.com/pepopowitz/stevenhicks.me/blob/5d95aaa4145975ba6abd36f5696442347d7ed7b0/_includes/layout.pug). It's based on the [pug language](https://pugjs.org/).

I [updated it to emit a `shareImage` in the appropriate meta tags if it exists](https://github.com/pepopowitz/stevenhicks.me/pull/14/files#diff-6bc31447ed9d02b94fbb1d63dd5659e7d2a6d6e7f8ab4c757650c16e189a7316):

```pug

meta(property='og:image' content=`${shareImage || 'https://www.stevenhicks.me/static/img/avatar.jpg'}`)
meta(property='twitter:image' content=`${shareImage || 'https://www.stevenhicks.me/static/img/avatar.jpg'}`)

```

All blog articles will have that `shareImage` computed property, so they'll emit their generated images. Pages like Home and About won't have a `shareImage` computed because I put the `blog.11tydata.js` file in the `blog/` folder — so they'll get stuck with an image of my face. MY FACE!

## Wrap it up, Steve

[The PR](https://github.com/pepopowitz/stevenhicks.me/pull/14/files) ends up being 39 lines added — and over half of that is configuration settings for the text overlay. JavaScript is neat!

You likely found this article because you've already got an [eleventy](https://www.11ty.dev/) site, but if you don't, you should absolutely give it a look. It's a great option for building a blog or any other site where the data doesn't change frequently. I find it more intuitive than other popular options. This example especially demonstrates how well it's designed for generating dynamic content. Every time I come across a new problem I'm delighted to find there's a simple mechanism built into eleventy to solve it.

---

<a name="footnote-1"></a>
<sup>1</sup> Hahahahaha I act like I had agency in this decision but really I didn't see Stephanie's article until I had invested a lot of time in generating an image template based on Jason's articles. I'm as much a sucker for the sunk-cost fallacy as anyone, and here we are.
