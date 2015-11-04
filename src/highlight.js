// syntax highlighting with prism.js
import Prism from "prismjs-package";
import _ from "lodash";

// language aliases
var aliases = {
  "javascript": "js",
  "csharp": "c#",
};

_.pairs(aliases).forEach(p => {
  var lang = Prism.languages[p[0]];
  if (!lang) return;
  var alt = p[1];
  if (_.isString(alt)) {
    Prism.languages[alt] = lang;
  } else if (_.isArray(alt)) {
    alt.forEach(a => {
      Prism.languages[a] = lang;
    });
  }
});

export default function highlight(code, lang) {
  var g = Prism.languages[lang];
  if (g) {
    return Prism.highlight(code, g, lang);
  }
  return code;
}
