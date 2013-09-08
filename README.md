# previewr
## Description

A disposable dynamic site builder for fast front-end iterations that promotes code re-use to build the front-end of your site / web app. Using a dozen or so functions we you can create numerous pages of a site with very little efford.

## How to

Simply install via npm

npm install previewr -g

and then run in the command line within the folder you want to setup

previewr

## Road map

Initially setup to fulfill my needs of fast prototyping with as much code re-use as possible with as minimal setup, ideally with very little knowledge of development environments to be as friendly as possible to designers as well as developers.

- [x] Create previewr as a disposable tool to development
- [] Add better handling when the current folder has nothing in it to serve, e.g. a wizard to ask if they would like to create a .previewr-flow.json file? etc.
- [] Use previewr as middleware in your own server
- [] Decide whether to include live reload within previewr automatically or leave to grunt as per previewr-template
- [] Setup binding of JSON to HTML with swappable templating engines
- [] Setup tests with CI server for latest releases going live