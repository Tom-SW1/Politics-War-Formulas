const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//get_nation = string ; tactician, arcane, covert = boolean
function get_spy_count(get_nation, tactician, arcane, covert) {
  const safety = 1; //do not touch (changing will break)
  const odds = 50; //do not touch (changing will break)
  
  let min = 0;
  let max = 60;
  while (min <= max) {
    var median = Math.round((min + max) / 2);
    var xmlHttp = new XMLHttpRequest();
    var url = 'https://politicsandwar.com/war/espionage_get_odds.php?id1='+get_nation+'&id2='+get_nation+'&id3=0&id4=1&id5='+median;
    xmlHttp.open('GET', url, false);
    xmlHttp.send(null);
    var spies = xmlHttp.responseText;
    if (spies == 'Greater than 50%') {
      var xmlHttp = new XMLHttpRequest();
      var url = 'https://politicsandwar.com/war/espionage_get_odds.php?id1='+get_nation+'&id2='+get_nation+'&id3=0&id4=1&id5='+(median - 1);
      xmlHttp.open('GET', url, false);
      xmlHttp.send(null);
      var check = xmlHttp.responseText;
      if (check == 'Greater than 50%') {
        max = median - 1;
      }
      else {
        var spy = median;
        break;
      }
    }
    else {
      min = median + 1;
    }
  }
  spy = ((safety * 25) + (spy * 100) - odds) / (3 * (odds - (safety * 25)));
  if (tactician == true || covert == true) {
    spy = spy / 0.75;
  }
  else if (arcane == true) {
    spy = spy * 0.75;
  }
  return spy;
}

console.log(get_spy_count('193160', false, false, false));
