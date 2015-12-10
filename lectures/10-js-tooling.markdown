### Table of contents

* Problems with the JavaScript development
* JavaScript alternatives
* Text editors and IDEs
* Documentation
* Debugging
* Profiling
* Building
* Bootstrapping


---

### Problems with JavaScript

* Weird things (number, undefined, null)
* Dynamically and weakly typed
* Unusual OO model
* Mixture of multiple paradigms


---

### Overview of JS alternatives

* CoffeeScript - minimalistic, ruby like
* TypeScript - statically typed, by Microsoft
* Flow - static typing with babel
* JSX - statically typed, similar to JS
* Dart - optional types
* [Many others.](http://altjs.org/)

---

### CoffeeScript

* Has classes
* Has single way to implement inheritance
* Eliminates some of the defects in JavaScript
* Ruby-like, fun

---

### CoffeeScript example

```CoffeeScript

class Animal
    constructor : (@species, @isMammal=false) ->

class Dog extends Animal
    constructor : (@name) ->
        super ("canine",true)

    toString : ->
        "#{@name} is a #{@species}."
```

---

The CoffeeScript transpiler turns CoffeeScript code to well written, readable JavaScript

```JavaScript
(function() {
  #Animal and Class definition

  Dog = (function(_super) {

    __extends(Dog, _super);

    function Dog(name) {
      this.name = name;
      Dog.__super__.constructor.call(this, "canine", true);
      return;
    }

    Dog.prototype.toString = function() {
      return "" + this.name + " is a " + this.species + ".";
    };

    return Dog;

  })(Animal);

}).call(this);
```

---

### CoffeeScript

Can be used with already existing JavaScript libraries and frameworks i.e. you can use it with jQuery, AngularJS, Backbone.js

CoffeeScript has large community, it is open-source. It can be debugged in Google Chrome and Firefox 23+ through source maps.

---

### Source maps

```
f(y): File-We-Are-Not-Interested-In -> File-We-Are-Interested-In
```

f is bijective function.

---

### Source maps

In other words something which maps our generated code to the original. In our case object literal.

```JavaScript
{
    version : 3,
    file: "out.js",
    sourceRoot : "",
    sources: ["foo.js", "bar.js"],
    names: ["src", "maps", "are", "fun"],
    mappings: "AAgBC,SAAQ,CAAEA"
}
```
---

# TypeScript

---

# Flow with Babel

---

### JSX

> JSX - a faster, safer, easier JavaScript.

---

### JSX

* Statically typed (safer)
* Object-oriented (classical inheritance, much easier)
* Performs optimizations (faster)
* Source maps support
* Facebook's REACT is based on JSX
* Auto-completion in VIM

---

```JSX
import "js/web.jsx";

class Config {
  static const quantity = 360;
  static const size     = 2.0;
  static const decay    = 0.98;
  static const gravity  = 2.0;
  static const speed    = 6.0;

  static const canvasId = "night-sky";
  static const fpsElementId = "fps";
}

/* Spark */
final class FireworkView {
  var cx : CanvasRenderingContext2D;
  var width : int;
  var height : int;

  function constructor(canvas : HTMLCanvasElement) {
    this.cx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.width  = canvas.width;
    this.height = canvas.height;

    var rect = canvas.getBoundingClientRect();
    this.left = rect.left;
    this.top  = rect.top;
  }

}
```

---

### Dart

* Allows static typing
* Has Eclipse-based IDE
* Easier refectoring
* Better performance by JavaScript
* By Google
* Native support in special build of Chromium
* Source maps
* Port of AngularJS
* Awesome documentation

---

```Dart
Future _loadFromDB(Database db) {
  _db = db;

  var trans = db.transaction(MILESTONE_STORE, 'readonly');
  var store = trans.objectStore(MILESTONE_STORE);

  var cursors = store.openCursor(autoAdvance: true).asBroadcastStream();
  cursors.listen((cursor) {
    var milestone = new Milestone.fromRaw(cursor.key, cursor.value);
    milestones.add(milestone);
  });

  return cursors.length.then((\_) {
    return milestones.length;
  });
}
```

---

## If you still prefer JavaScript...

---

## JSLint, JSHint, ESLint

* Tools for statical code analysis. Save you from common mistakes.
* JSLint is more strict (demo). Both can be configured to fit in the best way to your needs.
* Highly configurable, you can change almost each rule.
* Introduce common coding standards (especially JSLint).

---

### Text editors and IDEs

* Sublime Text
* WebStorm
* Vim
* Atom
* VSCode
* Brackets

---

### Sublime Text

* Not free ($70 but unlimited evaluation period)
* Very extensible
* Very fast
* Customizable through JSON file
* Comfortable for coding
* Multiple cursors
* Zen Coding (with plugin)
* JSLint and JSHint plugins
* Quick find

---

### WebStorm

* Not free (€44 personal license, 30 days evaluation)
* IDE by JetBrains
* Automatically compile TypeScript
* Most feature complete
* Doesn't help with dynamically typed JavaScript

---

### Brackets

* Free and open source
* Quick find
* LiveReload (built in)
* Extensible
* Built with JavaScript, CSS, HTML
* Debugger (with extension)
* Pop-up styles, zen coding and more...

---

### VIM

* Free and open source
* Extensible
* Many extensions
* Can be used in the console
* Lightweight
* Long learning curve

---

## Put your favourite editor/IDE here

JavaScript can be used with Eclipse, Visual Studio, Notepad++, TextMate, Emacs, Gedit, Notepad...

---

### Code organization

JavaScript projects give the wrong feeling to the developer that he should develop them in a single file. This leads to slower navigation inside the source code and increase the complexity.

**Put each component into different file.**

---

### Module architecture

In the module architecture put each module in different file. Put the initialization code in different file.

```
   js
   ├── libs
   └── plainvm
       ├── core.js
       ├── init.js
       ├── layout
       │   ├── index_side_panel_structure.js
       │   ├── install_wizard.js
       │   └── main_content_structure.js
       ├── system
       │   ├── connection_handler.js
       │   ├── install_vm.js
       │   └── remote_command_bridge.js
       └── ui
           ├── install_wizard.js
           ├── preloader.js
           ├── vm_control.js
           ├── vm_details.js
           ├── vm_settings.js
           └── vms_list.js
```

---

### MV* frameworks

In the different frameworks there are two main approaches:

* Group by component type (and second level functionality)
* Group by functionality (and second level by component type)

---

### MV* frameworks - component types

```
├── app
│   ├── app.js
│   ├── controllers
│   │   ├── page1
│   │   │   ├── FirstCtrl.js
│   │   │   └── SecondCtrl.js
│   │   └── page2
│   │       └── ThirdCtrl.js
│   ├── directives
│   │   ├── page1
│   │   │   └── directive1.js
│   │   └── page2
│   │       ├── directive2.js
│   │       └── directive3.js
│   ├── filters
│   │   └── page2
│   └── services
│       ├── CommonService.js
│       └── models
│           ├── Model1.js
│           └── Model2.js
├── lib
└── test
```

---

### MV* frameworks - functionality

```
├── app
│   ├── app.js
│   ├── common
│   │   ├── controllers
│   │   ├── directives
│   │   ├── filters
│   ├── page1
│   │   ├── controllers
│   │   │   ├── FirstCtrl.js
│   │   │   └── SecondCtrl.js
│   │   ├── filters
│   │   └── services
│   │       ├── service1.js
│   │       └── service2.js
│   └── page2
│       ├── controllers
│       │   └── ThirdCtrl.js
│       ├── directives
│       ├── filters
│       │   └── filter3.js
│       └── services
│           └── service3.js
├── lib
└── test
```

---

## JSDoc

Documenting your code is very important process. In JavaScript you can use notations similar to Javadoc called JSDoc. JSDoc does not help you only when you need to remembre what given snippet does but also by:

* Automatical generation of documentation
* "Type checking" in some editors

---

## Example

```JavaScript
    /**
     * [foo description]
     * @param  {[type]} a [description]
     * @param  {[type]} b [description]
     * @param  {[type]} c [description]
     * @param  {[type]} d [description]
     * @return {[type]}   [description]
     */
    function foo(a, b, c, d) {
        // body...
        return e;
    }
```


---

## Example

You can define given functions as constructors:

```JavaScript
/**
 * Creates a new Item.
 * @constructor
 */
function Item() {
}

var item = new Item();
```

---

* `@abstract` - This member must be implemented (or overridden) by the inheritor.
* `@access` - Specify the access level of this member - private, public, or protected.
* `@alias` - Treat a member as if it had a different name.
* `@augments` - This object adds onto a parent object.
* `@author` - Identify the author of an item.
* `@borrows` - This object uses something from another object.
* `@callback` - Document a callback function.
* `@classdesc` - Use the following text to describe the entire class.
* `@constant` - Document an object as a constant.
* `@constructor` - This function is intended to be called with the "new" keyword.
* `@constructs` - This function member will be the constructor for the previous class.
* `@copyright` - Document some copyright information.
    </small>

---

* `@default` - Document the default value.
* `@deprecated` - Document that this is no longer the preferred way.
* `@desc` - Describe a symbol.
* `@enum` - Document a collection of related properties.
* `@event` - Document an event.
* `@example` - Provide an example of how to use a documented item.
* `@exports` - Identify the member that is exported by a JavaScript module.
* `@external` - Document an external class/namespace/module.
* `@file` - Describe a file.
* `@fires` - Describe the events this method may fire.
* `@global` - Document a global object.
* `@ignore` - [todo] Remove this from the final output.
* `@inner` - Document an inner object.
    </small>

---

* `@instance` - Document an instance member.
* `@kind` - What kind of symbol is this?
* `@lends` - Document properties on an object literal as if they belonged to a symbol with a given name.
* `@license` - [todo] Document the software license that applies to this code.
* `@link` - Inline tag - create a link.
* `@member` - Document a member.
* `@memberof` - This symbol belongs to a parent symbol.
* `@method` - Describe a method or function.
* `@mixes` - This object mixes in all the members from another object.
* `@mixin` - Document a mixin object.
* `@module` - Document a JavaScript module.
* `@name` - Document the name of an object.
* `@namespace` - Document a namespace object.
    </small>

---

* `@param` - Document the parameter to a function.
* `@private` - This symbol is meant to be private.
* `@property` - Document a property of an object.
* `@protected` - This member is meant to be protected.
* `@public` - This symbol is meant to be public.
* `@readonly` - This symbol is meant to be read-only.
* `@requires` - This file requires a JavaScript module.
* `@returns` - Document the return value of a function.
* `@see` - Refer to some other documentation for more information.
* `@since` - When was this feature added?
* `@static` - Document a static member.
* `@summary` - A shorter version of the full description.
    </small>

---

* `@this` - What does the 'this' keyword refer to here?
* `@throws` - Describe what errors could be thrown.
* `@todo` - Document tasks to be completed.
* `@tutorial` - Insert a link to an included tutorial file.
* `@type` - Document the type of an object.
* `@typedef` - Document a custom type.
* `@variation` - Distinguish different objects with the same name.
* `@version` - Documents the version number of an item.
    </small>

---

## Documentation generation

You can generate documentation using [jsdoc](https://github.com/jsdoc3/jsdoc) or [jsdoc-toolkit](https://code.google.com/p/jsdoc-toolkit/).

---

## Debugging

You can debug JavaScript in almost each browser. Including even mobile web browsers.

Most advanced debugging tools have:

* Google Chrome - Chrome Dev Tools
* Firefox - Firebug or Firefox Development Tools
* Safari - Development tools which are similar to Chrome Dev Tools but less powerful
* Opera - Dragonfly
* Internet Explorer

---

# Debugging demo

---

### Debugging in Chrome for Android

![](../img/tooling/android.jpg)

---

### Debugging in Chrome for Android

When you enable the debugging via USB you need:

* Chrome for Android 28+
* ADB Chrome extension installed on your development machine

After that run:

```bash
adb forward tcp:9222 localabstract:chrome_devtools_remote
```

and open: [localhost:9222](http://localhost:9222/)

---

## Debugging in Chrome for Android

---

## Debugging mobile

For debugging in other mobile browsers check:

* about:debug in the default Android browser
* [Aardwolf](https://github.com/lexandera/Aardwolf)
* [Remote Debugging on Firefox for Android](https://hacks.mozilla.org/2012/08/remote-debugging-on-firefox-for-android/)
* [Safari on iOS](http://moduscreate.com/enable-remote-web-inspector-in-ios-6/)
* [Chrome (any OS)](https://developers.google.com/chrome/mobile/docs/debugging)

---

### Performance

Your application's performance could be measured in three ways:

* Network performance (the most important one since the SPA revolution)
* Compute performance (the performance of your JavaScript)
* Render performance (frames per second)

---

### Network performance

Network performance usualy is _almost_ browser independent.

For measuring performance we will use Chrome Dev Tools's network tab.

---

### Measuring network performance

![](../img/tooling/chrome-dev-tools-network.png)

---

### What makes our application slow?

* Opening new TCP connections (latency)
* HTTP requests (latency)
* File size (bandwidth)
* DNS lookups (latency)

---

### Opening new TCP connections

HTTP 1.1 provides:

```
Connection: Keep-Alive
```

This way we can reuse TCP connections for few HTTP requests. This is especially useful for mobile applications where the latency if very high.

Enable KeepAlive in httpd.conf (it is host level in .htaccess you can only set the Connection: Keep-Alive header).

---

### HTTP requests

There are few common for most pages resources which cause HTTP requests:

* HTML files and templates
* JavaScript files
* CSS files
* Images

---

### HTTP requests

You can put everything inline, this way you will make only one HTTP request for getting the whole page but you cannot take advantage of caching.

Few ways for speeding up:

* Pre-fetching
* Concatenation of files
* Caching

---

### JavaScript files

Good practice is to concatenate the JavaScript files and put them in the bottom. Another possible startegy is to load the files asynchronously on demand.

Loading JavaScript files is usually blocking - the document won't be rendered before the JavaScript files are resolved.

---

Making the scripts load asynchronously with (HTML5):

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/x.xx.x/jquery.min.js" async></script>
```

...or IIFE:

```JavaScript
(function () {
var s = document.createElement('script');
    s.type = "text/javascript";
    s.src = "link.js";
    document.body.appendChild(s);
}());
```

---

### CSS files

CSS files should be also concatenated.

Small CSS files can be inlined.

---

### Images

Loading images can lead to many HTTP requests. With the latest HTTP specification there is no elegant way for workarounding this. The best option is creating sprites:

![](../img/tooling/facebook-sprite.png)

---

### Using sprites

Usually when using sprites you need to use the `background-position` and `background-size` CSS properties.

```CSS
.star-icon {
  background-image: url(sprite.png);
  background-size: 50px 50px;
  backgroind-position: 200px 200px;
}
```

---

### Reducing HTTP by inlining

HTTP requests can be reduced by inlining the resources. In JavaScript and CSS it is trivial, for inlining images you should use Base64 encoding (IE8+).

---

### File size

The file size can be reduced with compression.

* For the JavaScript files could be used:
  * Google Closure Compiler
  * UglifyJS
  * YUI compressor
  * JSMin
* CSS minification
* HTML minification
* Images compression (usually loss of quality)

---

### Gzip

Browsers are able to uncompress resources which are pointed as compressed by the web server. The compression can reduce your CSS files to up 70%!

```
Content-Encoding: gzip
```

You should also consider that the mobile devices has lower computing capacities.

In Apache gzip can be enabled and processed with the module mod_deflate.

---

# HTTP 2.0

---

### DNS lookup

You can't escape from the DNS lookups but you can make "pre-resolve".

```HTML
<link rel="dns-prefetch" href="//www.domain1.com">
```

Firefox 3.5+, Chrome, Safari 5+ and IE 9+.

---

### Caching

You can use the browser's caching by taking advantage of the expires or cache-control (HTTP 1.1) headers (mod_expires in apache).

Expires requires strict synchronization between the server and client's clocks

Cache-Control uses max-age (relative amount of time)

[Smartphone Browser localStorage is up to 5x Faster than Native Cache (New Research)](https://www.mobify.com/blog/smartphone-localstorage-outperforms-browser-cache/)

---

# ServiceWorkers

---

### Use CDNs

They will provide the users content near to them (lower latency) and will prevent the 6 threads per origin limitation.

---

### Network performance profiling tools (demo)

* PageSpeed
* YSlow
* phantomas

---

### Compute performance profiling

Slow computations in your application can cause even worse user expereience than application which loads slow.

There are good profiling tools in:

* Chrome Dev Tools
* Firebug
* Firefox Dev Tools
* Dragonfly
* IE

---

### Chrome Dev Tools Profiler

![](../img/tooling/cpu-profiler.png)

---

## Profiling the compute performance (demo)

---

### Memory profiler

If there are many memory leaks in your application this may slow it down or even crash the browser (demo AngularJS Docs)

![](../img/tooling/memory-profiling.png)

---

### Memory leaks

In JavaScript there are few common causes of memory leaks:

* Closures
* DOM
* Application specific...

---

### Timeline

![](../img/tooling/chrome-timeline.jpg)

---

### Timeline

Timeline shows the memory usage during given time interval.

It also shows the different frames, you can improve your computational performance this way.

---

## Timeline ([Demo](http://debuggingmemoryleaks.eu01.aws.af.cm/example/1), [Demo](http://debuggingmemoryleaks.eu01.aws.af.cm/example/2), [Demo](http://debuggingmemoryleaks.eu01.aws.af.cm/example/3) and [Demo](http://debuggingmemoryleaks.eu01.aws.af.cm/example/4))

---

### Heap snapshot

Using the heap snapshot you can see the memory usage between two moments. You can compare the usage and see what objects have leaked.

You can see the element types but sometimes it is hard to find the exact place where they have been created. For such cases you can wrap their constructor and using `Error` object to see the whole stack trace.

---

### Why...

For building your application there are plenty of different tasks which should be done each time you want to deploy.

There are:

* Make
* Rake
* Cake
* ...

---

## Grunt

Grunt is extensible task management system which allows you to execute different tasks. It is highly extensible, you have plugin for almost everything and each plugin is completely open-source so you can customize it to your needs.

For using Grunt you need Node.js and install the `grunt-cli`

```bash
npm install -g grunt-cli
```

---

## Gruntfile.js

Gruntfile.js defines all the tasks you need for your building process. You can group and run them in any order.

For creating your building process with Grunt.js you write JavaScript which is fun and easy, you need basic concepts such as object literals.

---

## Grunt plugins

For installing grunt plugins you can use `npm` (Node Package Manager).

You should start by running:

```bash
npm init
```

The `init` command creates configuration file called `package.json`. It contains basic information for your project such as: name, repository, dependencies, version,...

---

## Installing grunt plugins

Using `npm` you can install grunt plugins using:

```bash
npm install grunt-contrib-uglify --save-dev
```

`--save-dev` is not required but it will save you time by including the grunt plugin in the development dependencies of your project.

---

## Using grunt plugins

Grunt configuration is contained inside Gruntfile.js. It loads different grunt plugins, configures them and creates tasks.

You can load grunt plugin by:

```bash
grunt.loadNpmTasks('grunt-contrib-uglify');
```

---

## Gruntfile.js configuration

You can configure your plugin by:

```JavaScript
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  uglify: {
    build: {
      src: 'src/<%= pkg.name %>.js',
      dest: 'build/<%= pkg.name %>.min.js'
    }
  }
});
```

---

## Creating tasks

In case you have many tasks you want to run for building your project you can use:

```JavaScript
grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'copy']);
```

---

## Putting all together

```JavaScript
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
};
```

---

## Runnig grunt tasks

After registering given task you can run it by:

```bash
grunt taskname
```

There is one special task named "default" which can be run:

```bash
grunt
```

---

# Gulp

---

# NPM

---

## Bower

Often task is resolving project dependencies dynamically. It is not needed to have all your dependencies in your repository.

In Java you can use Maven Dependency plugin, in Node.js you can use `npm`.

<p>Bower
 is the package management system for the web!</p>

---

## Bower initialization

For initializing bower for your project you need:

```bash
#if you haven't already installed bower
npm install -g bower

#create bower.json
bower init
```

---

## Bower configuration

```JSON
{
  "name": "Math-BrowniePoints-WebApp",
  "version": "0.1.0",
  "homepage": "https://github.com/Brownie-Points/Math-BrowniePoints-WebApp",
  "authors": [
  ],
  "description": "Brownie Points math Web App",
  "private": true,
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ],
  "dependencies": {
    "angularjs": "https://ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.js",
    "angular-ui-router": "0.2.0",
    "jcrop": "0.9.12",
    "jquery": "2.0.0",
    "jquery-ui": "1.10.3",
  }
}
```

---

## Bower configuration

All you need to take care of is the list of dependencies.

You can specify version of given dependency, range of versions or just say `newest` for the last version.

---

## Bower dependencies

After running:

```bash
bower install
```

all your dependencies are going to be resolved. They are downloaded in the folder `bower_components` in the root of your bower project.

---

## Bower customization

You can customize some of the default settings of bower by creating `.bowerrc`. The settings you can change with `.bowerrc` are pretty limited.

For further customization you can use the grunt bower plugin.

---

## Yeoman

Sometimes there are plenty of common tasks we have to do in order to bootstrap our project.

* Create project structure (directories, index file, scripts files...)
* Download all required libraries
* Setup SASS, Less...
* Connect all together

---

## Yeoman

Yeoman uses different templates which are installed as Node.js modules. These templates bootstrap our project.

There are many generators which are already available:

* Backbone.js
* AngularJS
* Ember.js
* Web application
* ...

Even this presentation is bootstrapped with Yeoman.

---

## Yeoman example

```bash
#install yeoman
npm install -g yeoman

#install generator for AngularJS
npm install -g generator-angular

#create AngularJS application
yo angular
```

---

## Yeoman

* Creates your project structure
* Creates (almost) all Grunt tasks you might need
* Generates `bower.json` with all dependencies you may need

---

# Live Loading vs Hot Loading

---

# Thank you!

