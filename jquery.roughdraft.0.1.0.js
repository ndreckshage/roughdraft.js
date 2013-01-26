/******************************************************/
/******************************************************/
/*                                                    */
/*  jQuery RoughDraft.js Plugin                       */
/*  Version 0.1.0                                     */
/*                                                    */
/*  Copyright Nick Dreckshage, licensed GPL & MIT     */
/*  https://github.com/ndreckshage/roughdraft.js      */
/*                                                    */
/******************************************************/
/******************************************************/

// semi-colon as safety net against concatenated scripts that are improperly closed
;(function($,window,document,undefined){

  // undefined to protect against undefined, mutatable global in ECMAScript 3
  // window and document as local variables to quicken resolution

  /**********************************************
    *
    *  CONSTRUCTOR
    *
    *  @param options -- object -- user configuration options
    *
  **********************************************/

  $.RedPen = function(options) {

    // called first to create markup
    this._create(options)

    // then build default functionality
    this._init();
  }

  /**********************************************
    *
    *  DEFAULT SETTINGS
    *
    *  -- these can/should be overwritten when calling plugin
    *
    *  -- author determines which lorem ipsum library is to be used
    *  -- thesaurus is location of json lorem ipsum library
    *  -- illustrator determines which placeholder image site is to be used
    *  -- calendar allows people to use different date tags in html. default uses PHP date settings
    *
  **********************************************/

    //  EXAMPLE OF HOW WIDGET IS CALLED WITH OPTIONS

    //  $(window).roughDraft({
    //    'author' : 'lebowskiipsum.com',
    //    'illustrator' : 'placehold.it',
    //    'thesaurus': '/roughdraft.thesaurus.json'
    //  });

  $.RedPen.settings = {
    author      : 'lebowskiipsum.com',
    thesaurus   : '/roughdraft.thesaurus.json',
    illustrator : 'placehold.it',
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
  }

  /**********************************************
    *
    *  FULL SCOPE VARIABLES
    *
    *  -- used throughout plugin, rather than defining in each method
    *
  **********************************************/

  $.RedPen.scopeVar = {
    dataTag       : 'data-',
    paragraphType : 'p',
    sentenceType  : 's',
    wordType      : 'w'
  }

  /**********************************************
    *
    *  PROTOTYPE
    *
  **********************************************/

  $.RedPen.prototype = {

    /**********************************************
      *
      *  _create method
      *
      *  -- builds markup and sets up the plugin
      *
      *  @param options -- object -- configurations options passed in by constructor
      *
    **********************************************/

    _create: function(options) {
      var $draftRepeat = $('[data-draft-repeat]');

      // to see an outline of everything, run 'new $.RedPen' in your chrome devtools console

      // extends the options to allow them to be overwritten in other files
      this.options = $.extend(true, {}, $.RedPen.settings, options);

      // sets up the full scope variables
      this.scopeVar = $.RedPen.scopeVar;

      // data-draft-repeat will act as a loop for the div and inner html/js events
      // buils the markup, necessary to call this first, and repeat all necessary divs, prior to using other methods
      if ($draftRepeat.length) {
        this.scanner($draftRepeat);
      }
    },

    /**********************************************
      *
      *  _init method
      *
      *  -- builds default functionality following create
      *
    **********************************************/

    _init : function() {
      var $draftText = $('[data-draft-text]'),
          $draftImage = $('[data-draft-image]'),
          $draftDate = $('[data-draft-date]');

      // data-draft-text taps into lorem ipsum library in roughdraft.thesaurus.json
      if ($draftText.length) {
        this.plagerizer($draftText);
      }
      // data-draft-image taps into placeholder image library
      if ($draftImage.length) {
        this.doodler($draftImage);
      }
      // data-draft-date generates current/random date in various formats
      if ($draftDate.length) {
        this.scheduler($draftDate);
      }
    },

    /**********************************************
      *
      *  scanner method
      *
      *  -- handles instances of data-draft-repeat. duplicates and appends them in dom.
      *  -- mimics server side loops/html duplication
      *  -- called by data-draft-repeat="3" etc
      *
      *  @param draftRepeat -- object -- data selector passed in through _create
      *
    **********************************************/

    scanner: function(draftRepeat) {
      var $self,
          draftRepeatBare = 'draft-repeat',
          repeatCount;

      // looping used throughout rather than $.each to preserve objects
      // this will loop through all dom elements that use the data-draft-repeat tag
      for (var i = 0; i < draftRepeat.length; i++) {

        // set self to the current dom node being repeated
        $self = $(draftRepeat[i]);
        // access the value (ex. data-draft-repeat="5")
        repeatCount = $self.data(draftRepeatBare);
        // remove the data-draft-repeat-tags from the dom
        $self.removeAttr(this.scopeVar.dataTag + draftRepeatBare);
        
        // loop through the count of requested repeats        
        for (var x = 0; x < repeatCount - 1; x++){

          // clone true true (with all deep data + events) to maintain node's JS, and insert into dom
          $self.clone(true, true).insertAfter($self);
        }
      }
    },

    /**********************************************
      *
      *  plagerizer method
      *
      *  -- handles instances of data-draft-text and inserts as text into calling node
      *  -- taps into json lorem ipsum library
      *  -- words/sentences/paragraphs can be called by data-draft-text="3p" etc
      *
      *  @param draftText -- object -- data selector passed in through _init
      *
    **********************************************/

    plagerizer: function(draftText) {
      var self,
          draftTextBare = 'draft-text',
          textData,
          textCount,
          textType;

      // this will loop through all dom elements that use the data-draft-text tag
      for (var i = 0; i < draftText.length; i++) {
        
        // set self to the current dom node being repeated
        self = $(draftText[i]);
        // access the value (ex. data-draft-text="4s")
        textData = self.data(draftTextBare);

        // ensure that the value is correctly returned as string
        if (typeof textData === 'string') {

          // split the string at the backslash creating an array ['5','p']
          textData = textData.split('/');
          // take index 0 and convert it into a number. this is the number requested
          textCount = parseInt(textData[0]);
          // take index 1 and set it to var that will be the type of text requested (word/sentence/paragraphs)
          textType = textData[1].toLowerCase();

          // if either index is bad, set both vars to false
          if (isNaN(textCount) || typeof textType !== 'string') {
            textCount = false;
            textType = false;
          }

          // if both indexes are good, then grab the text
          if (textCount && textType) {

            // remove the data tags from the dom
            self.removeAttr(this.scopeVar.dataTag + draftTextBare);
            // call the method to get lorem ipsum info, passing in the textcount and type
            self.text(this._openToRandomPage(textCount, textType));
          } else {
            // if something went wrong, log the error
            console.log("Please ensure that you specify Paragraph/Sentence/Word in the format 3/S, for 3 sentences");
          }
        }
      }
    },

    /**********************************************
      *
      *  doodler method
      *
      *  -- handles instances of data-draft-image and inserts image into calling node
      *  -- taps into 'lorem ipsum' image galleries
      *  -- images with width/height can be called by data-draft-image="500/1000" for a 500px wide by 1000px high image
      *
      *  @param draftImage -- object -- data selector passed in through _init
      *
    **********************************************/

    doodler: function(draftImage) {
      var self,
          draftImageBare = 'draft-image',
          imageData,
          imageWidth,
          imageHeight,
          imageLink;

      // this will loop through all dom elements that use the data-draft-image tag
      for (var i = 0; i < draftImage.length; i++) {

        // set self to the current dom node being repeated
        self = $(draftImage[i]);
        // access the value (ex. data-draft-image="300/500")
        imageData = self.data(draftImageBare);

        // check that the value is in the correct format
        if (typeof imageData === 'string') {

          // split the image dimensions on the backslash making array ['300','500']
          imageData = imageData.split('/');
          // set the width to the first index and convert to number
          imageWidth = parseInt(imageData[0]);
          // set the height to the 2nd index and convert
          imageHeight = parseInt(imageData[1]);

          // if either index is not a number, something went wrong, and set both vars to false
          if (isNaN(imageWidth) || isNaN(imageHeight)) {
            imageWidth = false;
            imageHeight = false;
          }
        
          // if all went well, sent the image to the _photoAlbum method to return an image
          if (imageWidth && imageHeight) {

            // pass in the width and height and it will return a link
            imageLink = this._photoAlbum(imageWidth, imageHeight);
            // set the link to the img src attribute, hard code the width + height, and remove the data-draft-image tag
            self.attr('src', imageLink)
              .attr('width', imageWidth)
              .attr('height', imageHeight)
              .removeAttr(this.scopeVar.dataTag + draftImageBare);
          } else{
            // if imageWidth/imageHeight are false, log an error to the console
            console.log("Please ensure that you specify Width/Height in the format 250/300 for 250px wide by 300px tall");
          }
        }
      }
    },

    /**********************************************
      *
      *  scheduler method
      *
      *  -- handles instances of data-draft-date and inserts text into calling node
      *  -- uses js date engine + some randomization if requested
      *  -- currently using PHP date structure which can be changed on user preference in plugin options
      *  -- dates can be called with data-draft-date="M/j/Y" for Jan 23 2013 or "l-r/n-r/y-r" etc for random date (in 23 1 13 format)
      *  -- returned dates are currently separated with spaces
      *
      *  @param draftDate -- object -- data selector passed in through _init
      *
    **********************************************/

    scheduler: function(draftDate) {
      var self,
          draftDateBare = 'draft-date',
          dateData,
          dateRequest,
          formatDate = new String();

      // this will loop through all dom elements that use the data-draft-date tag
      for (var i = 0; i < draftDate.length; i++){

        // set self to the current dom node being repeated
        self = $(draftDate[i]);
        // access the value (ex. data-draft-date="M")
        dateData = self.data(draftDateBare);

        // check that the data is interpreted as string
        if (typeof dateData === 'string') {

          // split the dates on the backslash making array ['D','M-r','Y']
          dateData = dateData.split('/');
          // count the indexes
          dateDataLength = dateData.length;

          // loop on the indexes, sending each one to the datePicker method
          // before loop, reset date to empty string
          formatDate = '';
          for (var x = 0; x < dateData.length; x++) {

            // the method will return a string of the specific date index, build this into full string
            formatDate += this._datePicker(dateData[x]);
            // unless it is the last index, follow the date with a space
            x != dateData.length - 1 ? formatDate += ' ' : '';
          }

          // set the text of the calling node equal to the fully formatted date
          self.text(formatDate);
        }
      }
    },

    /**********************************************
      *
      *  _randomizer method
      *
      *  @param number -- number -- of the whatever method is calling for randomization
      *
      *  @return -- number -- to the calling method
      *
    **********************************************/

    _randomizer: function(number) {

      // randomize and round down for number requested
      return Math.floor(Math.random() * number);
    },

    /**********************************************
      *
      *  _thesaurus method
      *
      *  -- handles getting the lorem ipsum library from roughdraft.thesaurus.json
      *
    **********************************************/

    _thesaurus: function() {
      var thesaurus = false,
          author = this.options.author,
          lebowski = 'lebowskiipsum.com',
          bacon = 'baconipsum.com',
          veggie = 'veggieipsum.com';

      // if the auther request (from options), does not match a library, return lebowski default
      switch (author) {
        case lebowski:                break;
        case bacon:                   break;
        case veggie:                  break;
        default:  author = lebowski;  break;
      }

      // make the ajax call based on the default/user option url
      // async off since that conflicts with page load
      $.ajax({
        url: this.options.thesaurus,
        dataType: 'json',
        async: false,
        success: function(data) {
          thesaurus = data;
        }
      });
      
      // if ajax failed, log message to console
      if (thesaurus === false) {
        console.log('There was an issue with the AJAX request in the _thesaurus method. ' +
          'Please ensure that ' + this.options.thesaurus + ' is your correct relative path.');
      } else {
        // else return the lorem ipsum data
        return thesaurus[author];
      }
    },

    /**********************************************
      *
      *  _openToRandomPage method
      *
      *  -- handles logic of where to send each texttype
      *
      *  @param textCount -- number -- of the number text segments to return
      *  @param textType -- string -- of the type of text segments to return
      *
      *  @return randomResult -- string -- of the resulting randomized lorem ipsum
      *
    **********************************************/

    _openToRandomPage: function(textCount, textType) {
      var thesaurus = this._thesaurus(),
          paragraphSentences,
          randomParagraph = new Array(),
          randomResult = new String();

      // every texttype needs a paragraph, pass the textcount, type and json library to the paragraph method
      randomParagraph = this._randomParagraph(textCount, textType, thesaurus);
      // count the number of sentences of the returned paragraph
      paragraphSentences = randomParagraph.length;

      // send the paragraph data to different methods based on text type
      switch (textType) {
        case this.scopeVar.paragraphType:
          // for paragraphs, the work is already completed from above, and join the sentences with a space
          randomResult = randomParagraph.join(' ');
          break;
        case this.scopeVar.sentenceType:
          // for sentences, call the random sentence method passing in the textcount, the current paragraph, and the number of sentences
          randomResult = this._randomSentence(textCount, randomParagraph, paragraphSentences);
          break;
        case this.scopeVar.wordType:
          // for words, call the random word method passing in the textcount and paragraph
          randomResult = this._randomWord(textCount, randomParagraph);
          break;
        default:
          // if there was no text type match, dont default to anything
          break;
      }

      // return the resulting randomized ipsum
      return randomResult;
    },

    /**********************************************
      *
      *  _randomParagraph method
      *
      *  -- builds the random paragraphs from the json data
      *
      *  @param textCount -- number -- of the number text segments to return
      *  @param textType -- string -- of the type of text segments to return
      *  @param thesaurus -- object -- json data of the lorem ipsum library (based on user author)
      *
      *  @return randomParagraph -- mixed -- of the random paragraphs sentences
      *
    **********************************************/

    _randomParagraph: function(textCount, textType, thesaurus) {
      var totalParagraphs = thesaurus.length,
          randomParagraphIndex,
          currentParagraph,
          randomParagraph = new Array();

      // this method is called by all text types
      // if not called by a paragraph type, only 1 paragraphy needs to be returned
      if (textType != this.scopeVar.paragraphType) {

        // randomize the paragraph index based on total paragraphs in authors' ipsum library
        randomParagraphIndex = this._randomizer(totalParagraphs);
        // cherry pick the 1 paragraph based on the random index, and then select 1st index ([0], theres only 1)
        // this will return a first level array of the paragraphs sentences
        randomParagraph = thesaurus.splice(randomParagraphIndex, 1)[0];
      } else {
        
        // if paragraphs are requested, several may need to be returned
        // return a new random paragraph while the text count is > 0
        while (textCount > 0) {

          // if a bunch of paragraphs are requested and looped through
          // rebuild the paragraphs based on the ipsum library
          if (totalParagraphs <= 0) {
            // call the thesaurus
            thesaurus = this._thesaurus();
            // and reset the count
            totalParagraphs = thesaurus.length;
          }
          
          // randomize the paragraph index based on total paragraphs left
          randomParagraphIndex = this._randomizer(totalParagraphs);
          // pick a paragraph, and pull it out of the array
          currentParagraph = thesaurus.splice(randomParagraphIndex, 1)[0];
          // concatenate the current paragraph to the total list within the while loop
          randomParagraph = randomParagraph.concat(currentParagraph);

          // on each loop, decrease the paragraph count (one gets spliced from array)
          totalParagraphs--;
          // and decrease the text count for the requested number of paragraphs
          textCount--;
        }
      }

      // return a string/array of the randomized paragraphs
      return randomParagraph;
    },

    /**********************************************
      *
      *  _randomSentence method
      *
      *  -- builds the random sentences from the randomParagraphs method
      *
      *  @param textCount -- number -- of the number text segments to return
      *  @param paragraph -- array -- of the paragraph sentences
      *  @param paragraphLength -- number -- of the number of sentences in the array
      *
      *  @return randomSentence -- string -- of the randomized ipsum sentence
      *
    **********************************************/

    _randomSentence: function(textCount, paragraph, paragraphLength) {
      var initialTextCount = textCount,
          randomSentenceIndex = this._randomizer(paragraphLength),
          nextSentenceIndex = randomSentenceIndex + 1,
          currentSentence,
          randomSentence = new String();

      // for each sentence that is requested, return a sentence from the random paragraph
      while (textCount > 0) {

        // only randomize the first sentence in the paragraph
        // otherwise, 'stream of thought' sentences wont carry over
        if (textCount != initialTextCount) {

          // keep track of the next sentence index, and increase on each pass
          nextSentenceIndex++;

          // if the next sentence count exceeds length, loop to beginning to avoid undefined index
          if (nextSentenceIndex >= paragraphLength) {
            nextSentenceIndex = 0;
          }

          // set the sentence based on the next index rather than random
          currentSentence = paragraph[nextSentenceIndex];
        } else {

          // if this is the first sentence on a paragraph call, randomize it
          currentSentence = paragraph[randomSentenceIndex];
        }

        // end all sentences (but final one) with a space
        if (textCount < paragraphLength) {
          currentSentence = currentSentence + ' ';
        }
   
        // combine all of the sentences
        randomSentence += currentSentence;
        // decrease the loop until paragraphs requested is met
        textCount--;
      }

      // return the string of sentences
      return randomSentence;
    },

    /**********************************************
      *
      *  _randomWord method
      *
      *  -- builds the random words from the randomParagraphs method
      *
      *  @param textCount -- number -- of the number text segments to return
      *  @param paragraph -- array -- of the paragraph
      *
      *  @return randomWord -- string -- of the random words
      *
    **********************************************/

    _randomWord: function(textCount, paragraph) {
      var words = paragraph.join(' ').split(' '),
          wordsLength = paragraph.length,
          randomWordIndex = this._randomizer(wordsLength),
          currentWord,
          randomWord = new String();

      // for each word requested, return random word from the randomized paragraph
      while (textCount > 0) {

        // loop to the first index if at the end of the array
        if (randomWordIndex >= wordsLength) {
          randomWordIndex = 0;
        }

        // set the current to the randomized index (randomized outside of the loop)
        currentWord = words[randomWordIndex];
        // for all words other than last, add a space
        if (textCount < wordsLength) {
          currentWord += ' ';
        }

        // combine all of the words, increase the random word index, and decrease the text count to exit loop
        randomWord += currentWord;
        randomWordIndex++;
        textCount--;
      }

      // return sting of the randomized words
      return randomWord;
    },

    /**********************************************
      *
      *  _photoAlbum method
      *
      *  -- handles the logic of where to get the placehold images from
      *
      *  @param width -- number -- of the requested width
      *  @param height -- number -- of the requested height
      *
      *  @return imageLink -- string -- of the formatted placeholder image link
      *
    **********************************************/

    _photoAlbum: function(width, height) {
      var photoAlbum = false,
          illustrator = this.options.illustrator,
          placeHold = 'placehold.it',
          placeKitten = 'placekitten.com',
          waterColor,
          imageLink;

      // if the request (from options), does not match a gallery, return placehold.it default
      switch (illustrator) {
        case placeHold:                     break;
        case placeKitten:                   break;
        default:  illustrator = placeHold;  break;
      }

      // call the watercolor method to add color and pass the library to it
      waterColor = this._waterColor(illustrator);

      // format the links based on the image gallery with the color/random option, height and width
      if (illustrator == placeKitten) {
        imageLink = 'http://placekitten.com/' + waterColor + width + '/' + height;
      } else {
        imageLink = 'http://placehold.it/' + width + 'x' + height + waterColor;
      }

      // return string of the resulting image url
      return imageLink;
    },

    /**********************************************
      *
      *  _waterColor method
      *
      *  -- handles the colors/other options the image providers offer
      *
      *  @param illustrator -- string -- of the user option for image gallery
      *
      *  @return waterColor -- string -- of the image variance
      *
    **********************************************/

    _waterColor: function(illustrator) {
      var paint = new Array(),
          placeKitten = 'placekitten.com',
          waterColor;

      // placekitten only offers regular and greyscale. set regular colors to false
      // color palette for placehold.it
      if (illustrator == placeKitten) {
        paint = [false, 'g'];
      } else {
        paint = ['453f35','e7cead','b5ab94','eba434','64886c','b15c3a','b1956c'];
      }

      // determine the length of the color options array
      waterColor = paint.length;
      // get a random number from the randomizer
      waterColor = this._randomizer(waterColor);
      // set that to the color index
      waterColor = paint[waterColor];

      // check if water color option is chosen (could be false for placekitten)
      // and format the color links
      if (waterColor) {
        if (illustrator == placeKitten) {
          waterColor = waterColor + '/';
        } else {
          waterColor = '/' + waterColor + '/fff';
        }
      } else {
        // else return a blank string for color
        waterColor = '';
      }

      // return the color option to be included in the url
      return waterColor;
    },

    /**********************************************
      *
      *  _datePicker method
      *
      *  -- handles the date logic of how to format
      *
      *  @param dateRequest -- string -- of the date type requested
      *
      *  @return engineDate -- string -- of the formatted date
      *
    **********************************************/

    _datePicker: function(dateRequest) {
      var cal = this.options.calendar,
          engineDate = new Date(),
          randomDate = false;

      // sets up the randomization if requested
      // does not handle regular date requests (ex. "M")
      if (dateRequest.split('-').length > 1) {
        
        // split on the dash
        dateRequest = dateRequest.split('-');
        
        // if the 2nd index is r, signifies randomization
        if (dateRequest[1].toLowerCase() == 'r') {
          // change the bool of whether to randomize to true
          randomDate = true;
        }

        // return the basic date request from the first index
        dateRequest = dateRequest[0];
      }

      // handles the day requests and returns based on format
      if (dateRequest == cal.dayNumberZeros || dateRequest == cal.dayTextThree || dateRequest == cal.dayNumber || dateRequest == cal.dayText) {
        // handles requests for day of week information
        if (dateRequest == cal.dayTextThree || dateRequest == cal.dayText || dateRequest == cal.dayTextThree) {
          
          // get the day from the browser
          engineDate = engineDate.getDay();

          // if randomization requested, send the week count to randomizer
          if (randomDate === true) {
            engineDate = this._randomizer(6);
          }

          // switch on the browser/randomized date to return a day of week
          switch (engineDate) {
            case 0: engineDate = 'Sunday';    break;
            case 1: engineDate = 'Monday';    break;
            case 2: engineDate = 'Tuesday';   break;
            case 3: engineDate = 'Wednesday'; break;
            case 4: engineDate = 'Thursday';  break;
            case 5: engineDate = 'Friday';    break;
            case 6: engineDate = 'Saturday';  break;
            default:                          break;
          }

          // if the 3 char text format requested ('Sun'), split the string
          if (dateRequest == cal.dayTextThree) {
            engineDate = engineDate.substr(0,3);
          }
        } else {

          // handles requests for day of month information

          // ex. jan "31"
          engineDate = engineDate.getDate();
          
          // randomize the month date if requested
          if (randomDate === true) {
            // for february...obviously this isnt a perfect system.
            engineDate = this._randomizer(28) + 1;
          }

          // if format requested is for leading 0, add it when less than 10 (and convert to string so its not cut out)
          if (dateRequest == cal.dayNumberZeros && engineDate < 10) {
            engineDate = '0' + engineDate.toString();
          }
        }
      } else if (dateRequest == cal.monthNumberZeros || dateRequest == cal.monthTextThree || dateRequest == cal.monthText || dateRequest == cal.monthNumber) {
        // handles requests for month information

        // set the date to the browser numeric month for all cases
        engineDate = engineDate.getMonth();

        // if randomization requested, override month and send months to randomizer
        if (randomDate === true) {
          engineDate = this._randomizer(12);
        }

        // handles requests for text formatted months
        if (dateRequest == cal.monthText || dateRequest == cal.monthTextThree) {

          // switch the month on the index
          switch (engineDate) {
            case 0:   engineDate = 'January';   break;
            case 1:   engineDate = 'February';  break;
            case 2:   engineDate = 'March';     break;
            case 3:   engineDate = 'April';     break;
            case 4:   engineDate = 'May';       break;
            case 5:   engineDate = 'June';      break;
            case 6:   engineDate = 'July';      break;
            case 7:   engineDate = 'August';    break;
            case 8:   engineDate = 'September'; break;
            case 9:   engineDate = 'October';   break;
            case 10:  engineDate = 'November';  break;
            case 11:  engineDate = 'December';  break;
            default:                            break;
          }

          // if the request is for shorthand month ('Jan'), split the string
          if (dateRequest == cal.monthTextThree) {
            engineDate = engineDate.substr(0,3);
          }
        } else if (dateRequest == cal.monthNumberZeros) {

          // if number formatting (leading zero) requested, convert to a string and add a zero
          engineDate = '0' + (engineDate + 1).toString();
        } else {

          // if number formatting (no leading zero), just account for the index
          engineDate += 1;
        }
      } else {
        // handles requests for year information

        // grab the year information from the browser
        engineDate = engineDate.getFullYear();

        // if randomization requested, override the browser
        if (randomDate === true) {

          // send 25 (for years) to the randomizer
          // this is definitely cheating, but keeps the dates year 2000-2025
          engineDate = this._randomizer(25);
          // if the resulting number is less than 10, convert to a string and prepend a string zero
          engineDate < 10 ? engineDate = '0' + engineDate.toString() : engineDate = engineDate.toString();
          // prepend 20 for to the date to return a reasonable date
          engineDate = '20' + engineDate;
        }

        // if the shorthand year is requested ("13"), split the string
        if (dateRequest == cal.yearNumberTwo) {
          engineDate = engineDate.toString().substr(2,3);
        }
      }

      // return all of the resulting dates to the scheduler
      return engineDate;
    }
  }

  /**********************************************
    *
    *  FUNCTION PROPERTY
    *  - this creates the plugin
    * 
    *  @param options -- object -- user configuration options
    *
  **********************************************/

  $.fn.roughDraft = function(options) {
    
    // wrapper around the constructor, that prevents against multiple instantiations
    return this.each(function() {
      // store through jquery data
      $.data(this, 'roughdraft', new $.RedPen(options, this));
    });
  };
})(jQuery,window,document);