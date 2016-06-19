ng-tutorial
============

Simple and cool **Angular** widget to create tutorial pages

# Index

  - [Introduction](#introduction)
  - [Requirements](#requirements)
  - [Usage](#usage)
  - [License](#license)

# Introduction

**ngTutorial** is an AngularJS module, that lets you easily retrieve your posts from Twitter!

# Requirements

The only requirement needed is [AngularJS](https://angularjs.org/) that you can install it via [Bower](http://bower.io/).

# Usage

Simply include the ng-tutorial JS and CSS
```html
<html>
    <head>
        <script type="text/javascript" src="path-to/ng-tutorial.js"></script>
        <link type="text/css" rel="stylesheet" href="path-to/ng-tutorial.css" />
    </head>
</html>
```
Inject ngTutorial in your app:
```js
var app = angular.module("myApp", ["ngTutorial"]);
```
Remember to bootstrap your app by using the ng-app directive or the bootstrap method!
Create a container with the "tutorial" attribute and select elements to highlight with the tutorial-highlight attribute
```html
<any tutorial="myTutorialActivator">
    <any tutorial-highlight>
    </any>
    <any tutorial-highlight>
    </any>
</any>
```
**Params**

| Option | Description | Type | Default value |
| --- | --- | --- | --- |
| **tutorial-prevent-click** | If "true", an extra overlay will prevent user to interact with highlighted elements (Since highlighted elements are real elements of your page) | String | false |
| **tutorial-show-close** | If "true" a close button will be rendered to terminate the tutorial. If empty any click will close the tutorial. | String | false |

# License

Check out LICENSE file (MIT)
