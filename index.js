#!/usr/bin/env node
const args = process.argv.slice(2);

var replace = require("replace");
const pcss = require('process');
var npm = require('npm');
const readline = require("readline");
const dgit = require('@dking/dgit').default;


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



if ( args.length === 0 ) {
    console.log('\x1b[36m%s\x1b[0m', 'Please specify an app name. Example: npx create-react-wp myapp');
    rl.close();
}
else {
    var appName = args[0];
    console.log('\x1b[36m%s\x1b[0m', '========================================');
    console.log('\x1b[32m%s\x1b[0m', '|                                      |');
    console.log('\x1b[32m%s\x1b[0m', '|           create-react-wp            |');
    console.log('\x1b[32m%s\x1b[0m', '|        Author: Mehbub Rashid         |');
    console.log('\x1b[32m%s\x1b[0m', '|                                      |');
    console.log('\x1b[36m%s\x1b[0m', '========================================');


    var configs = {
        selectorId: 'create-react-wp'
    }

    rl.question("Selector ID (div id where you want to load react) (default: create-react-wp): ", function(name) {
        if ( name ) {
            configs.selectorId = name;
        }

        rl.close();

        console.log('\x1b[36m%s\x1b[0m', `Creating app - "${appName}"...`);
    
        // Download to the current directory
        (async () => {

            await dgit(
                {
                    owner: 'MehbubRashid',
                    repoName: 'create-react-wp',
                    ref: 'master',
                    relativePath: 'package',
                },
                `./${appName}`,
            );

            replace({
                regex: 'create-react-wp',
                replacement: configs.selectorId,
                paths: [`./${appName}/src/index.js`],
                recursive: false,
                silent: true
            });

            replace({
                regex: 'react-js-in-wordpress',
                replacement: appName,
                paths: [`./${appName}/package.json`],
                recursive: false,
                silent: true
            });

            console.log('\x1b[32m%s\x1b[0m', 'App created.');
        
            console.log('\x1b[36m%s\x1b[0m', 'Installing npm packages...');
            pcss.chdir(`./${appName}`);
            npm.load(async function (err) {
                // handle errors
        
                // run npm install
                var npm_install = async () => {
                    return new Promise((resolve, reject) => {
                        npm.commands.install([], function (er, data) {
                            // log errors or data
                            if (data) {
                                resolve(data);
                            }
                        });
                    });
                }
                
                var data = await npm_install();
        
                npm.on('log', function (message) {
                    // log installation progress
                    console.log(message);
                });
                console.log('\x1b[33m%s\x1b[0m', `Done! Instructions -                                                                                                                                                                                                `);
                console.log('\x1b[32m%s\x1b[0m', ` - cd ${appName} && npm start`);
                console.log('\x1b[32m%s\x1b[0m', ` - Write your code in src/App.js`);
                console.log('\x1b[32m%s\x1b[0m', ` - Write CSS in src/style/main.scss`);
                console.log('\x1b[32m%s\x1b[0m', ` - Enqueue the "${appName}/build/index.js"(make sure to add "wp-element" as dependency) and "${appName}/build/index.css" files in the page where <div id="${configs.selectorId}"></div> is present.`);
                console.log('\x1b[32m%s\x1b[0m', ` - For instant refresh (Hot reload feature) & better error reporting, install & activate the Gutenberg plugin, Install React Developer Tools extension in your browser and define('SCRIPT_DEBUG', true) in your wp-config.php file.`);
                console.log('\x1b[32m%s\x1b[0m', ` - For creating minified production build - npm run build`);
                console.log('\x1b[32m%s\x1b[0m', ` - Enjoy!`);
                console.log('\x1b[32m%s\x1b[0m', ` -`);
                console.log('\x1b[32m%s\x1b[0m', ` -`);
                console.log('\x1b[33m%s\x1b[0m', ` Tip: Since WordPress contains react by default, while importing from react, use @wordpress/element instead of react. Example: import {useState, useEffect} from '@wordpress/element'`);
            });

        })();
    });

    
}


