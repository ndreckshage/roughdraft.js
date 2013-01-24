$(function(){
  $(window).roughDraft({
    'author' : 'baconipsum.com',
    'illustrator' : 'placehold.it',
    'thesaurus': 'assets/js/roughdraft.thesaurus.json'
  });
  $('.example_contain').masonry({
    itemSelector: '.example_element'
  });

  prettyPrint();
});