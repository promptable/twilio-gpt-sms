# GPT3 SMS Bot Starter Kit
 
GPT3 SMS Bot Starter Kit using Twilio. Based on this [tutorial](https://www.twilio.com/blog/sms-stocks-bot-twilio-typescript).

## Running this project

### Things you will need

* [Node.js](https://nodejs.org/en/) installed on your machine
* A Twilio account (if you don't have one yet, [sign up for a free Twilio account here and receive $10 credit when you upgrade](https://twil.io/philnash))
* A Twilio phone number that can receive SMS messages
* [ngrok](https://ngrok.com/) so that you can [respond to webhooks in your local development environment](https://www.twilio.com/blog/2015/09/6-awesome-reasons-to-use-ngrok-when-testing-webhooks.html)
* (Optional) A [Promptable](https://promptable.ai) account for creating / managing prompts.
* (Optional) A Fly.io account for deploying the app


### Create a Twilio Account / Phone Number

Based on this [tutorial](https://www.twilio.com/blog/sms-stocks-bot-twilio-typescript). After your account is created, use this command to create a phone number that can receive SMS messages:

```
twilio phone-numbers:update PHONE_NUMBER --sms-url https://RANDOM_STRING.ngrok.io/messages
```

You'll need the Twilio CLI installed. You'll need to "upgrade" to paid if you want to remove the Twilio branding from the SMS replies.

### Dependencies

Install the dependencies:

```bash
npm install
```

### Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Fill in your TWILIO and OPENAI Keys, and your personal PHONE_NUMBER.

### Compile the TypeScript to JavaScript

Compile the project:

```bash
npm run build
```

Note that this runs the TypeScript compiler, `tsc`, you could also run `npx tsc` to get the same output.

The TypeScript project will be compiled into the `dist` directory. You can also continuously compile the project as it changes with:

```bash
npm run watch
```

### Run the project

Start the web server with:

```bash
npm start
```

### Expose the local server with ngrok

To respond to an incoming webhook you will need a publicly available URL. [ngrok](https://ngrok.com) is a tool that can tunnel through from a public URL to your machine. Once you've [downloaded and installed ngrok](https://ngrok.com/download) you can run it like so:

```bash
ngrok http 3000
```

The ngrok terminal will show you a URL, like `https://RANDOM_STRING.ngrok.io`.

### Connect your phone number to your app

Using the ngrok URL from the last part, you can set up your Twilio phone number with your application. [Edit your phone number](https://www.twilio.com/console/phone-numbers/incoming) and in the Messaging section, next to when "A message comes in" enter your ngrok URL with the path `/messages`.

```
https://RANDOM_STRING.ngrok.io/messages
```

Save the phone number and you are ready. Send your number a message and receive a reply. Type "reset" to reset the chat thread history and bdeing again.

## Deploy with FLy.io

```
fly launch (if it's the first time)
# update fly.toml internal port to 3000
fly deploy
# Set your secrets from .env
fly secrets set --app gpt3-chat TWILIO_ACCOUNT_SID= TWILIO_AUTH_TOKEN= TWILIO_PHONE_NUMBER= OPENAI_API_KEY=
```

## GPT3 Example Integration

```ts
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Please reply to the chat below:\n",
  temperature: 0.7,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
```

## Promptable Integration
To get started using Promptable to create and fetch your prompts, go to https://promptable.ai!

Then, create and deploy a prompt and fetch it like this
```
const { data } = await axios.get(`https://promptable.ai/api/prompt/<YOUR PROMPT ID HERE>/deployment/active`);
const { text, configs } = data // get your prompt text and configs
//... now use it in the chat bot!
```

## Other

Get sms messages on your mac.
https://support.apple.com/guide/messages/get-sms-texts-from-iphone-on-your-mac-icht8a28bb9a/mac

## TODOs/ Feature Requests

TODO: Add Voice Chats:
- https://www.twilio.com/docs/voice/twiml/say/text-speech
- https://www.twilio.com/blog/programmable-voice-javascript-quickstart-demo-node
