var SEED = 5381;

function text2hash(x, h) {
  var i = x.length;

  if (arguments.length === 1) {
      h = SEED;
  }

  while (i) {
    h = (h * 33) ^ x.charCodeAt(--i);
  }

  return h;
}

var charsLength = 52;

function code2char(code) {
  return String.fromCharCode(code + (code > 25 ? 39 : 97));
}
  
function hash2sign(code) {
  var name = '';
  var x;
  for (x = Math.abs(code); x > charsLength; x = (x / charsLength) | 0) {
    name = code2char(x % charsLength) + name;
  }
  return (code2char(x % charsLength) + name);
}

export default function text2sign(text) {
  return hash2sign(text2hash(text));
}