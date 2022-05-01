import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appDateBcd]'
})
export class DateBcdDirective implements OnInit {

  @Input() date: any;
  @Input() appDateBcd: any;
  constructor(private element: ElementRef, 
   private renderer: Renderer2) { 

  }

  ngOnInit() {
    // var d = new Date(this.date);
    // return
    // this.appDateBcd = d.getDate();
    // this.renderer.setText(this.element.nativeElement, d.getDate());
  }

}
