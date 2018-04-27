---
draft: true
title: Testing Render In A React App
date: 2018-04-16T12:00:00
tags: post
layout: blog
snippet: There's more than one way to skin a cat, where the "cat" is your React app, and "skinning it" is verifying that it's rendering correctly.
tagline: There's more than one way to skin a cat, where the "cat" is your React app, and "skinning it" is verifying that it's rendering correctly.
---

One of my favorite things about React is the testing story. As JavaScript frameworks have evolved tremendously over the years, so has the ability to test them. React is especially friendly to testing, with its focus on immutability and functional-like programming.

In my experience, the things worth testing in a React app fit into three categories:

1.  **Does it render correctly?** When I feed a component a set of props, do I get the expected output?
2.  **Does it interact correctly?** When I click on something here, does it make something else show up over there?
3.  **Does it manage state correctly?** When the user interacts with the app, does the app keep track of their state?

This article will focus on the first item - does my app render correctly?

There are several great options for testing React rendering. I'll be covering three of them - Enzyme, Jest snapshots, and html-looks-like. All of them are useful and easy to use, but none of them is a silver bullet. Different testing scenarios call for different tools. This article will give you an idea of when to use each tool, and when not to.

## Enzyme

### Shallow

### Render

### Mount

### Advantages

### Disadvantages

### Good Uses

### Bad Uses

## Jest Snapshots

### Advantages

### Disadvantages

### Good Uses

### Bad Uses

## Html-looks-like

### Advantages

### Disadvantages

### Good Uses

### Bad Uses

## The Verdict
