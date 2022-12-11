# This file can be used to deploy to gcloud run
# However, we recommend Fly.io as it is much easier to use
# Instructions in README for Fly.io

echo "!!!DEPLOYING!!!"

echo "TWILIO_ACCOUNT_SID is set to: $TWILIO_ACCOUNT_SID"
echo "TWILIO_AUTH_TOKEN is set to: $TWILIO_AUTH_TOKEN"
echo "TWILIO_PHONE_NUMBER is set to: $TWILIO_PHONE_NUMBER"
echo "OPENAI_API_KEY is set to: $OPENAI_API_KEY"

gcloud run deploy gpt \
--source . \
--set-env-vars="TWILIO_ACCOUNT_SID=$TWILIO_ACCOUNT_SID" \
--set-env-vars="TWILIO_AUTH_TOKEN=$TWILIO_AUTH_TOKEN" \
--set-env-vars="TWILIO_PHONE_NUMBER=$TWILIO_PHONE_NUMBER" \
--set-env-vars="OPENAI_API_KEY=$OPENAI_API_KEY" \
--allow-unauthenticated