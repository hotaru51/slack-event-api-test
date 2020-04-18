require 'json'
require 'pp'

def handler(event:, context:)
  print JSON.dump(event)
  event_body = JSON.parse(event['body'])
  print JSON.dump(event_body)
  res_body = {challenge: event_body['challenge']}
  {statusCode: 200, headers: {"Content-Type": "application/json"}, body: JSON.generate(res_body)}
end
