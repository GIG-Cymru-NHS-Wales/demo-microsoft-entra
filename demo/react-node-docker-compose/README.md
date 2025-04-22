# React and Node `docker-compose` demo

## Running the demo
To run this demo you will need:
- Docker installed, if you are using Windows you will need Docker Desktop
- The react-entra-msal front-end demo application
- The node-api-entra back-end demo application

### Project Structure
```
project-root/
├── react-node-docker-compose/
│   ├── docker-compose.yml
├── react-entra-msal/
│   ├── dockerfile
│   ├── package.json
│   ├── .env
│   └── ... (React files)
├── node-api-entra/
│   ├── Dockerfile
│   ├── package.json
│   └── index.js
```

### Configuring the projects

#### React app 
To configure the react app you will need to update the `.env` file with you client-id, tenant-id and the api identifier from you Entra application registration. See the **react-entra-msal** demo for more details on how to achieve this.

#### Node API
To configure the node API we can use the environment in the `docker-compose.yml` file. Open the file and update the following with your tenant-id and api identifier from your Entra API registration. See the **node-api-entra** demo for more details on how to find this information.
```yaml
    environment:
      - API_TENANT_ID=your-tenant-id
      - API_IDENTIFIER=api://your-api-identifier
```

### Launch the applications using `docker-compose`
Once the applications have been configured, open a `bash` terminal in the `react-node-coker-compose` directory and run the following command:
```bash
docker-compose up --build
```

This will launch the:
- React app on `http://localhost:3000`
- Node API on `http://localhost:4000`

### Viewing the frontend
To view the front end React app open `http://localhost:3000` in your browser.

### Networking
The docker compose file automatically created a bridge network between the React app and the Node API so they are able to communicate with each other. It is possible to be more explicit with the network creation, for example:
```yaml
version: '3.9'

services:
  frontend:
    ...
    networks:
      - app-net

  backend:
    ...
    networks:
      - app-net

networks:
  app-net:
    driver: bridge
```
You only need to do this if you need more control, like:
- Isolating some services from others
- Connecting containers across multiple Compose files
- Custom DNS settings or aliases


### Stopping the containers
To stop the docker container you can press `ctrl+c` in the terminal window to gracefully shut it down. If you are using windows you can also use Docker Desktop to stop the compose stack.