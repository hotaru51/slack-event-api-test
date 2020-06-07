# slack-event-api-test

Slack Event APIのお試し

## Requirement

* AWS CLI
* AWS CDK
* yarn
* Docker

## Deploy

gemのbundleをDocker上で行う

```sh
cd lambda/slack-bot-function
docker pull lambci/lambda:build-ruby2.7
docker run --rm -v `pwd`:/var/task lambci/lambda:build-ruby2.7 bundle install --path vendor/bundle
```

CDKでdeploy

```sh
cd <リポジトリ>
yarn run build
export SLACK_API_TOKEN='Slack botのトークン'
cdk deploy
```
