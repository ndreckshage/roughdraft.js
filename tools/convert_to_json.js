/*
// hacky way to generate json from paragraphs of text
*/

$(function() {

  var convert = $('#convert'),
      converter = $('#converter'),
      converted = $('#converted');

  function convertToJSON(convertParagraph) {
    // call function to take out ellipses so they don't conflict
    convertParagraph = ellipses(convertParagraph,"...","<ELLIPSES>");

    // split returned string on periods to create array
    convertParagraph = convertParagraph.split('.');

    // this gets rid of any blank indexes
    convertParagraph = $.grep(convertParagraph,function(n){
      return(n);
    });

    // TO DO, reference in jquery foreach? foreach ($x as &$y)...
    var convertEach = new Array();

    // put the ellipses back in and add a period
    $.each(convertParagraph, function(key, value) {
      value = ellipses(value,"<ELLIPSES>","...");
      value = value + ".";
      // kill leading/trailing spaces
      value = value.replace(/(^\s+|\s+$)/g, '');
      convertEach.push(value);
    });

    // seems silly, set convert paragraph back to convert each
    convertParagraph = convertEach;

    // convert it to JSON and return
    return JSON.stringify(convertParagraph);
  }

  function ellipses(convertParagraph,search,replace){
    var position = convertParagraph.indexOf(search);
    while (typeof position === 'number' && position > 0) {
      convertParagraph = convertParagraph.replace(search, replace);
      position = convertParagraph.indexOf(search);
    }
    return convertParagraph;
  }

  // when button is clicked
  converter.on('click', function() {
    // grab the value of the input
    convertParagraph = convert.val();
    // send it through the convert function
    convertParagraph = convertToJSON(convertParagraph);
    // and place it in the other input
    converted.val(convertParagraph);
  });

});