// /home/surgiweb/repositories/chemitec/server.js
process.on('unhandledRejection', err => console.error(err));
process.on('uncaughtException', err => console.error(err));
require('./dist/main.js'); // مينفعش تكتب listen هنا؛ هو جوّه main.js
