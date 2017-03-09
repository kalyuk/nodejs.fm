node node_modules/babel-cli/bin/ba
bel-node.js example/bin/console.js --route=migrate:up

node node_modules/babel-cli/bin/babel-node.js example/bin/console.js -- route=migrate:create module=identity
 name=init
 
node node_modules/babel-cli/bin/babel-node.js example/bin/console.js -- route=migrate:down module=identity