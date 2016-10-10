recastai-recognizer
===================

An MS Bot Framework `IIntentRecognizer` implementation for Recast.ai

## Prereqs
* [Recast.ai node.js client, at least version 2](https://www.npmjs.com/package/recastai)
* [MS Bot Framework node.js SDK](https://www.npmjs.com/package/botbuilder) - though not a technical dependency of this module.

## Installation
```bash
npm install recastai-recognizer
```

## usage
The recognizer is used in basically the same way as the 
[LUIS recognizer plugin](https://docs.botframework.com/en-us/node/builder/guides/understanding-natural-language) 
packaged with the MS Bot Framework SDK. 
It uses the [Recast.ai node.js client module](https://www.npmjs.com/package/recastai) 
to communicate with your Recast.ai bot:
```javascript
/*
 * The Recast.ai-specific bit
 */
var rairec = require('recastai-recognizer')
var recognizer = new rairec.RecastRecognizer(YOUR_TOKEN, YOUR_LANGUAGE)

/*
 * Standard MS Bot Framework stuff
 */
var builder = require('botbuilder')
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
var bot = new builder.UniversalBot(MS_BOT_FMWK_CONNECTOR)
bot.dialog('/', intents)

/*
 * Matching against one Recast.ai intent
 */
dialog.matchesAny('YOUR_INTENT', function(session, args) {
    ...
}

/*
 * Matching against one of a number of Recast.ai intents
 */
dialog.matchesAny(['YOUR_INTENT_1', 'YOUR_INTENT_2' ...], function(session, args) {
    ...
}
...
```
This then allows the Recast.ai API to be used with the `botbuilder` intent matching facilities, making dialog and bot development with Recast.ai much more intuitive and closer to the ntent of the `botbuilder` framework.

`YOUR_TOKEN` should be the client token from your Recast.aia Bot
`YOUR_LANGUAGE` should be the language in which the utterenaces are made (e.g. `en` or `fr`)

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. That said, my own style is rather old-school, so any improvements that retain compatibility with the minimum platform requirements of the Recast.ai framework are more than welcome.

Add unit tests for any new or changed functionality. Lint and test your code - none of which I've been particularly careful to observe in this very first release! 

## Release History

* 0.0.1 Initial release
