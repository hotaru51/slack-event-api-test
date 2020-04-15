import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import SlackEventApiTest = require('../lib/slack-event-api-test-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SlackEventApiTest.SlackEventApiTestStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
