# REST API
`VERSION`: v-0.0.1</br>
`PURPOSE`: Express JS</br>
`BASE API`: `http://localhost:8000`</br>
  
## Development

From your terminal:

```sh
npm run i
```
Update DATABASE_URL in .env file and run 

```sh
npm run prisma
```

```sh
npm run db-push
```

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.
