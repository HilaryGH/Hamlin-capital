const https = require('https');
https.get('https://www.google.com', (res) => {
  console.log('🌐 Internet connection working for Node.js');
}).on('error', (e) => {
  console.error('❌ Node.js internet connection failed', e);
});
