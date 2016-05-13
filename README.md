Attempting to use ng2-easy-table with a clone of Angular2 QuickStart.
Current process results in errors. See [Issue #30](https://github.com/ssuperczynski/ng2-easy-table/issues/30).

##Follow these steps:##
* Clone [angular2 quickstart](https://github.com/angular/quickstart/blob/master/README.md) into new project folder (e.g., `my-proj`).
Discard everything "git-like" by deleting the `.git` folder.
```bash
git clone  https://github.com/angular/quickstart  my-proj
cd my-proj
rm -rf .git
```
* Edit the following file by adding ng2-easy-table to dependencies:
   ## package.json ##
     ```json
 {
  "name": "angular2-quickstart",
  "version": "1.0.0",
  "description": "QuickStart package.json from the documentation, supplemented with testing support",
  "scripts": {
    "start": "tsc && concurrently \"tsc -w\" \"lite-server\" ",
    "docker-build": "docker build -t ng2-quickstart .",
    "docker": "npm run docker-build && docker run -it --rm -p 3000:3000 -p 3001:3001 ng2-quickstart",
    "e2e": "tsc && concurrently \"http-server\" \"protractor protractor.config.js\"",
    "lint": "tslint ./app/**/*.ts -t verbose",
    "lite": "lite-server",
    "postinstall": "typings install",
    "test": "tsc && concurrently \"tsc -w\" \"karma start karma.conf.js\"",
    "tsc": "tsc",
    "tsc:w": "tsc -w",
    "typings": "typings",
    "webdriver:update": "webdriver-manager update"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@angular/common":  "2.0.0-rc.1",
    "@angular/compiler":  "2.0.0-rc.1",
    "@angular/core":  "2.0.0-rc.1",
    "@angular/http":  "2.0.0-rc.1",
    "@angular/platform-browser":  "2.0.0-rc.1",
    "@angular/platform-browser-dynamic":  "2.0.0-rc.1",
    "@angular/router":  "2.0.0-rc.1",
    "@angular/router-deprecated":  "2.0.0-rc.1",
    "@angular/upgrade":  "2.0.0-rc.1",

    "systemjs": "0.19.27",
    "es6-shim": "^0.35.0",
    "reflect-metadata": "^0.1.3",
    "rxjs": "5.0.0-beta.6",
    "zone.js": "^0.6.12",

    "angular2-in-memory-web-api": "0.0.7",
    "bootstrap": "^3.3.6",
    
    "ng2-easy-table": "0.1.15"
  },
  "devDependencies": {
    "concurrently": "^2.0.0",
    "lite-server": "^2.2.0",
    "typescript": "^1.8.10",
    "typings": "^0.8.1",

    "canonical-path": "0.0.2",
    "http-server": "^0.9.0",
    "tslint": "^3.7.4",
    "lodash": "^4.11.1",
    "jasmine-core": "~2.4.1",
    "karma": "^0.13.22",
    "karma-chrome-launcher": "^0.2.3",
    "karma-cli": "^0.1.2",
    "karma-htmlfile-reporter": "^0.2.2",
    "karma-jasmine": "^0.3.8",
    "protractor": "^3.3.0",
    "rimraf": "^2.5.2"
  },
  "repository": {}
 }
 ```
* Edit the following file by adding ng2-easy-table to map and packages:
   ## systemjs.config.js ##
     ```javascript
     /**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 * Override at the last minute with global.filterSystemConfig (as plunkers do)
 */
 (function(global) {

  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    'rxjs':                       'node_modules/rxjs',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    '@angular':                   'node_modules/@angular',
    'ng2-easy-table':             'node_modules/ng2-easy-table/dist'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
    'ng2-easy-table':             {defaultExtension: 'js' }
  };

  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router-deprecated',
    '@angular/testing',
    '@angular/upgrade',
  ];

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    map: map,
    packages: packages
  };

  System.config(config);

  })(this);
```
* Install npm packages
```bash
npm install
```

* Edit/Create the following files: 
   + app/app.component.ts
   + app/config-service.ts
   + app/data.json
   + app/main.ts
   + app/app.component.spec.ts
## app/app.component.ts ##
```typescript
///<reference path="./../typings/browser/ambient/es6-shim/index.d.ts"/>
import {Component}     from '@angular/core';
import {bootstrap}     from '@angular/platform-browser-dynamic';
import {AppComponent}  from 'ng2-easy-table/app/app.component';
import {MyConfigService} from "./config-service";
import 'rxjs/Rx';

@Component({
  selector: 'my-app',
  directives: [AppComponent],
  providers: [MyConfigService],
  template: ` <h3> My use of ng2-easy-table </h3>
    <!--<ng2-table ></ng2-table>-->
    <ng2-table [configuration]="configuration"></ng2-table>
    
  `
})
export class MyApp {
  constructor(private configuration:MyConfigService) {}
}

//bootstrap(AppComponent, [MyConfigService]);
```
## app/config-service.ts ##
```typescript
import {Injectable} from "@angular/core";
@Injectable()
export class MyConfigService {
  public searchEnabled = false;
  public orderEnabled = true;
  public globalSearchEnabled = false;
  public footerEnabled = false;
  public paginationEnabled = false;
  public exportEnabled = false;
  public editEnabled = false;
  public resourceUrl = "app/data.json";
  public rows = 10;
}
```
## app/data.json ##
```json
{
    "Name": "Dinner With Bernard",
    "Author": "Lola",
    "Guest List": [
        {"Company": "Amazonia", "MarketCap": "5,000,000", "PotluckItem": "drinks"},
        {"Company": "eBayaria", "MarketCap": "20,000,000", "PotluckItem": "desserts"},
        {"Company": "Softmicrosia", "MarketCap": "60,000,000", "PotluckItem": "fruit salads"},
        {"Company": "Ogler", "MarketCap": "6,000,000", "PotluckItem": "chips"},
        {"Company": "EggTorso", "MarketCap": "60,000,000", "PotluckItem": "egg salads"},
        {"Company": "Awchoo", "MarketCap": "100,000,000", "PotluckItem": "green salads"}
    ]
}
```
## app/main.ts ##
```typescript
import {bootstrap}    from '@angular/platform-browser-dynamic';
import {MyApp} from './app.component';
//import {MyConfigService} from "./config-service";

bootstrap(MyApp);
//bootstrap(MyApp, [MyConfigService]);
```
## app/app.component.spec.ts ##
Delete everything below 'Delete This'
```typescript
/* tslint:disable:no-unused-variable */
import { MyApp } from './app.component';

import {
  expect, it, iit, xit,
  describe, ddescribe, xdescribe,
  beforeEach, beforeEachProviders, withProviders,
  async, inject
} from '@angular/core/testing';

import { TestComponentBuilder } from '@angular/compiler/testing';

import { By }             from '@angular/platform-browser';
import { provide }        from '@angular/core';
import { ViewMetadata }   from '@angular/core';
import { PromiseWrapper } from '@angular/core/src/facade/promise';

////////  SPECS  /////////////
```
* Run the compiler and a server at the same time, both in "watch mode"
```bash
npm start
```
* Edit index.html to include ng2-easy-table
## index.html ##
```html
<html>
  <head>
    <title>Angular 2 QuickStart</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="styles.css">

    <!-- Polyfill(s) for older browsers -->
    <script src="node_modules/es6-shim/es6-shim.min.js"></script>

    <script src="node_modules/zone.js/dist/zone.js"></script>
    <script src="node_modules/reflect-metadata/Reflect.js"></script>
    <script src="node_modules/systemjs/dist/system.src.js"></script>

    <script src="systemjs.config.js"></script>
    <script>
      System.import('app').catch(function(err){ console.error(err); });
    </script>
    <script>
    System.import('node_modules/ng2-easy-table/dist/app/app.component').catch(function (err) {
      console.error(err);
    });
    </script>
  </head>

  <body>
    <my-app>Loading...</my-app>
  </body>
</html>
```




