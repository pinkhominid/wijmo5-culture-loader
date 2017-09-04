// Dynamically load/switch Wijmo 5 cultures
// Accepts supported IETF language tags (e.g. en, en-CA, en-GB, es, fr-CA, nl, pt)
function loadWijmo5Culture (tag) {
  var wijmo = loadWijmo5Culture.__context.wijmo

  // expects wijmo and tag
  if (!wijmo || !tag) return false

  var origTag = wijmo.culture.Globalize.name

  // nothing to do
  if (tag === origTag) return false

  // save off orig culture
  loadWijmo5Culture.__db[origTag] = wijmo.culture

  // lookup new culture
  var newCulture = loadWijmo5Culture.__db[tag]

  // if new culture was previously saved
  if (newCulture) {
    wijmo.culture = newCulture
    // lifted from wijmo.cultures; this tells wijmo controls to update
    var updc = wijmo._updateCulture
    if (updc) updc()
    return true
  }

  // load new culture
  var document = loadWijmo5Culture.__context.document
  var script = document.createElement('script')
  document.head.appendChild(script)
  script.src = loadWijmo5Culture._path + 'wijmo.culture.' + tag + '.min.js'
  return true
}

// CONFIG

// replace with your Wijmo 5 cultures path
loadWijmo5Culture._path = 'node_modules/wijmo5/controls/cultures/'

// default context is window
loadWijmo5Culture.__context = this

// cultures database
loadWijmo5Culture.__db = {}

// EXPORT so we can unit test in node
if (typeof module !== 'undefined' && module.exports) {
  module.exports = loadWijmo5Culture
}
