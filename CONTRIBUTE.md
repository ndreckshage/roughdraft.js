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
