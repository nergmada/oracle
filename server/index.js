import cron from 'node-cron';
import Twitter from 'twitter';
import mailgun from 'mailgun-js';
import { create } from 'simple-oauth2';


const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
} = process.env;

const twitterAuth = create({
  client: {
    secret: TWITTER_CONSUMER_SECRET,
    id: TWITTER_CONSUMER_KEY,
  },
  auth: {
    tokenHost: 'https://api.twitter.com',
    tokenPath: 'oauth2/token',
  },
});


const mgClient = mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });

cron.schedule('* * * * *', async function() {
  const twitterToken = twitterAuth.accessToken.create(await twitterAuth.clientCredentials.getToken({}));
  const client = new Twitter({
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    bearer_token: twitterToken.token.access_token,
  });
  client.get('search/tweets', { q: '#adam', lang: 'en' }, (error, tweets) => {
    console.log(tweets);
  });
}, true);

mgClient.messages().send({
  from: 'The Oracle at Dividing By Zero <oracle@dividingbyzero.uk>',
  to: 'nergmada@gmail.com',
  subject: 'Hello',
  text: 'demonstration',
}, (error, body) => {
  console.log('sent');
  console.log(body);
});

console.log('start');
