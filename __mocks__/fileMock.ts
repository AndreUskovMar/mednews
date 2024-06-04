const path = require('path');

module.exports = {
  process(sourceText: any, sourcePath: any) {
    return {
      code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`,
    };
  },
};

export {};
