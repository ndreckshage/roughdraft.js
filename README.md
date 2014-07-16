RoughDraft.js v0.1.5
====================

Quickly mockup / prototype HTML pages with auto-generated content, without additional JavaScript or server side code.

```html
<section>
  <div data-draft-repeat="30">
    <img data-draft-image="300/300" />
    <div>
      <p data-draft-text="1/s"></p>
      <span data-draft-user="first"></span>
      <span data-draft-user="state"></span>
      <i data-draft-date="F-r"></i>
      <button class="btn" data-draft-number="$/2-3"></button>
    </div>
  </div>
</section>
```

[LIVE DEMO OF THE ABOVE](http://ndreckshage.github.com/roughdraft.js/)

See [API](#api) below for more details.

Installation
------------

*Important:* Depends on jQuery. Must be loaded after.

######Steps:

1. [Download RoughDraft.js](https://github.com/ndreckshage/roughdraft.js/zipball/master) or install via Bower

    ```javascript
    bower install --save-dev roughdraft.js
    ```

2. Create a new mockup

      ```html
      <head>
        <script src="/bower_components/jquery/jquery.min.js"></script>
        <script src="/bower_components/roughdraft/roughdraft.min.js"></script>
      </head>
      <body>

        <!-- Your HTML Goes Here! -->

        <script>
          $(function(){
            $(window).roughDraft();
          });
        </script>
      </body>
      ```

  *Recommendation*: This is meant to be used as a [living frontend styleguide](http://alistapart.com/article/creating-style-guides) and should not be loaded in Production.

API
----------

+ data-draft-repeat
+ data-draft-text
+ data-draft-image
+ data-draft-date
+ data-draft-number
+ data-draft-user

[Please see Full Usage Wiki for more information](https://github.com/ndreckshage/roughdraft.js/wiki/Full-Usage-Wiki)

LIBRARIES
----------

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

######Note: To save load time you can specify a thesaurus that will be used instead of making an HTTP call for lorem ipsum text.

  ```javascript
  $(window).roughDraft({
      author: 'lorem',
      customIpsum: true,
      customIpsumPath: '/bower_components/roughdraft.js/roughdraft.thesaurus.json'
  });
  ```

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

# Want to Contribute?
[Ideas, information, contributor list, etc.](CONTRIBUTE.md)
