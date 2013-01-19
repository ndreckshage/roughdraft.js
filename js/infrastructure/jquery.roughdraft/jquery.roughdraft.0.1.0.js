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

  // roughdraft object constructor
  // options -- an object of configuration options
  // element -- the element the instance was created on
  $.RedPen = function(options, element) {
    this.name = 'roughdraft';
    this.element = $(element);
    this._create(options)
    this._init();
  }

  // roughdraft default settings
  // can/should be overwritten
  $.RedPen.settings = {
    author: 'example1',
    illustrator: 'example1',
    thesaurus: '/js/infrastructure/jquery.roughdraft/roughdraft.thesaurus.json'
  }

  // roughdraft prototype
  $.RedPen.prototype = {

    // sets up roughdraft
    // options -- configuration options passed in by constructor
    _create: function(options){

      // allows default options to be overwritten
      this.options = $.extend(true, {}, $.RedPen.settings, options);

      // sets up selector variables
      var draftRepeat = $('[data-draft-repeat]'),
          draftImage

      // call the functions if the selectors are present in the dom
      if (draftRepeat.length) {
        this.scanner(draftRepeat);
      }

      this.plagerizer();

    },

    // first when instance first created/triggered second time
    _init : function() {
    },

    // set options after initialization
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
    scanner: function (draftRepeat) {

      var dataTag = 'data-',
          draftRepeatBare = 'draft-repeat';

      $.each(draftRepeat, function(){
        var repeatCount = $(this).data(draftRepeatBare),
            repeatNode = $(this).removeAttr(dataTag + draftRepeatBare);
        for (var i = 0; i < repeatCount - 1; i++){
          repeatNode.clone().insertAfter(this);
        }
      });

    },

    plagerizer: function() {

      var author = this.options.author,
          thesaurus;

      thesaurus = this._thesaurus(author);
      
    },

    doodler: function() {

    },

    scheduler: function() {
      
    },

    _thesaurus: function(author) {

      var thesaurus = false;

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

    }
  
  }

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