const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');
const path = require('path');

module.exports = function loader() {};

module.exports.pitch = function(request) {
  this.cacheable(false);

  const cb = this.async();

  const filename = `${path.basename(request)}.[hash].figui.js`;

  let compiler = this._compilation.createChildCompiler('figui', {
    filename,
    chunkFilename: `[id].${filename}`,
    namedChunkFilename: null,
  });

  new SingleEntryPlugin(this.context, `!!${request}`, 'main').apply(compiler);

  const subCache = `subcache ${__dirname} ${request}`;

  let compilation = (compilation) => {
    if (compilation.cache) {
      if (!compilation.cache[subCache]) {
        compilation.cache[subCache] = {};
      }

      compilation.cache = compilation.cache[subCache];
    }
  };

  if (compiler.hooks) {
    const plugin = { name: 'FiguiLoader' };
    compiler.hooks.compilation.tap(plugin, compilation);
  } else {
    compiler.plugin('compilation', compilation);
  }

  compiler.runAsChild((err, entries, compilation) => {
    if (err) {
      return cb(err);
    }

    if (entries[0]) {
      let file = entries[0].files[0];
      let src = compilation.assets[file].source();
      delete this._compilation.assets[file];
      return cb(
          null,
          `module.exports = ${JSON.stringify(`<script>${src}</script>`)};`);
    }

    return cb(null, null);
  });
}
