/*
// hacky way to generate json from paragraphs of text
*/

$(function() {

  var convert = $('#convert'),
      converter = $('#converter'),
      converted = $('#converted'),
      paragraphsArray,
      sentencesArray,
      paragraphsCount,
      paragraphs,
      paragraph,
      sentences,
      ipsum;

  function convertToJSON(ipsum) {

    // split the paragraphs on new lines
    paragraphs = ipsum.split('\n');

    // take out empty indexes
    paragraphs = removeEmptyIndexes(paragraphs);

    // count total paragraphs to convert
    paragraphsCount = paragraphs.length;

    paragraphsArray = new Array();

    for (var i = 0; i < paragraphsCount; i++) {

      // set paragraph to position index
      paragraph = paragraphs[i];

      // call function to take out ellipses so they don't conflict
      paragraph = ellipses(paragraph,"...","<ELLIPSES>");
  
      // split returned string on periods to create array
      sentences = paragraph.split('.');

      // take out empty indexes
      sentences = removeEmptyIndexes(sentences);

      sentencesArray = new Array();

      // put the ellipses back in and add a period
      $.each(sentences, function(key, value) {
        value = ellipses(value,"<ELLIPSES>","...");
        value = value + ".";
        // kill leading/trailing spaces
        value = value.replace(/(^\s+|\s+$)/g, '');
        sentencesArray.push(value);
      });

      // add the paragraph to array of paragraphs
      paragraphsArray.push(sentencesArray);
    }

    // convert it to JSON and return
    return JSON.stringify(paragraphsArray);
  }

  function removeEmptyIndexes(text){
    // this gets rid of any blank indexes
    return $.grep(text,function(n){
      return(n);
    });
  }

  function ellipses(text,search,replace){
    var position = text.indexOf(search);
    while (typeof position === 'number' && position > 0) {
      text = text.replace(search, replace);
      position = text.indexOf(search);
    }
    return text;
  }

  // when button is clicked
  converter.on('click', function() {
    // grab the value of the input
    ipsum = convert.val();
    console.log(ipsum);
    // send it through the convert function
    ipsum = convertToJSON(ipsum);
    // and place it in the other input
    converted.val(ipsum);
  });

});