import cron from 'node-cron';
import Twitter from 'twitter';
import { create } from 'simple-oauth2';


const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = process.env;


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

cron.schedule('* * * * *', async function() {
  const twitterToken = twitterAuth.accessToken.create(await twitterAuth.clientCredentials.getToken({}));
  const client = new Twitter({
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    bearer_token: twitterToken.token.access_token,
  });
  client.get('search/tweets', { q: '#adam', lang: 'en' }, (error, tweets, responses) => {
    console.log(tweets);
  });
}, true);

console.log('start');
