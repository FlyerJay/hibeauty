'use strict';

const loaderUtils = require('loader-utils');
const path = require('path');

module.exports = function(source) {
  this.cacheable();
  const config = loaderUtils.getOptions(this);

  const compass = '@import "' + path.relative(path.dirname(this.resourcePath), config.mixinPath) + '";';

  return source.replace(/(<style.+lang=['"]less['"]\s?.*>)/g, `$1\n${compass}`);
};