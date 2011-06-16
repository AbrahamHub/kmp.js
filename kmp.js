// Searches for the starting position of a string w in a string s using
// Knuth-Morris-Pratt.
var kmpSearch = function(s, w) {
  var slen = s.length,
      wlen = w.length;
  
  // String to array conversion.
  s = s.split("");
  w = w.split("");    
          
  // Construct the lookup table.
  var t = new Array(wlen);
  t[0] = -1;
  t[1] = 0;
  for (var pos = 2, cnd = 0; pos < wlen; ) {
    if (w[pos-1] === w[cnd]) {
      t[pos] = cnd + 1;
      pos++; cnd++;
    } else if (cnd > 0) {
      cnd = t[cnd];
    } else {
      t[pos++] = 0;
    }
  }

  // Perform the search.
  var m = 0, i = 0;
  while (m + i < slen) {
    if (s[m + i] === w[i]) {
      i++;
      if (i === wlen) {
        return m;
      }
    } else {
      m += i - t[i];
      i = t[i] > -1 ? t[i] : 0;
    }
  }
  return -1;
};
