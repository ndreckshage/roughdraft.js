$(function(){

  // DEFAULT OPTIONS
  // $(window).roughDraft();

  // TEXT API + IMAGE ALT
  // $(window).roughDraft({
  //   author      : 'lebowski',
  //   illustrator : 'placehold',
  //   paintColor  : ['000', 'd0d0d0']
  // });

  //CUSTOM LIBRARY
  // $(window).roughDraft({
  //   author      : 'lebowskiipsum.com',
  //   customIpsum : true
  // });

  // FULL OPTIONS
  $(window).roughDraft({
    author      : 'lebowskiipsum.com',
    illustrator : 'localsvg',
    timeout: 5000,
    customIpsum: true,
    customIpsumPath: "../../roughdraft.thesaurus.json",
    localUserThesaurus: "../../roughdraft.thesaurus.json",
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

  /*
  // LOREM PIXEL
  $(window).roughDraft({
    illustrator : "placekitten",
    author: "tunaipsum.com",
    customIpsum: true,
    customIpsumPath: "../../roughdraft.thesaurus.json"
    localUserThesaurus: "../../roughdraft.thesaurus.json",
  });
  */

});
