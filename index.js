/**
 * Compiles basic twig templates for patternlab iframe wrapper
 *
 * USAGE:
 * var patternlabWrapper = require('patternlab-wrapper');
 *
 * patternlabWrapper({
 *   dest: './app/public',
 *   patternPaths: {"category":
 *      {"subcategory": {"patternName1": "00-atoms-01-global-00-colors"},
 *      {"subcategory2": {"patternName2": "00-atoms-01-global-01-redirect"},
 *      ...
 *   },
 *   patternNavHTML: '<ul class="patterns-menu sg-nav">
    <li class="sg-nav-"><a class="sg-acc-handle">base</a>
        <ul class="sg-acc-panel">

            <li class="sg-nav-"><a class="sg-pop" href="app/bower_components/pattern-library/patterns/base/blockquote">Blockquote</a></li>
            <li class="sg-nav-"><a class="sg-pop" href="app/bower_components/pattern-library/patterns/base/body">Body</a></li>
        </ul>
    </li>
    </ul>'
 * });
 *
 * OR
 *
 * patternlabWrapper({
 *   dest: './app/public',
 *   patternPaths: {"category":
 *      {"subcategory": {"patternName1": "00-atoms-01-global-00-colors"},
 *      {"subcategory2": {"patternName2": "00-atoms-01-global-01-redirect"},
 *      ...
 *   }
 * });
 */

/**
 *
 * @type {Twig.exports|exports}
 */

var Twig = require('twig');
var fs = require('fs');
var fsextra = require('fs-extra');

var patternlabFiles = [
  'styleguide', 'js', 'images', 'fonts', 'data'
];

/**
 *
 * @type {{dest: string, patternNav: string, patternNavTemplate: string, ishControls: string, ishControlsTemplate: string, patternPaths: {base: Array}, src: string}}
 */
var optionsDefault = {
  dest: __dirname + '/public',
  patternNavHTML: '',
  patternNavTemplate: __dirname + '/_patternlab-files/partials/patternNav.twig',
  ishControlsHTML: '',
  ishControlsTemplate: __dirname + '/_patternlab-files/partials/ishControls.twig',
  patternPaths: {
    "category": {
      "subcategory": {
        "patternName1": "00-atoms-01-global-00-colors"
      }
      ,
      "subcategory2": {
        "patternName2": "00-atoms-01-global-01-redirect"
      }
    }
  },
  src: __dirname + '/_patternlab-files'
};

function patternlabWrapper(options) {
  options = options || {};

  options.patternPaths = options.patternPaths || optionsDefault.patternPaths;
  options.dest = options.dest || optionsDefault.dest;
  options.src = options.src || optionsDefault.src;
  options.ishControlsHTML = options.ishControlsHTML || Twig.twig({data: fs.readFileSync(optionsDefault.ishControlsTemplate, 'utf8')}).render();
  options.patternNavHTML = options.patternNavHTML || Twig.twig({data: fs.readFileSync(optionsDefault.patternNavTemplate, 'utf8')}).render({categories: options.patternPaths});

  var indexTemplate = Twig.twig({data: fs.readFileSync(options.src + '/index.twig', 'utf8')});

  fs.writeFile(options.dest + '/index.html', indexTemplate.render({
      patternNav: options.patternNavHTML,
      ishControls: options.ishControlsHTML,
      patternPaths: options.patternPaths
    }),

    function (err) {
      if (err) { return console.error(err) }
      console.log('index.html is generated!');
    }
  );

  patternlabFiles.forEach(function (file) {
    fsextra.copy(options.src + '/' + file, options.dest + '/' + file,
      function (err) {
        if (err) { return console.error(err) }

        console.log(file + ' is synced.')
      }
    )
  });

}

module.exports = patternlabWrapper;
