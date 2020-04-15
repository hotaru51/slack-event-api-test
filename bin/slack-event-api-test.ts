#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SlackEventApiTestStack } from '../lib/slack-event-api-test-stack';

const app = new cdk.App();
new SlackEventApiTestStack(app, 'SlackEventApiTestStack');
