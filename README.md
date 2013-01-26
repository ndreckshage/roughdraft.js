RoughDraft.js
=============

[LIVE DEMO](http://ndreckshage.github.com/roughdraft.js/)

Auto-generates content based on data attributes in HTML.

+ data-draft-repeat
+ data-draft-text
+ data-draft-image
+ data-draft-date

Allows developers to quickly mockup a design using minimal HTML markup + JS, without server side scripting, and without having to navigate to image/text lorem ipsum generators.

The layout prototype ideally will cut down on development time by figuring out layout kinks, prior to the heavy code lifting.

Installation 
-----------

+ Requires jQuery
+ Make sure the roughdraft.thesaurus.json lives in the same directory as the file, or adjust the the option.

Add the following (potentially in a IS_DEV include header, as this JS library will likely only be used in early stage development).

```html
<script type="text/javascript" src="js/jquery.roughdraft.0.1.0.js"></script>
```

Usage/Overview
-----------

The plugin is called by

```javascript
$(window).roughDraft({
  'author' : 'baconipsum.com',
  'illustrator' : 'placehold.it',
  'thesaurus': '/roughdraft.thesaurus.json'
});
```

With the main options of author + illustrator, of the developers preferred lorem ipsum + image generator libraries.

Currently, Lebowskiipsum (Big Lebowski) and Baconipsum (TEXT), and Placehold.it and Placekitten.com (IMAGES) are supported, but more can be added.

Change the thesaurus location to match the relative location in your environment.

This then enables the data-draft tags:

**data-draft-repeat**

```html
<div data-draft-repeat="#"></div>
<div data-draft-repeat="5"></div>
```

Will repeat the entire div, including all inner html and javascript listeners the assigned number of times.

**data-draft-text**

```html
<p data-draft-text="#/type"></p>
<span data-draft-text="3/p"></span>
```

Will insert a specified amount of random text in between the tags. The number (seperated by backslash), and text type (p - paragraph, s - sentence, w - words). 3/p will generate 3 paragraphs of lorem ipsum.

The lorem ipsum library is loaded through Ajax -- if you have trouble running on local network (Google Chrome), run through a simple web server, or open in Firefox (I think).

For example -- (via Terminal with Python)

```
$ cd roughdraft.js
$ python -m SimpleHTTPServer
```

**data-draft-image**

```html
<img data-draft-img="width/height" />
<img data-draft-img="300/500" />
```

Will insert the requested image size src (as well as height + width attributes) into the dom.

The image links are formatted based on the services requirements, and also taps into color randomization to serve different images to avoid repetitiveness.

**data-draft-date**

```html
<span data-draft-date="D/M/Y"></span>
<span data-draft-date="M-r/j-r"></span>
```

Will insert a date into the calling elements inner html in the requested format. The date month is separated by a backslash, and the date can be randomized by adding a "-r".

The first span tag will return "Wed Jan 2013" and the second will return "Mar 7" (randomized).

The date format uses PHP's date format (my preference), and can be changed through initialization options as so.

```javascript
$(window).roughDraft({
  'author' : 'baconipsum.com',
  'illustrator' : 'placehold.it',
  'thesaurus': '/roughdraft.thesaurus.json',
  'calendar': {
    'dayNumber'        : 'j',
    'dayNumberZeros'   : 'd',
    'dayText'          : 'l',
    'dayTextThree'     : 'D',
    'monthNumber'      : 'n',
    'monthNumberZeros' : 'm',
    'monthText'        : 'F',
    'monthTextThree'   : 'M',
    'yearNumber'       : 'Y',
    'yearNumberTwo'    : 'y'
  }
});
```

Possible ideas for contribution
-----------
*not sure how these would all work, just brainstorming...*
+ Refactor anything
+ More lorem ipsum libraries
+ More image generators
+ Get it working with pagination/infinite scroll
+ data-draft-user (generates a fake name/email etc)
+ data-draft-number (generates random numbers)
+ data-draft-form (generates a form)
+ data-draft-time (random time etc)
+ data-draft-tweet (pull in random tweet from certain accounts)
+ data-draft-rss (pulls in rss feed)
+ data-draft-video (youtube, vimeo)
+ data-draft-song (soundcloud etc)
+ data-draft-quote (like lorem ipsum but blockquotes)

*other libraries that could be included*
+ flickholdr.com (image)
+ placedog.com (image)
+ lorempixel.com (image)
+ placezombies.com (image)
+ rndimg.com (image)
+ lipsum.com (text)
+ lorizzle.nl (text)
+ slipsum.com (text)
+ robotipsum.com (text)
+ spaceipsum.com (text)
+ hipsteripsum.com (text)
+ tunaipsum.com (text)
+ ~~veggieipsum.com (text)~~ *DONE*
+ teapartyipsum.com (text)
+ fillerati.com (text)

__Lorem Ipsum Tool__

In the tools section, I made a simple script to help convert lorem ipsum text into JSON data that the roughdraft plugin can read.
