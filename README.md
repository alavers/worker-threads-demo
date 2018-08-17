# Worker Threads Demo

1. `npm i`
1. Generate your huge ugly JSON `node generateHugeJson.js`
1. Run the web service (node 10 required) `node --experimental-worker index.js`
1. Try out the various endpoints

```
curl -X POST -d @huge.json localhost:8000/parse/using/eventloop
curl -X POST -d @huge.json localhost:8000/parse/using/threads
curl localhost:8000/wave
```
