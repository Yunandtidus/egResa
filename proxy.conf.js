var HttpsProxyAgent = require('https-proxy-agent');

var proxyConfig = [
    {
    context: '/api',
    target: "https://api.bureau401.fr",
    secure: false,
    changeOrigin: true,
    //agent: new HttpsProxyAgent("http://host:3128"),
    logLevel: "debug"
    }
];

module.exports = proxyConfig;
