require 'json'

def handler(event:, context:)
  JSON.generate(event)
end
