const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//get_nation = string ; tactician, arcane, covert = boolean
function get_spy_count(get_nation, tactician, arcane, covert) {
  let safety = 1; //do not touch (changing will break)
  let odds = 50; //do not touch (changing will break)
  
  for (var counter = 0; counter < 60; counter++) {
    var xmlHttp = new XMLHttpRequest();
    var url = 'https://politicsandwar.com/war/espionage_get_odds.php?id1='+get_nation+'&id2='+get_nation+'&id3=0&id4=1&id5='+(counter + 1)
    xmlHttp.open('GET', url, false);
    xmlHttp.send(null);
    var spies = xmlHttp.responseText;
    if (spies == 'Greater than 50%') {
      var spy = (counter + 1);
      spy = ((safety * 25) + (spy * 100) - odds) / (3 * (odds - (safety * 25)));
      if (tactician == true || covert == true) {
        spy = spy / 0.75;
      }
      else if (arcane == true) {
        spy = spy * 0.75;
      }
      break;
    }
    else if (counter == 59) {
      var spy = 60;
    }
  }
  return spy;
}

console.log(get_spy_count('193160', false, false, false));
