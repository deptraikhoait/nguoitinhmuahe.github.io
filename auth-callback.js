const fetch = require("node-fetch");

exports.handler = async function(event, context) {
    const { code } = event.queryStringParameters;

    const params = new URLSearchParams();
    params.append('client_id', '1348052521498968135');
    params.append('client_secret', 'vwIWMK_uG8_xL9cWc5Zd21o9JqwviS9k');
    params.append('code', code);
    params.append('redirect_uri', 'https://clever-crepe-28ec8d.netlify.app/');
    params.append('grant_type', 'authorization_code');

    const response = await fetch('https://discord.com/api/v10/oauth2/token', {
        method: 'POST',
        body: params
    });

    const data = await response.json();

    if (data.access_token) {
        const userResponse = await fetch('https://discord.com/api/v10/users/@me', {
            headers: {
                'Authorization': `Bearer ${data.access_token}`
            }
        });

        const userData = await userResponse.json();
        return {
            statusCode: 200,
            body: JSON.stringify(userData)
        };
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Failed to fetch user data' })
        };
    }
};
