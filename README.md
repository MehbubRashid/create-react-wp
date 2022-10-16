# create-react-wp

  NPM module for creating a React app that can be used in WordPress Theme or Plugin

# Description

  Ever wondered how to use React.js to make powerful frontend in WordPress theme or plugin? Using create-react-wp, you can do it in the most proper way. The problem with create-react-app is - it produces multiple dynamic javascript files thus making it impossible to enqueue the javascripts in WordPress. create-react-wp on the other hand, produces single javascript and css file that we can enqueue. More Interesting fact that most of us don't know is, since version 5.0, WordPress itself contains React.js so we don't have to include React separately and it makes our bundle size extremely small (Few Kilobytes). Features in a nutshell:-
  * SASS(scss) support
  * Hot reload (instant refresh without browser reload) feature
  * Developed using the official WordPress & Gutenberg development standard.
  * Extremely small bundle size (Few Kilobytes).
  * Single build file for enqueuing in WordPress.

# Installation & Usage

    $ npx create-react-wp appName

* `cd appName && npm start`
* Write your code in src/App.js.
* Write CSS in src/style/main.scss.
* Enqueue the `appName/build/index.js`(make sure to add `wp-element` as dependency) and `appName/build/index.css` files in the page where `<div id="selectorId"></div>` is present.
* For instant refresh (Hot reload feature) & better error reporting, install & activate the `Gutenberg plugin`, Install `React Developer Tools` extension in your browser and `define('SCRIPT_DEBUG', true)` in your `wp-config.php` file.
* For creating minified production build - `npm run build`

**Tip:** Since WordPress contains react by default, while importing from react, use `@wordpress/element` instead of `react`. Example: `import {useState, useEffect} from '@wordpress/element'`