# Lightweight AngularJS implementation

In this exercise we are going to create a lightweight implementation of AngularJS.

Our framework is going to support directives, two-way data-binding, services, controllers...and even more!

## Provider

0. Create object literal called `Provider`. The provider object should has the following public methods:
  * `get` - used for getting services.
  * `directive` - used for defining directives.
  * `controller` - used for defining controllers.
  * `service` - used for defining services.
  * `annotate` - used for getting array of the names of the dependencies of given "provider" (i.e. service, controller or directive).
  * `invoke` - used for invoking services (i.e. resolving their dependencies and calling the factory method).
  * `Provider` should have properties called `DIRECTIVES_SUFFIX` and `CONTROLLERS_SUFFIX` with values "Directive" and "Controller".

0. Define property of type object, which is called `_providers`

0. Define a property called `_cache`. It should contains a property with value `new Scope` and key `rootScope` (we are going to implement the `Scope` in later section, for now you can comment the statement).

0. Define a method called `annotate`, which accepts a function and returns an array of its arguments' names.

0. Add method called `_register`. `_register` should accept two arguments - `name` (name of the provider) and `fn` (factory method of the provider). It should add new property of the `_providers` hash map with key the first argument passed to the method and value `fn`..

0. Define a method called `get`. It should accept arguments called `name` (name of the provider) and `locals` (hash with local dependencies, the keys in the hash are the names of the dependencies and its values are the actual dependencies). `get` should return service with name `name`, if it is already cached (i.e. property of `this._cache`), otherwise it should call the factory method of the service (`this._provider[name]`) with the method `this.invoke` and cache the result. Do not forget to pass the local dependencies to `this.invoke`.

0. Define method called `invoke`. It should accept two arguments - `fn` (factory method) and `locals` (local dependencies). Using `annotate` and `get` resolve all dependencies of the current factory method (`fn`) and invoke the factory method. Return the result of the invocation. Note that the dependencies could be located both in `locals` hash and 

0. Add methods called `directive`, `controller` and `service`. They should accept two arguments - `name` (name of the provider) and `fn` (factory method). They should call `_register` with appropriate name for the provider (i.e. with special suffix for `directive` and `controller` - `DIRECTIVES_SUFFIX`, `CONTROLLERS_SUFFIX`) and the factory method, which is passed as second argument.


## Scope

0. Define a constructor function called `Scope`. It should initialize the properties:
  * `$$watchers` - an empty array.
  * `$$children` - an empty array.
  * `$parent` - it should accept the value of a parameter called `parent` passed to the constructor function.
  * `$id` - it should accept the value of a parameter called `id` passed to the constructor function or `0` if the passed parameter is `undefined`.
  * `Scope` should have a "static" property called `counter`, with initial value `0`.
0. Define method called `$eval`. It should **evaluate expressions in the context of the current scope**. The expressions, which would be evaluated are:
  * Method invocation (i.e. `foo()`)
  * Function invocation, i.e. the value of the expression passed to `$eval` will be a function, which should be invoked in the context of the scope.
  * Get property value (i.e. `bar`).

0. Add method called `$watch` to the prototype of the `Scope` function. It should accept two arguments `exp` and `fn`. It should add new object to the `$$watchers` array. The properties of the new object should be called `exp`, `fn` and `last`. The first two properties should accept the values of the arguments passed to `$watch`, `last` should be set to be equals to **cloned** (`Utils.clone`) value of the value result from evaluation of the expression (`exp`).

0. Add method called `$new` - a factory method for creating new scopes. The created scope should inherit prototypically from `this` and its `$id` should be equals to `Scope.counter + 1` (do not forget to increment `Scope.counter`). Add the created scope to the `$$children` array and return it.

0. Define method called `$destroy`. It should remove the current scope from the `$$children` array of its parent.

