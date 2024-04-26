# Messaging System

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a></p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
This project aims to develop a microservices-based messaging system to facilitate communication between users. The system will provide endpoints for sending, retrieving, updating message status, and listing messages based on sender and receiver criteria. this project use [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app
Before you begin running the application, ensure you have MongoDB installed. If you don't have MongoDB installed yet, you can easily set it up using Docker and Docker Compose. Navigate to the project repository and run the following command:

```bash
docker compose up
```
After setting up MongoDB, you can proceed with running the application using the following commands:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Documentation

after you start the message api you can access the documentation visiting {{ endpoint }}/api

## API Endpoints

Below is a detailed list of the available API endpoints along with their descriptions, input requirements, and expected responses.

### `POST /messages`
- **Description**: Creates a new message.
- **Request Body**: `CreateMessageDto`
  - Required fields: `senderId`, `senderName`, `recipientId`, `recipientName`, `messageContent`, `deliveryType`, `messageType`.
  - Optional fields: `linkUrl`, `messageRead`.
- **Responses**:
  - `201 Created`: Successfully created a new message.

### `GET /messages`
- **Description**: Retrieves a list of messages with optional pagination and filters.
- **Query Parameters**:
  - `senderId` (optional): Filter messages by the UUID of the sender.
  - `recipientId` (optional): Filter messages by the UUID of the recipient.
  - `limit` (optional): Limit the number of messages returned.
  - `offset` (optional): Skip a number of messages for pagination.
- **Responses**:
  - `200 OK`: An array of messages.

### `GET /messages/{id}`
- **Description**: Retrieves a single message by its ID.
- **Path Parameters**:
  - `id`: MongoDB ID of the message.
- **Responses**:
  - `200 OK`: Returns the requested message.

### `PATCH /messages/{id}/read`
- **Description**: Updates the `messageRead` status of a message to `true`.
- **Path Parameters**:
  - `id`: MongoDB ID of the message.
- **Responses**:
  - `200 OK`: Returns the updated message with `messageRead` set to `true`.

### Error Responses
- **404 Not Found**: The requested message could not be found.
- **400 Bad Request**: The request format is incorrect or missing required fields.
- **500 Internal Server Error**: Unexpected error in the server.

## Examples
Here are some example requests to help you get started with using the API:

### Create a Message
```bash
curl -X POST http://localhost:3000/messages -H "Content-Type: application/json" -d '{
  "senderId": "123e4567-e89b-12d3-a456-426614174000",
  "senderName": "Jose Algusto",
  "recipientId": "987e6543-e21b-12d3-a456-426614174999",
  "recipientName": "Leon Fernanda",
  "messageContent": "Hello there!",
  "deliveryType": "push-message",
  "messageType": "internal-link",
  "messageRead": false
}'
```

### Get Messages
```bash
curl http://localhost:3000/messages?limit=10&offset=0

```
### Get a Single Message
```bash
curl http://localhost:3000/messages/507f1f77bcf86cd799439011

```
### Mark a Message as Read
```bash
curl -X PATCH http://localhost:3000/messages/507f1f77bcf86cd799439011/read
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
# messages
