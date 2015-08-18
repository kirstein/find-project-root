#!/usr/bin/env node
var findRoot = require('../index');
var root     = findRoot(process.cwd());

if (root) {
  console.log(root);
  process.exit(0);
} 
process.exit(1);
