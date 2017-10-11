import { Directive, Input, HostListener } from '@angular/core';

@Directive(
  {
    selector: 'img[src0]'
  }
)
export class Img0Directive {
  @Input() src0: string; // fallback default src

  @HostListener("error", ['$event']) onerror(e: any) {
     this.updateSrc(e.target).next();
  }
  retryTime = 0; // counter to protect from infinite loop

  constructor() {  }

  *updateSrc(img: HTMLImageElement) {
    while (this.retryTime < 3) {
      img.src = this.src0;
      yield this.retryTime++;
    }
    console.error("Failed to load fallback img");
  }

}

// function* updateSrc(img: HTMLImageElement) {
  // let retryTime = 0;
  // while (retryTime < 3) {
  //   img.src = this.src0;
  //   yield retryTime++;
  // }
  // console.log("no no no");
// }