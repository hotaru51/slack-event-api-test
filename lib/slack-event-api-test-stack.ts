import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as apigw from '@aws-cdk/aws-apigateway'

export class SlackEventApiTestStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda
    if (process.env.SLACK_API_TOKEN == undefined)
      throw new Error('please specify a valid Slack bot token.(environment variable SLACK_API_TOKEN)')
    const slackBotFunctionProps: lambda.FunctionProps = {
      runtime: lambda.Runtime.RUBY_2_7,
      code: lambda.Code.fromAsset('lambda/slack-bot-function'),
      handler: 'app.handler',
      environment: {
        SLACK_API_TOKEN: process.env.SLACK_API_TOKEN!
      }
    }
    const slackBotFunction = new lambda.Function(this, 'slack-bot-function', slackBotFunctionProps)

    // API Gateway
    const slackBotApiGatewayProps: apigw.LambdaRestApiProps = {
      handler: slackBotFunction
    }
    new apigw.LambdaRestApi(this, 'slack-bot-api-gateway', slackBotApiGatewayProps)
  }
}
