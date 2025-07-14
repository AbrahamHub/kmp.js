var kmpSearch = function(s, w) {
  var slen = s.length,
      wlen = w.length;
  
  // Casos edge básicos
  if (wlen === 0) return 0;
  if (slen === 0 || wlen > slen) return -1;
  
  s = s.split("");
  w = w.split("");    
          
  var T = kmp_table(w);
  
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

function testKMPSpecCompliant() {
  console.log("=== PRUEBAS DE IMPLEMENTACIÓN KMP SEGÚN ESPECIFICACIÓN  ===\n");
  
  console.log("1. EJEMPLO PRINCIPAL:");
  var result1 = kmpSearch("ABC ABCDAB ABCDABCDABDE", "ABCDABD");
  console.log(`   Texto: "ABC ABCDAB ABCDABCDABDE"`);
  console.log(`   Patrón: "ABCDABD"`);
  console.log(`   Resultado: ${result1} (esperado: 15) - ${result1 === 15 ? 'PASS' : 'FAIL'}\n`);
  
  console.log("2. VERIFICACIÓN DE TABLA DE EJEMPLO:");
  var testPattern = "ABCDABD".split("");
  var table = kmp_table(testPattern);
  var expectedTable = [-1, 0, 0, 0, -1, 0, 2, 0];
  console.log(`   Patrón: "ABCDABD"`);
  console.log(`   Tabla calculada: [${table.slice(0, 8).join(', ')}]`);
  console.log(`   Tabla esperada:  [${expectedTable.join(', ')}]`);
  var tableCorrect = table.slice(0, 8).every((val, i) => val === expectedTable[i]);
  console.log(`   Tabla correcta: ${tableCorrect ? 'PASS' : 'FAIL'}\n`);
  
  console.log("3. CASOS ADICIONALES:");
  var tests = [
    ["AABAACAADAABAABA", "AABA", 0],
    ["AABAACAADAABAABA", "AABAABA", 9],
    ["hello world", "world", 6],
    ["hello world", "xyz", -1],
    ["ABCDABD", "ABCDABD", 0],
    ["A", "A", 0],
    ["AB", "B", 1],
    ["", "test", -1],
    ["test", "", 0]
  ];
  
  tests.forEach(function(test, i) {
    var result = kmpSearch(test[0], test[1]);
    var expected = test[2];
    console.log(`   Test ${i + 1}: ${result === expected ? 'PASS' : 'FAIL'}`);
    console.log(`     Entrada: "${test[0]}", Patrón: "${test[1]}"`);
    console.log(`     Esperado: ${expected}, Obtenido: ${result}`);
  });
  
  console.log("\n=== ANÁLISIS DE TABLAS===");
  
  var patterns = [
    { pattern: "ABACABAB", expected: [-1, 0, -1, 1, -1, 0, -1, 3, 2] },
    { pattern: "ABACABABA", expected: [-1, 0, -1, 1, -1, 0, -1, 3, -1, 3] }
  ];
  
  patterns.forEach(function(p, i) {
    console.log(`\nTabla ${i + 1} - Patrón: "${p.pattern}"`);
    var calculated = kmp_table(p.pattern.split(""));
    console.log(`Calculada: [${calculated.slice(0, p.pattern.length).join(', ')}]`);
    console.log(`Esperada:  [${p.expected.slice(0, p.pattern.length).join(', ')}]`);
    var correct = calculated.slice(0, p.pattern.length).every((val, idx) => val === p.expected[idx]);
    console.log(`Correcta: ${correct ? 'PASS' : 'FAIL'}`);
  });
}

function debugTableConstruction(pattern) {
  console.log(`\nDEBUG: Construcción de tabla para "${pattern}"`);
  var W = pattern.split("");
  var T = new Array(W.length + 1);
  var pos = 1;
  var cnd = 0;
  
  T[0] = -1;
  console.log(`T[0] = -1`);
  
  while (pos < W.length) {
    console.log(`\npos=${pos}, cnd=${cnd}, W[pos]="${W[pos]}", W[cnd]="${W[cnd]}"`);
    
    if (W[pos] === W[cnd]) {
      T[pos] = T[cnd];
      console.log(`  Match: T[${pos}] = T[${cnd}] = ${T[cnd]}`);
    } else {
      T[pos] = cnd;
      console.log(`  No match: T[${pos}] = ${cnd}`);
      while (cnd >= 0 && W[pos] !== W[cnd]) {
        cnd = T[cnd];
        console.log(`    Backtrack: cnd = T[${cnd}] = ${cnd}`);
      }
    }
    pos = pos + 1;
    cnd = cnd + 1;
    console.log(`  Update: pos=${pos}, cnd=${cnd}`);
  }
  
  T[pos] = cnd;
  console.log(`Final: T[${pos}] = ${cnd}`);
  console.log(`Tabla final: [${T.join(', ')}]`);
}

testKMPSpecCompliant();
function testBoundaryCases() {
  console.log("\n=== CASOS DE PRUEBA: DENTRO, SOBRE Y FUERA DE LA FRONTERA ===");

  console.log("\n1. DENTRO DE LA FRONTERA:");
  
  let result1 = kmpSearch("ABCDABC", "ABC");
  console.log(`   Medio: "ABCDABC" busca "ABC" -> ${result1} (esperado 0) [${result1 === 0 ? 'PASS' : 'FAIL'}]`);
  
  let result2 = kmpSearch("ABABABAC", "ABABAC");
  console.log(`   Solapamiento: "ABABABAC" busca "ABABAC" -> ${result2} (esperado 2) [${result2 === 2 ? 'PASS' : 'FAIL'}]`);
  
  let result3 = kmpSearch("AAABAAA", "AAA");
  console.log(`   Múltiples: "AAABAAA" busca "AAA" -> ${result3} (esperado 0) [${result3 === 0 ? 'PASS' : 'FAIL'}]`);

  console.log("\n2. SOBRE LA FRONTERA:");
  
  let result4 = kmpSearch("", "");
  console.log(`   Ambos vacíos: "" busca "" -> ${result4} (esperado 0) [${result4 === 0 ? 'PASS' : 'FAIL'}]`);
  
  let result5 = kmpSearch("EXACTO", "EXACTO");
  console.log(`   Iguales: "EXACTO" busca "EXACTO" -> ${result5} (esperado 0) [${result5 === 0 ? 'PASS' : 'FAIL'}]`);
  
  let result6 = kmpSearch("PRIMERO", "P");
  console.log(`   Primer carácter: "PRIMERO" busca "P" -> ${result6} (esperado 0) [${result6 === 0 ? 'PASS' : 'FAIL'}]`);
  
  let result7 = kmpSearch("ULTIMO", "O");
  console.log(`   Último carácter: "ULTIMO" busca "O" -> ${result7} (esperado 5) [${result7 === 5 ? 'PASS' : 'FAIL'}]`);

  console.log("\n3. FUERA DE LA FRONTERA:");
  
  let result8 = kmpSearch("NO", "NO CABE");
  console.log(`   Patrón largo: "NO" busca "NO CABE" -> ${result8} (esperado -1) [${result8 === -1 ? 'PASS' : 'FAIL'}]`);
  
  let result9 = kmpSearch("", "AUSENTE");
  console.log(`   Texto vacío: "" busca "AUSENTE" -> ${result9} (esperado -1) [${result9 === -1 ? 'PASS' : 'FAIL'}]`);
  
  let result10 = kmpSearch("ABC", "XYZ");
  console.log(`   Inexistente: "ABC" busca "XYZ" -> ${result10} (esperado -1) [${result10 === -1 ? 'PASS' : 'FAIL'}]`);
  
  let result11 = kmpSearch("FIN", "INVALIDO");
  console.log(`   Falta longitud: "FIN" busca "INVALIDO" -> ${result11} (esperado -1) [${result11 === -1 ? 'PASS' : 'FAIL'}]`);
}

testKMPSpecCompliant();
testBoundaryCases();
