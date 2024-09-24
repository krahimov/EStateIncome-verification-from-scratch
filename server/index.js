// Plaid backend API integration with Node.js
const plaid = require('plaid');

const client = new plaid.Client({
    clientID: PLAID_CLIENT_ID,
    secret: PLAID_SECRET,
    env: plaid.environments.sandbox,
});

app.post('/api/create_link_token', async function (request, response) {
    // Get the client_user_id by searching for the current user
    // const user = await User.find(...);
    const clientUserId = 'test-user-id';
    const request = {
      user: {
        // This should correspond to a unique id for the current user.
        client_user_id: clientUserId,
      },
      client_name: 'Plaid Test App',
      products: ['auth'],
      language: 'en',
      webhook: 'https://webhook.example.com',
      redirect_uri: 'https://domainname.com/oauth-page.html',
      country_codes: ['US'],
    };
    try {
      const createTokenResponse = await client.linkTokenCreate(request);
      response.json(createTokenResponse.data);
    } catch (error) {
      // handle error
    }
  });