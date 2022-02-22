import requests

#get_nation = string ; tactician, arcane, covert = boolean
def get_spy_count(get_nation, tactician, arcane, covert):
  safety = 1 #do not touch (changing will break)
  odds = 50 #do not touch (changing will break)
  
  for counter in range(0,60):
    spies = requests.get(f'https://politicsandwar.com/war/espionage_get_odds.php?id1={get_nation}&id2={get_nation}&id3=0&id4=1&id5={counter + 1}').text
    if spies == 'Greater than 50%':
      spy = (counter + 1)
      spy = ((safety * 25) + (spy * 100) - odds) / (3 * (odds - (safety * 25)))
      if tactician == True or covert == True:
        spy = spy / 0.75
      elif arcane == True:
        spy = spy * 0.75
      break
    elif counter == 59:
      spy = 60
  return spy

print(get_spy_count('193160', False, False, False))