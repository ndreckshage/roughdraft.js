/*
// jQuery RoughDraft.js Plugin
// Version 0.1.0
// Copyright Nick Dreckshage, licensed GPL & MIT
// https://github.com/ndreckshage/roughdraft.js
*/

// semi-colon as safety net against concatenated scripts that are improperly closed
;(function($,window,document,undefined){

  // undefined to protect against undefined, mutatable global in ECMAScript 3
  // window and document as local variables to quicken resolution

  /**********************************************
    *
    *  CONSTRUCTOR
    *
    *  @param options -- object -- user configuration options
    *  @param element -- object -- element the instance was created on
    *
  **********************************************/

  $.RedPen = function(options, element) {
    this.name = 'roughdraft';
    this.element = $(element);
    this._create(options)
    this._init();
  }

  /**********************************************
    *
    *  DEFAULT SETTINGS
    *  - these can/should be overwritten
    *
  **********************************************/

  $.RedPen.settings = {
    author: 'lebowskiipsum.com',
    illustrator: 'example1',
    thesaurus: '/js/infrastructure/jquery.roughdraft/roughdraft.thesaurus.json'
  }

  /**********************************************
    *
    *  FULL SCOPE VARIABLES
    *
  **********************************************/

  var dataTag = 'data-',
      paragraphType = "p",
      sentenceType = "s",
      wordType = "w";

  /**********************************************
    *
    *  PROTOTYPE
    *
  **********************************************/

  $.RedPen.prototype = {

    // sets up roughdraft
    // options -- configuration options passed in by constructor

    /**********************************************
      *
      *  _create method
      *
      *  @param options -- object -- user configuration options
      *
    **********************************************/

    _create: function(options){

      // allows default options to be overwritten
      this.options = $.extend(true, {}, $.RedPen.settings, options);

      // sets up selector variables
      var draftRepeat = $('[data-draft-repeat]'),
          draftText = $('[data-draft-text]'),
          draftImage = $('[data-draft-image]'),
          draftDate = $('[data-draft-date]');


      // call the functions if the selectors are present in the dom
      if (draftRepeat.length) {
        this.scanner(draftRepeat);
      }
      if (draftText.length) {
        this.plagerizer(draftText);
      }
      if (draftImage.length) {
        this.doodler(draftImage);
      }
      if (draftDate.length) {
        this.scheduler(draftDate);
      }

    },

    // first when instance first created/triggered second time
    
    /**********************************************
      *
      *  _init method
      *
    **********************************************/

    _init : function() {
    },

    // set options after initialization

    /**********************************************
      *
      *  options method
      *
      *  @param key
      *  @param value
      *
      *  @return this
      *
    **********************************************/

    option: function(key, value){
      // signature: $('#foo').bar({ cool:false });
      if ($.isPlainObject(key)){
        this.options = $.extend(true, this.options, key);
      }

      // option is called first and is then chained to the _init method.
      return this; 
    },

    // handles instances of draft repeat. duplicates and appends them in dom. mimics loops
    // draftRepeat -- data selector passed in through _create

    /**********************************************
      *
      *  scanner method
      *
      *  @param draftRepeat
      *
    **********************************************/

    scanner: function (draftRepeat) {

      var draftRepeatBare = 'draft-repeat',
          repeatCount,
          repeatNode;

      $.each(draftRepeat, function(){
        repeatCount = $(this).data(draftRepeatBare),
        repeatNode = $(this).removeAttr(dataTag + draftRepeatBare);
        for (var i = 0; i < repeatCount - 1; i++){
          repeatNode.clone().insertAfter(this);
        }
      });

    },

    /**********************************************
      *
      *  plagerizer method
      *
      *  @param draftText
      *
    **********************************************/

    plagerizer: function(draftText) {

      var draftTextBare = 'draft-text',
          textData,
          textCount,
          textType;

      for (var i = 0; i < draftText.length; i++) {
        
        var self = $(draftText[i]);

        textData = self.data(draftTextBare);
        if (typeof textData === 'string') {

          textData = textData.split('/');
          textCount = parseInt(textData[0]);
          textType = textData[1].toLowerCase();

          if (isNaN(textCount)) {
            textCount = false;
          }
          if (typeof textType !== 'string') {
            textType = false;
          }

          if (textCount && textType) {
            console.log(this._openToRandomPage(textCount,textType));
          } else {
            console.log("Please ensure that you specify Paragraph/Sentence/Word in the format 3/S, for 3 sentences");
          }
        }
      }
      
    },

    /**********************************************
      *
      *  doodler method
      *
      *  @param draftImage
      *
    **********************************************/

    doodler: function(draftImage) {

    },

    /**********************************************
      *
      *  scheduler method
      *
      *  @param draftDate
      *
    **********************************************/

    scheduler: function(draftDate) {
      
    },

    /**********************************************
      *
      *  _openToRandomPage method
      *
      *  @param textCount
      *  @param textType
      *
      *  @return
      *
    **********************************************/

    _openToRandomPage: function(textCount, textType) {
      var thesaurus = this._thesaurus(),
          paragraphSentences,
          randomParagraph = new Array(),
          randomResult = '';

      randomParagraph = this._randomParagraph(textCount, textType, thesaurus);
      paragraphSentences = randomParagraph.length;

      switch(textType) {
        case paragraphType:
          randomResult = randomParagraph.join(' ');
          break;
        case sentenceType:
          randomResult = this._randomSentence(textCount, randomParagraph, paragraphSentences);
          break;
        case wordType:
          randomResult = this._randomWord(textCount, randomParagraph);
          break;
        default:
          break;
      }

      return randomResult;
    },

    /**********************************************
      *
      *  _randomParagraph method
      *
      *  @param textCount
      *  @param textType
      *  @param thesaurus
      *
    **********************************************/

    _randomParagraph: function(textCount, textType, thesaurus) {
      var totalParagraphs = thesaurus.length,
          randomParagraphIndex,
          currentParagraph,
          randomParagraph = new Array();

      if (textType != paragraphType) {
        randomParagraphIndex = this._randomizer(totalParagraphs);
        randomParagraph = thesaurus.splice(randomParagraphIndex, 1)[0];

      } else {
        
        while (textCount > 0) {

          // rebuild the paragraphs if looped through and we need more

          if (totalParagraphs <= 0) {
            thesaurus = this._thesaurus();
            totalParagraphs = thesaurus.length;
          }
          
          // TO DO -- add line breaks between paragraphs, currently just a string of text

          randomParagraphIndex = this._randomizer(totalParagraphs);
          currentParagraph = thesaurus.splice(randomParagraphIndex, 1)[0];
          randomParagraph = randomParagraph.concat(currentParagraph);

          totalParagraphs--;
          textCount--;
        }
      }

      return randomParagraph;
    },

    /**********************************************
      *
      *  _randomSentence method
      *
      *  @param textCount
      *  @param paragraph
      *  @param paragraphLength
      *
    **********************************************/

    _randomSentence: function(textCount, paragraph, paragraphLength) {
      var initialTextCount = textCount,
          randomSentenceIndex = this._randomizer(paragraphLength),
          nextSentenceIndex = randomSentenceIndex + 1,
          currentSentence,
          randomSentence = new String();

      while (textCount > 0) {
        if (textCount != initialTextCount) {
          nextSentenceIndex++;
          if (nextSentenceIndex >= paragraphLength) {
            nextSentenceIndex = 0;
          }
          currentSentence = paragraph[nextSentenceIndex];
        } else {
          currentSentence = paragraph[randomSentenceIndex];
        }

        if (textCount < paragraphLength) {
          currentSentence = currentSentence + ' ';
        }
   
        randomSentence += currentSentence;
        textCount--;
      }

      return randomSentence;
    },

    /**********************************************
      *
      *  _randomWord method
      *
      *  @param textCount
      *  @param paragraph
      *
    **********************************************/

    _randomWord: function(textCount, paragraph) {
      var words = paragraph.join(' ').split(' '),
          wordsLength = paragraph.length,
          randomWordIndex = this._randomizer(wordsLength),
          currentWord,
          randomWord = new String();

      while (textCount > 0) {
        if (randomWordIndex >= wordsLength) {
          randomWordIndex = 0;
        }
        currentWord = words[randomWordIndex];
        if (textCount < wordsLength) {
          currentWord += ' ';
        }
        randomWord += currentWord;
        randomWordIndex++;
        textCount--;
      }

      return randomWord;
    },

    /**********************************************
      *
      *  _thesaurus method
      *
      *  @param author
      *
    **********************************************/

    _thesaurus: function() {

      var thesaurus = false,
          author = this.options.author;

      $.ajax({
        url: this.options.thesaurus,
        dataType: 'json',
        async: false,
        success: function(data) {
          thesaurus = data;
        }
      });

      if (thesaurus === false) {
        console.log('There was an issue with the AJAX request in the _thesaurus method. ' +
          'Please ensure that ' + this.options.thesaurus + ' is your correct relative path.');
      } else {
        return thesaurus[author];
      }
    },

    /**********************************************
      *
      *  _randomizer method
      *
      *  @param number
      *
      *  @return
      *
    **********************************************/

    _randomizer: function(number) {
      return Math.floor(Math.random() * number);
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
      var instance = $.data(this, 'roughdraft');
      if (instance) {
        instance.option(options || {});
        instance._init();
      } else {
        $.data(this, 'roughdraft', new $.RedPen(options, this));
      }
    });
  
  };

})(jQuery,window,document);