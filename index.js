#!/usr/bin/env node


if ( process.argv.slice(2).length === 0 ) {
    console.log('\x1b[36m%s\x1b[0m', 'Please specify an app name. Example: npx create-react-wp myapp');
    process.exit(1);
}
else {
    const { init } = require('./Script');
    init();
}


