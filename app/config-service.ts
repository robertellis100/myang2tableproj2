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