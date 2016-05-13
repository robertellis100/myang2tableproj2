


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