0. Define method called `$digest`. Inside the body of the method a loop should iterate over the watchers (`$$watchers`) until all watchers are "clean" (i.e. their current value is equals to their last value - `Utils.equals`). In the end of the method invocation it should be called recursively for all children of the method. If any of the values of the watchers is found dirty, the `fn` (i.e. the observer associated with the current watcher), should be invoked with arguments:
  * the current value of the watcher expression
  * the previous value of the watcher expression


## DOMCompiler

0. Define an object literal called `DOMCompiler`, which has the following public interface:
  * `bootstrap` - method responsible for doing the initial parsing of the DOM tree.
  * `compile` - method, which accepts a DOM element and scope and compiles the subtree, which has root the passed element, in the context of the passed scope.

0. `bootstrap` accepts a single argument - the root element of your application (for example `document.body`) and should invoke `compile` with the `$rootScope` and the root element of your application.

0. `compile`, should apply the `link` function of all directives found on the current element and after that should invoke itself recursively with all children elements of the current element. Each registered directive must have two properties:
  * `scope` - a boolean property, which indicates that the current directive requires new scope to be created. **NOTE** that no more than one new scope per directive should be created (you should implement this restriction in the `DOMCompiler`).
  * `link` - a link function, which is responsible for encapsulating the directive's logic.

**NOTE** Do not use third party libraries for the implementation of the `DOMCompiler`. For getting all children of given element use: `el.children`. For getting all attributes of given element use `el.attributes`. The returned collection from `el.attributes` will be of type `NamedNodeMap`, which means that you may need to cast it into an array, if necessary. You can access the name of the attribute by: `attr.name` and its value by `attr.value`.

## ngl-bind

Define a directive called `ngl-bind`. When applied to given DOM element as attribute, it should accept an expression as value. When the value of the expression is being changed it should update the content of the element according to the new value of the expression. As initial value of the DOM element `ngl-bind` should set the initial value of the evaluation of the expression.

## ngl-model

Define a directive called `ngl-model`. When applied to given DOM input element as attribute, it should accept name of property of the scope associated with the directive. When the value of the scope's property is being changed this should reflect on the value of the input, once the value of the input is being changed by user interaction this should reflect on the value of the property (i.e. it should implement two-way data-binding).

## ngl-controller

Define a directive called `ngl-controller`. When applied to given DOM element as attribute, as value it should accept name of controller. The link function of this directive should create new controller with name the value of the attribute. The controller should be invoked with local dependencies hash containing property called `$scope` and value the new scope passed to the directive's link function (i.e. the directive should require creation of new scope).

## ngl-repeat

Create new directive called `ngl-repeat`. When applied to given DOM element as attribute it should accept expression in the format `item in items`, as value. When the scope associated with the directive has collection called `items` the directive should iterate over the items in the collection and reference each item in the collection as `item`. The current item should be accessible via the property `item`. For each item in the collection should be created new scope with property called `item`.

Example:

When compiled in the context of the scope:

```JavaScript
  $scope.items = [1, 2, 3];
```
the result of the compilation of the following markup:

```HTML
  <ul>
    <li ngl-repeat="item in items">
      <span ngl-bind="item"></span>
    </li>
  </ul>
```
should be:

```HTML
  <ul>
    <li>
      <span ngl-bind="item">1</span>
    </li>
    <li>
      <span ngl-bind="item">2</span>
    </li>
    <li>
      <span ngl-bind="item">3</span>
    </li>
  </ul>

```

## ngl-click

Define directive called `ngl-click`. When applied to given DOM element as attribute it should accept expression, expressing function invocation (i.e. `foo()`).
When the user clicks on element on which the `ngl-click` directive is applied the expression associated with the directive should be invoked in the context of the current scope.


### Sample directive

```JavaScript
Provider.directive('ngl-click', function () {
  'use strict';
  return {
    scope: false,
    link: function (el, scope, exp) {
      el.onclick = function () {
        scope.$eval(exp);
        scope.$digest();
      };
    }
  };
});
```
