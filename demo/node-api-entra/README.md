# How to create a Node API with Entra authorisation
 
## Initialise node api
First create a directory to install your api into and then run the below:
```bash
npm init -y
```
This will create the package.json file to track installed node packages.

## Install basic packages
To allow our node project to work as an API we need the below packages:
```bash
npm install express cors dotenv
```

### Express.js
`Express.js` is a minimal and flexible Node.js back end web application framework for building RESTful APIs with Node. Some key features of express include:
1. **Middleware support** which has access to request (`req`) and response (`res`) objects and allow encapsulation of shared logic across multiple endpoints in a single place.
2. **Routing** for HTTP methods and URL paths to help define the structure of your API in simple modular route handlers.
3. **Static file serving** for files such as images, CSS and JavaScript to serve front-end assessts without additional configuration.
4. **Minimal and unopinionated**, `Express.js` doesn't enforce strict structures or dependencies offering flexibility for small to large scale applications.

### cors
CORS stands for Cross-Origin Resource Sharing. It's a mechanism that allows a server to indicate from which origins (domains) a browser should allow loading resources. It is a security standard that helps web servers control which websites can access their resources, ensuring a more secure web experience.

#### Configuring CORS
- Allow Specific Origins
```javascript
app.use(cors({
  origin: 'http://example.com'
}));
```
- Or allow multiple origins
```javascript
const allowedOrigins = ['http://localhost:3000', 'https://myapp.com'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  }
}));
```

### dotenv
The node `dotenv` is a zero dependency package which allows us to manage environment variables. `dotenv` loads environment variables from a `.env` file into `process.env` giving us flexibility over the configuration of the API.

#### example `.env` file
```dotenv
PORT=3000
DB_HOST=localhost
```

#### Loading the environment variables
```javascript
require('dotenv').config();

const databaseHost = process.env.DB_HOST; //localhost
```

## Install Authorisation packages
To allow us to integrate our API with Entra we need to extend its functionality with the below packages:
```bash
npm install express-jwt jwks-rsa jsonwebtoken
```

### express-jwt
This is a middleware for `Express.js` that validates JWTs ([JSON Web Tokens](https://jwt.io/introduction)) and sets the req.user property with the decoded token if the verification is successful. This enables route handlers to then access the data in the token if it is valid.

### jwks-rsa
`jwks-rsa` is a library that retrieves and caches public signing keys from a JWKS endpoint. These keys are used to verify JWTs signed with asymmetric algorithms like RS256. It works with `express-jwt` to support JWT validation using **JSON Web Key Sets (JWKS)**

#### Quick Context:
JWTs can be signed using:
- Symmetric algorithms (like HS256) – use the same secret for signing and verification.
- Asymmetric algorithms (like RS256) – use a private key to sign and a public key to verify.

If you're using RS256, you don’t store the public key locally. Instead, you fetch it dynamically from a JWKS endpoint, and that's where jwks-rsa comes in.

### jsonwebtoken
`jsonwebtoken` provides a rich set of features for interacting with JWTs including:
- Sign (create) JWTs
- Verify JWTs
- Decode JWTs

## Setup the basic API
Create an index.js file to serve the API functionality:
```javascript
// index.js
require('dotenv').config();
const express = require('express');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');

const app = express();
app.use(cors());

const checkJwt = jwt.expressjwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://login.microsoftonline.com/${process.env.API_TENANT_ID}/discovery/v2.0/keys`,
    }),
    audience: process.env.API_IDENTIFIER,
    issuer: `https://login.microsoftonline.com/${process.env.API_TENANT_ID}/v2.0`,
    algorithms: ['RS256'],
});

app.get('/api/protected', checkJwt, (req, res) => {
    res.json({ message: 'You accessed a protected API route!', user: req.auth });
});

app.listen(4000, () => {
    console.log('API running on http://localhost:4000');
});
```

## Create a `.env` file
In your api directory create the below `.env` file:
```dotenv
API_TENANT_ID=your-tenant-id
API_IDENTIFIER=api://your-api-client-id
```

## Security tips to extend the API functionality
✅ Use HTTPS in production

✅ Set up CORS properly - define the correct allowed origins
