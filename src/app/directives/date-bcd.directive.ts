import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appDateBcd]'
})
export class DateBcdDirective implements OnInit {

  @Input() date: any;

  constructor(private element: ElementRef) { 

  }

  ngOnInit() {
    // var d = new Date(this.date);
    // return
    // this.element.html = d.getDate();
  }

}
