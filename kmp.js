// Searches for the starting position of a string w in a string s using
// Knuth-Morris-Pratt.
var kmpSearch = function(s, w) {
  var slen = s.length,
      wlen = w.length;
  
  if (wlen === 0) return 0;
  if (slen === 0 || wlen > slen) return -1;
  
  // String to array conversion (opcional para mantener tu estilo)
  s = s.split("");
  w = w.split("");    
          
  // Construct the lookup table 
  var T = kmp_table(w);
  
  // Perform the search
  var j = 0; // position of current character in S
  var k = 0; // position of current character in W
  
  while (j < slen) {
    if (w[k] === s[j]) {
      j = j + 1;
      k = k + 1;
      if (k === wlen) {
        return j - k; // occurrence found
      }
    } else {
      k = T[k];
      if (k < 0) {
        j = j + 1;
        k = k + 1;
      }
    }
  }
  
  return -1;
};

function kmp_table(W) {
  var T = new Array(W.length + 1); // +1 para el caso T[length(W)]
  
  var pos = 1; // current position we are computing in T
  var cnd = 0; // index in W of next character of current candidate substring
  
  T[0] = -1;
  
  while (pos < W.length) {
    if (W[pos] === W[cnd]) {
      T[pos] = T[cnd];
    } else {
      T[pos] = cnd;
      while (cnd >= 0 && W[pos] !== W[cnd]) {
        cnd = T[cnd];
      }
    }
    pos = pos + 1;
    cnd = cnd + 1;
  }
  
  T[pos] = cnd; // only needed when all word occurrences are searched
  
  return T;
}