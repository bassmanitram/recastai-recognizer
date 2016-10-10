const recast =  require('recastai')

const rairec = {

	/*
	 * The class to instantiate and pass as a recognizer to the MS Bot Framework IntentDialog constructor
	 *
	 * args:
	 *     botToken: string - the client token for the target Recast.ai bot
	 *     lang:     string - the language to use when determining intent and entities in Recast.ai - e.g. "en"
	 */
	RecastRecognizer: function(botToken, lang) {

	    this.client = new recast.Client(botToken, lang)

	    this.recognize = function(context, callback) {

			/*
			 * The (single) IIntentRecognizer interfac function
			 *
			 * @see https://docs.botframework.com/en-us/node/builder/chat-reference/interfaces/_botbuilder_d_.iintentrecognizer
			 */
	        rairec.RecastRecognizer.textRequest(context.message.text, this.client, function(err, res) {

				if (err) {
					callback(err);
				} else {
					/*
					 * create the IIntent array from Recast.ai intents
					 */
			        const responseIntents = []
					if (res.intents) {
						res.intents.forEach(function(intent) {
							responseIntents.push({intent: intent.slug, score: intent.confidence})
						})
					}

					/*
					 * create the IEntity array from Recast.ai entities
					 */
					const responseEntities = []
					if (res.entities) {
					    res.entities.forEach(function(entity) {
							responseEntities.push({
								type: entity.name, entity: entity.raw, score: entity.confidence, description: entity
							})
						})
					}

					/*
					 * Return a IIntentRecognizerResult object, adding the Recsat.ai result and the initial context
					 */
					callback(null, {
						entities: responseEntities, intents: responseIntents,
						intent: (responseIntents[0] ? responseIntents[0].intent : "none"), 
						score:  (responseIntents[0] ? responseIntents[0].score : 0),
						recastResult: res, context: context
					})
				}
			})
		}
	}
}

/*
 * Static method that does the heavy lifting of calling Recast.ai
 */
rairec.RecastRecognizer.textRequest = function(utterance, client, callback) {

    client.textRequest(utterance).then(function(res) {
        callback(null, res)
    }).catch(function(err) {
        callback(err)
    })
}

module.exports = rairec
