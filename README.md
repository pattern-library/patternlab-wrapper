# patternlab-wrapper
Generate general patternlab wrapper with iframe

# USAGE
```js
  var patternlabWrapper = require('patternlab-wrapper');

  patternlabWrapper({
    dest: './app/public',
    patternPaths: {"atoms":{"colors":"00-atoms-01-global-00-colors","redirect":"00-atoms-01-global-01-redirect",...}}
    patternNavHTML: '<ul class="patterns-menu sg-nav">
    <li class="sg-nav-"><a class="sg-acc-handle">base</a>
        <ul class="sg-acc-panel">

            <li class="sg-nav-"><a class="sg-pop" href="app/bower_components/pattern-library/patterns/base/blockquote">Blockquote</a></li>
            <li class="sg-nav-"><a class="sg-pop" href="app/bower_components/pattern-library/patterns/base/body">Body</a></li>
        </ul>
    </li>
    </ul>'
  });
```