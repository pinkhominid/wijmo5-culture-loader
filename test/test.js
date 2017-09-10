const test = require('tape')
const sinon = require('sinon')
const loader = require('../lib/wijmo5-culture-loader')

test('test loadWijmo5Culture fn', t => {
  const scriptObj = {}
  const winObj = {
    document: {
      createElement: () => scriptObj,
      head: {
        appendChild: () => {}
      }
    },
    wijmo: {
      culture: {
        Globalize: {
          name: 'en'
        }
      },
      _updateCulture: () => {}
    }
  }

  const createElementSpy = sinon.spy(winObj.document, 'createElement')
  const appendChildSpy = sinon.spy(winObj.document.head, 'appendChild')
  const _updateCultureSpy = sinon.spy(winObj.wijmo, '_updateCulture')

  t.equal(typeof loader, 'function', 'fn exists')

  t.notOk(loader(), 'return false when no wijmo')

  loader.__context = winObj

  t.notOk(loader(), 'return false when no tag arg')

  t.notOk(loader('en'), 'return false when culture already loaded')

  t.ok(loader('es'), 'return true when loading culture')
  t.ok(loader.__db.en, 'save prev culture when loading new culture')
  t.ok(
    createElementSpy.withArgs('script').calledOnce,
    'createElement(\'script\') called when loading culture'
  )
  t.ok(
    appendChildSpy.withArgs(scriptObj).calledOnce,
    'appendChild(script) called when loading culture'
  )
  t.equal(
    scriptObj.src,
    loader._path + 'wijmo.culture.es.min.js',
    'properly set script src when loading culture')

  loader.__db.fr = { Globalize: { name: 'fr' } }
  t.ok(loader('fr'), 'return true when looking up prev culture')
  t.equal(winObj.wijmo.culture.Globalize.name, 'fr', 'properly set culture when looking up prev culture')
  t.ok(
    _updateCultureSpy.calledOnce,
    '_updateCulture() called when looking up prev culture'
  )

  t.end()
})
