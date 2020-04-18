import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as apigw from '@aws-cdk/aws-apigateway'

export class SlackEventApiTestStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda
    const slackBotFunctionProps: lambda.FunctionProps = {
      runtime: lambda.Runtime.RUBY_2_7,
      code: lambda.Code.fromAsset('lambda/slack-bot-function'),
      handler: 'app.handler'
    }
    const slackBotFunction = new lambda.Function(this, 'slack-bot-function', slackBotFunctionProps)

    // API Gateway
    const slackBotApiGatewayProps: apigw.LambdaRestApiProps = {
      handler: slackBotFunction
    }
    new apigw.LambdaRestApi(this, 'slack-bot-api-gateway', slackBotApiGatewayProps)
  }
}
