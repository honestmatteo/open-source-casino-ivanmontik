const path = require('path');
const https = require('https')
const fs = require('fs')

module.exports = {
    resolve: {
        alias: {
            '@': path.resolve('resources/js'),
        },
    },
};
