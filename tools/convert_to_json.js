/*
// hacky way to generate json from paragraphs of text
*/

$(function() {

  var convert = $('.convert').html();

  function ellipses(convert,search,replace){
    var position = convert.indexOf(search);
      while (typeof position === 'number' && position > 0) {
        convert = convert.replace(search, replace);
        position = convert.indexOf(search);
      }
    return convert;
  }

  // take out ellipses so they don't conflict
  convert = ellipses(convert,"...","<ELLIPSES>");

  // split on periods
  convert = convert.split('.');

  // this gets rid of any blank indexes
  convert = $.grep(convert,function(n){
    return(n);
  });

  // TO DO, reference in jquery foreach? foreach ($x as &$y)...
  var convertEach = new Array();

  // put the ellipses back in and add a period
  $.each(convert, function(key, value) {
    value = ellipses(value,"<ELLIPSES>","...");
    value = value + ".";
    convertEach.push(value);
  });

  // seems silly
  convert = convertEach;

  // convert it to JSON
  convert = JSON.stringify(convert);

  // replace the paragraph div with the JSON
  $('.convert').text(convert);

});