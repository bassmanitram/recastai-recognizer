const expect = require('chai').expect
const rairec = require("../index")
const assert = require("assert");

const RECAST_TEST_BOT_TOKEN = "78874da7c733a46c97d330d0d9eeaa80"

const EXACT_MATCH_CONTEXT = { message: { text: "Test intent exact match" } }
const AMBIG_MATCH_CONTEXT = { message: { text: "Test intent ambiguous" } }
const ENTITY_MATCH_CONTEXT = { message: { text: "Test intent with me, 1.6 and 28 January 1999" } }
const TEST_INTENT_1 = "test-intent-1"
const TEST_INTENT_2 = "test-intent-2"

describe('Recast.ai Recognizer', function() {

	describe("Instantiation", function () {

		it("Instantiates with with two args", function() {
			expect(new rairec.RecastRecognizer(RECAST_TEST_BOT_TOKEN, "en")).to.be.an.instanceof(rairec.RecastRecognizer);
		});

		it("Instantiates with with just the token", function() {
			expect(new rairec.RecastRecognizer(RECAST_TEST_BOT_TOKEN)).to.be.an.instanceof(rairec.RecastRecognizer);
		});

		it("Instantiates with with just the lang", function() {
			expect(new rairec.RecastRecognizer(null, "en")).to.be.an.instanceof(rairec.RecastRecognizer);
		});

	})

	describe("Recognition", function () {
		const recognizer = new rairec.RecastRecognizer(RECAST_TEST_BOT_TOKEN, "en");

		it("Recognizes an intent exact match with no entities", function(done) {
			this.timeout(5000);
			recognizer.recognize(EXACT_MATCH_CONTEXT, function(err, recResult) {
				if (err) done(err)
				else {
					expect(recResult).to.be.ok
					expect(recResult).to.have.property('intents')
						.that.is.an('array').that.has.lengthOf(1)
					expect(recResult).to.have.property('entities')
						.that.is.an('array').that.is.empty
					expect(recResult).to.have.property('intent', TEST_INTENT_1)
					expect(recResult).to.have.property('score', 0.99)
					expect(recResult).to.have.property('recastResult').that.is.ok
					expect(recResult).to.have.property('context').that.is.ok
	
					expect(recResult.intents[0]).to.have.property("intent", TEST_INTENT_1)
					expect(recResult.intents[0]).to.have.property("score", 0.99)
					done();
				}
			})
		})

		it("Recognizes an ambiguous intent with no entities", function(done) {
			this.timeout(5000);
			recognizer.recognize(AMBIG_MATCH_CONTEXT, function(err, recResult) {
				if (err) done(err)
				else {
					expect(recResult).to.be.ok
					expect(recResult).to.have.property('intents')
						.that.is.an('array').that.has.lengthOf(2)
					expect(recResult).to.have.property('entities')
						.that.is.an('array').that.is.empty
					expect(recResult).to.have.property('intent').that.is.oneOf([TEST_INTENT_1, TEST_INTENT_2])
					done();
				}
			})
		})

		it("Recognizes an intent with different types of entity", function(done) {
			this.timeout(5000);
			recognizer.recognize(ENTITY_MATCH_CONTEXT, function(err, recResult) {
				if (err) done(err)
				else {
					expect(recResult).to.be.ok
					expect(recResult).to.have.property('intents')
						.that.is.an('array').that.has.lengthOf(1)
					expect(recResult).to.have.property('entities')
						.that.is.an('array').that.has.lengthOf(3)
					expect(recResult).to.have.property('intent',TEST_INTENT_1)

					expect(recResult.entities[0]).to.have.property('type').that.is.ok
					expect(recResult.entities[1]).to.have.property('type').that.is.ok
					expect(recResult.entities[2]).to.have.property('type').that.is.ok

					expect(recResult.entities[0]).to.have.property('entity').that.is.ok
					expect(recResult.entities[1]).to.have.property('entity').that.is.ok
					expect(recResult.entities[2]).to.have.property('entity').that.is.ok

					expect(recResult.entities[0]).to.have.property('description').that.is.ok
					expect(recResult.entities[1]).to.have.property('description').that.is.ok
					expect(recResult.entities[2]).to.have.property('description').that.is.ok

					done();
				}
			})
		})
	})
})
