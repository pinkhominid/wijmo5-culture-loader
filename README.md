# wijmo5-culture-loader

Dynamically load/switch Wijmo 5 cultures. Will cache previously loaded cultures for efficiency. That way if a culture is requested that was already loaded there is no need to reload.

## Example

```javascript
loadWijmo5Culture(tag)
// Where tag is a wijmo supported IETF language tag (e.g. en, en-CA, es, fr-CA)
```

## Configuration

```javascript
// Replace with your Wijmo 5 cultures path
loadWijmo5Culture._path = 'node_modules/wijmo5/controls/cultures/'
```
