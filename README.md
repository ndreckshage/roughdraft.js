RoughDraft.js v0.1.5
====================

[LIVE DEMO](http://ndreckshage.github.com/roughdraft.js/)

Auto-generates content based on data attributes in HTML. See [Generators](#Generators) below.

Allows to quickly mockup a design using minimal HTML markup + CSS, without server side scripting, and without having to navigate to image/text lorem ipsum generators.

The layout prototype ideally will cut down on development time by figuring out layout kinks, prior to the heavy code lifting.

This tool is meant to allow you to develop HTML/CSS alone, it should’t be part of a backbone application which is actually communicating to an API.

A simple `mockups/` folder hosting a set of static HTML loading Roughdraft is more than enough.


Generators
----------

+ data-draft-repeat
+ data-draft-text
+ data-draft-image
+ data-draft-date
+ data-draft-number
+ data-draft-user

**Lorem Ipsum remote APIs** *("library")*
+ "lorem" : "http://www.randomtext.me/api/lorem/p-20/40-50"
+ "bacon" : "https://baconipsum.com/api/?type=all-meat&paras=20&start-with-lorem=1"
+ "hipster" : "http://hipsterjesus.com/api?paras=20&type=hipster-centric&html=false"

**Lorem Ipsum (local only)** *("bookstore")*
*NOTE —— all with author permission. If you want to commit a new library, please make sure you have the author permission.*

+ "lorem"
+ "lebowskiipsum.com" -- *courtesy of [lebowskiipsum.com](http://www.lebowskiipsum.com)*
+ "tunaipsum.com" -- *courtesy of [tunaipsum.com](http://www.tunaipsum.com)*
+ "robotipsum.com" -- *courtesy of [robotipsum.com](http://www.robotipsum.com)*
+ "lorizzle.nl" -- *courtesy of [lorizzle.nl](http://www.lorizzle.nl)*
+ *add your favorite ipsum generator with JSON converter/add to repository library*


**Image generators**
+ "placekitten" : "http://placekitten.com/ + params"
+ "placehold" : "http://placehold.it/ + params"
+ "placedog" : "http://placedog.com/ + params"
+ "baconmockup" : "http://baconmockup.com/ + params"


**User generator**
+ Created an API of the [php port of Faker](https://github.com/fzaninotto/Faker) that I am hosting at [http://roughdraftjs.com/api/](http://roughdraftjs.com/api/)


**Class name sequencer**
Style patterns with expectable class name sequence of your choice.

To use the feature, simply add a class name containing `*alfa*` and that node's siblings will have similar class name following NATO phonetic alphabet.


Installation
------------

*Reminder*, Roughdraft must be loaded after jQuery as it is creating an extension on top of it.

Steps:

1. Add entries in `bower.json`

    ```json
    {
      "devDependencies": {
        "roughdraft.js": "0.1.5"
      }
    }
    ```

2. Update your bower dependencies

    ```bash
    bower update
    ```

3. Create a folder in your project

  All you need is a folder (e.g. `mockups/`) that is exposed by a webserver right beside the `bower_components/`.

  For example, in a Yeoman managed Backbone project, it will look like this:

      ```
      - app/
        - bower_components/
        - mockups/
          - index.html
      - bower.json
      ```

4. Create your first mockup page

  Include the following in each of your `mockups/` files.

      ```html
      <head>
        <script src="/bower_components/jquery/jquery.min.js"></script>
        <script src="/bower_components/roughdraft/roughdraft.min.js"></script>
      </head>
      ```

  **Advice**: In case you think of using RequireJS to load either RoughDraft and/or jQuery. It’s better not to, because that mockup folder is only meant to be used as a [living frontend styleguide](http://alistapart.com/article/creating-style-guides) and is better be as decoupled as possible from the web application.

5. Add initialization

  Add this inside the body tag, at the bottom.

      ```javascript
      $(document).ready(function(){
          $(window).roughDraft();
      });
      ```

6. Bonus, LoremIpsum local only:

  To save load time you can specify a thesorus that will be used instead of making an HTTP call for lorem ipsum text.

      ```javascript
      <script>
      $(document).ready(function(){
        $(window).roughDraft({
            author: 'lorem',
            customIpsum: true,
            customIpsumPath: '/bower_components/roughdraft.js/roughdraft.thesaurus.json'
        });
      });
      ```





Usage overview
--------------

The plugin MUST be called after jQuery is loaded, at document ready, by doing:

```javascript
$(document).ready(function(){
  $(window).roughDraft({
    'author' : 'bacon',
    'illustrator' : 'placehold'
  });
});
```

*full options below*

With the main options of author + illustrator, of the developers preferred lorem ipsum + image generator libraries.

Currently, BaconIpsum, LoremIpsum and HipsterIpsum (TEXT) + Placehold.it and Placekitten.com (IMAGES) are supported, but more can be added.

The content is retreived via JSONP/JSON APIs, but there is also the option to maintain a local lorem ipsum library, in roughdraft.thesaurus.json

The plugin then enables the data-draft tags:

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
<img data-draft-image="width/height" />
<img data-draft-image="300/500" />
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
```

**data-draft-number**

```html
<span data-draft-number="$/digits/decimal"></span>
<span data-draft-number="$/3-4/2"></span>
<span data-draft-number="3"></span>
```


Will insert a randomized number into calling elements with requested options. The first option ($) is optional to signify as money. The second (digits) is either a single number 3 (3 digits) or range (3-5) to allow for greater number variance, and the last (decimal) to add decimals onto the number.

The 2nd span tag will return '$234.50' or '$9331.99', etc. The 3rd tag will return '144', etc.

**data-draft-user**

```html
<span data-draft-user="full"><!-- generates full name --></span>
<span data-draft-user="first"><!-- generates first name --></span>
<span data-draft-user="last"><!-- generates last name --></span>
<span data-draft-user="email"><!-- generates email --></span>
<span data-draft-user="username"><!-- generates username --></span>
<span data-draft-user="twitter"><!-- generates '@' + username --></span>
<span data-draft-user="phone"><!-- generates phone number --></span>
<span data-draft-user="address"><!-- generates street address --></span>
<span data-draft-user="city"><!-- generates city name --></span>
<span data-draft-user="state"><!-- generates a US state --></span>
<span data-draft-user="zip"><!-- generates a zip code --></span>
<span data-draft-user="country"><!-- generates a country --></span>
```

**Class name sequencer**

Sometimes we need to use a sequence of class names to customize styling.

A recommendation is to abstract class names from their color or objective
and use them in a sequential order, the sequencer does it.

Using a class name containing the word `alfa`:

```html
<div class="sample">
 <div data-draft-repeat="2" class="myclass-alfa">
     <h1>Example node</h1>
 </div>
</div>
```

Would generate in an expectable order similar class names:

```html
<div class="sample">
 <div class="myclass-alfa">
     <h1>Example node</h1>
 </div>
 <div class="myclass-bravo">
     <h1>Example node</h1>
 </div>
</div>
```

The feature ensures the sequence is applied to the same level siblings.

To enable, activate flag in:

```javascript
$(window).roughDraft({
  classNameSequencer: true
});
```



Possible ideas for contribution
-----------
*not sure how these would all work, just brainstorming...*
+ Refactor anything
+ More lorem ipsum libraries
+ More image generators
+ Get it working with pagination/infinite scroll
+ ~~data-draft-user (generates a fake name/email etc)~~ *DONE*
+ ~~data-draft-number (generates random numbers)~~ *DONE -- Contributor: ultimatedelman*
+ data-draft-form (generates a form)
+ data-draft-time (random time etc)
+ data-draft-tweet (pull in random tweet from certain accounts)
+ data-draft-rss (pulls in rss feed)
+ data-draft-video (youtube, vimeo)
+ data-draft-song (soundcloud etc)
+ data-draft-quote (like lorem ipsum but blockquotes)

*other libraries that could be included (THESAURUS.JSON with author permission)*
+ ~~placehold.it (image)~~ *DONE*
+ ~~placekitten.com (image)~~ *DONE*
+ ~~baconmockup.com (image)~~ *DONE*
+ flickholdr.com (image)
+ ~~placedog.com (image)~~ *DONE*
+ lorempixel.com (image)
+ placezombies.com (image)
+ ~~baconipsum.com(text)~~ **API**
+ ~~lipsum.com (text)~~ *IN THESAURUS.JSON* + **API**
+ ~~lorizzle.nl (text)~~ *IN THESAURUS.JSON*
+ slipsum.com (text)
+ ~~robotipsum.com (text)~~ *IN THESAURUS.JSON*
+ spaceipsum.com (text)
+ ~~hipsteripsum.com (text)~~ **API**
+ ~~tunaipsum.com (text)~~ *IN THESAURUS.JSON*
+ veggieipsum.com (text)
+ teapartyipsum.com (text)
+ fillerati.com (text)

__Lorem Ipsum Tool__

In the tools section, I made a simple script to help convert lorem ipsum text into JSON data that the roughdraft plugin can read. Download the files and navigate to [/tools/convert_to_json.html](/tools/convert_to_json.html). It should make it pretty easy to generate your own lorem ipsum library if you'd prefer quicker loads/a favorite ipsum library.

__Full customization options__

```javascript
$(window).roughDraft({
  // the site to generate lorem ipsum from, for both jsonp + custom options
  author      : 'bacon',
  // the site to generate placeholder images from
  illustrator : 'placehold',
  // array of categories that should be used (will only work for image generators that allow categories -- lorempixel). defaults to all
  // ['abstract', 'animals', 'business', 'cats', 'city', 'food', 'nightlife', 'fashion', 'people', 'nature', 'sports', 'technics', 'transport']
  categories  : ['business'],
  // array ['000', 'fff', 'eaeaea'] of colors the images should be in (will only work for image generators that allow colors)
  paintColor  : ['453f35','e7cead','b5ab94','eba434','64886c','b15c3a','b1956c'],
  // true if customIpsum library is preferred over jsonp api libraries
  customIpsum : false,
  // set timeout for JSONP requests
  timeout: 5000,
  // if customIpsum is true, relative url of library is necessary
  customIpsumPath: '/roughdraft.thesaurus.json',
  // Replace occurences of *alfa in classNames following the NATO phonetic alphabet sequence
  classNameSequencer: true,
  // calendar data formatting (default using PHP formatting)
  calendar: {
    dayNumber        : 'j',
    dayNumberZeros   : 'd',
    dayText          : 'l',
    dayTextThree     : 'D',
    monthNumber      : 'n',
    monthNumberZeros : 'm',
    monthText        : 'F',
    monthTextThree   : 'M',
    yearNumber       : 'Y',
    yearNumberTwo    : 'y'
  }
});
```

__SPECIAL THANKS TO CONTRIBUTORS__

+ [ultimatedelman](https://github.com/ultimatedelman)
+ [johngeorgewright](https://github.com/johngeorgewright)
