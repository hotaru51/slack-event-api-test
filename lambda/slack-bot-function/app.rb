require 'json'
require 'slack'

SLACK_API_TOKEN = ENV['SLACK_API_TOKEN'] unless ENV['SLACK_API_TOKEN'].nil?

Slack.configure do |config|
  config.token = SLACK_API_TOKEN
end

def handler(event:, context:)
  print '========== event =========='
  print JSON.dump(event)
  print '========== event_body =========='
  event_body = JSON.parse(event['body'])
  print JSON.dump(event_body)

  if event_body.key?('event')
    unless event_body['event'].key?('bot_id')
      msg = event_body['event']['text']
      channel = event_body['event']['channel']
      post_message(msg, channel)
    end
  end

  res_body = {challenge: event_body['challenge']}
  {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.generate(res_body)
  }
end

def post_message(msg, channel)
  client = Slack::Client.new
  client.chat_postMessage({channel: channel, text: msg})
end
