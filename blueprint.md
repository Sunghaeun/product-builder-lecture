# Project Blueprint

## Overview

This is a simple "Hello, world!" web application. The goal is to make it more visually appealing and interactive, following modern web development best practices.

## Current State

*   `index.html`: Basic HTML structure with a heading and a button.
*   `style.css`: Empty.
*   `main.js`: Empty.

## Plan

### 1. Update `index.html` - **COMPLETED**
    *   Added a more descriptive title and a header.
    *   Introduced a main content area and a footer.
    *   Added a `<fancy-button>` web component with a `label` attribute.

### 2. Update `style.css` - **COMPLETED**
    *   Added a modern color palette with CSS variables (`--primary-color`, `--background-color`, etc.).
    *   Set a modern system font stack for typography.
    *   Used flexbox for a basic sticky footer layout.
    *   Added a subtle noise texture to the background using an inline SVG in a pseudo-element.

### 3. Update `main.js` - **COMPLETED**
    *   Created a `FancyButton` class that extends `HTMLElement`.
    *   Used the Shadow DOM to encapsulate the button's style and structure.
    *   The button has a "glow" effect on hover and a subtle transform.
    *   The button's label is configurable via the `label` attribute.
    *   An alert is triggered when the button is clicked.
    *   The custom element is defined as `fancy-button`.

## Lotto App refactor and animation

### 1. Refactor code - **COMPLETED**
    *   Moved all inline CSS from `index.html` into `style.css`.
    *   Moved all inline JavaScript from `index.html` into `main.js`.
    *   Updated `index.html` to link to the external `style.css` and `main.js` files.

### 2. Add Lotto Ball Animation - **COMPLETED**
    *   Added a `@keyframes fall` animation in `style.css` to make the balls fall into place.
    *   The `.ball` style now includes the `animation` property with a delay.
    *   Updated the `renderNumbers` function in `main.js` to set a staggered `animation-delay` for each ball, creating a sequential animation effect.
