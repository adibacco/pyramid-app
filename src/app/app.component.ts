import { Component, OnChanges, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PyramidService } from './pyramid-service';
import { ViewChild, AfterViewInit } from '@angular/core';
import { PyramidParams } from './params.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PyramidParams],

})



export class AppComponent implements OnInit, AfterViewInit  {
  constructor(private _pyramidService: PyramidService) { }
  
  @ViewChild(PyramidParams, {static: false}) pyramidParams:PyramidParams;
  
  rows: string [];
  hoverNum = '';
  
  // Methods
  refreshData(size: number){

    setTimeout(() => {
      if (size != null && size > 1)
        this.rows = this._pyramidService.generate(size);  
    }, 1);
  }
  
  // Emitter listeners
  sizeChanged(event) {
    this.refreshData(event.value);
  }
  
  // Lifecycle hooks
  ngOnInit(){
    this.rows = [];
  }
  
  ngAfterViewInit() {
    this.refreshData(this.pyramidParams.pyramidSize); 
  }
}
