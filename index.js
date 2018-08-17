'use strict';

const express = require('express');
const getRawBody = require('raw-body');
const fs = require('fs');

const parseJsonAsync = require('./parseJsonAsync');

const PORT = process.env.PORT || 8000;

function rawBody(req, res, next) {
    getRawBody(req, (err, body) => {
        req.bodyStr = new Buffer(body).toString('utf8');
        next();
    });
}

function parseSync(req, res) {
    const start = process.hrtime();
    const json = JSON.parse(req.bodyStr);
    const [s, ns] = process.hrtime(start);
    const ms = s*1000 + ns/1e6;
    res.send(`Your JSON took ${ms} ms to parse`);
}

async function parseUsingThreads(req, res) {
    const {ms} = await parseJsonAsync(req.bodyStr);
    res.send(`Your JSON took ${ms} ms to parse`);
}

function wave(req, res) {
    res.send('👋');
}

express()
    .post('/parse/using/eventloop', rawBody, parseSync)
    .post('/parse/using/threads', rawBody, parseUsingThreads)
    .get('/wave', wave)
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));
