#!/usr/bin/env node

var hogan = require('hogan'),
    fs = require('fs'),
    path = require('path'),
    Q = require('q'),
    ncp = require('ncp').ncp,
    lecturesDir = './lectures',
    compiledDir = './compiled',
    layoutFilename = './layout.html.mustache',
    requiredForComiple = process.argv.slice(2);


function discoverLectures() {
  var deferred = Q.defer();
  fs.readdir(lecturesDir, function (error, lectures) {
    if (error) {
      deferred.reject(new Error(error));
    } else {
      deferred.resolve(lectures);
    }
  });

  return deferred.promise;
}

function loadLayout() {
  var deferred = Q.defer();
  fs.readFile(layoutFilename, function (error, data) {
    if (error) {
      console.error('Too bad: ' + error);
      deferred.reject(new Error(error));
    } else {
      deferred.resolve(hogan.compile(data.toString()));
    }
  });

  return deferred.promise;
}

function compile(layout, template_name) {
  var deferred = Q.defer();
  fs.readFile(path.join(lecturesDir, template_name), function (error, data) {
    if (error) {
      deferred.reject(new Error(error));
    } else {
      deferred.resolve(layout.render({slides: data.toString()}));
    }
  });

  return deferred.promise;
}

loadLayout().then(function (layout) {
  discoverLectures().then(function (lectures) {
    var templatePattern = process.argv[2],
        templates = lectures.filter(function (lecture) {
          return RegExp(templatePattern).test(lecture);
        });

    console.log(templates);

    templates.forEach(function (template) {
      compile(layout, template).then(function (output) {
        var basename = template.split('.')[0],
            compiled = path.join(compiledDir, basename);
        fs.writeFile(compiled + '.html', output, function (error) {
          if (error) {
            console.error('Writing file failed: ' );
            console.error(error);
          }
        });
      }, function (error) {
        console.error('Could not read lecture file ' + template);
        console.error(error);
      });
    });

    ncp('html', 'compiled', function (error) {
      if (error) {
        console.error('Error copying src and img folders: ');
        console.error(error);
      }
    });
  });
});
