import type { APIGatewayEvent } from 'aws-lambda'

module.exports.handler = async (event: APIGatewayEvent) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v3.0! Your function executed successfully!',
        input: event,
      },
      null,
      2,
    ),
  }
}
