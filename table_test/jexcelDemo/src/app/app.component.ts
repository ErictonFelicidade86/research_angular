import { Component, ViewChild, ElementRef } from '@angular/core';
import * as jexcel from "jexcel";
import { defineCustomElements as deckDRR } from '@deckdeckgo/drag-resize-rotate/dist/loader';
deckDRR(window);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jexcelDemo';
  myTable ;
  @ViewChild("spreadsheet") spreadsheet: ElementRef;
  ngAfterViewInit() {

  }

  clickme(){
    const a = this.myTable.getData()
    console.log("mytable", a)
  }

  addElement() {
    let deckGoDRR = document.createElement('deckgo-drr');
    deckGoDRR.text = true;
    deckGoDRR.style.cssText = "--width: 20%; --height: 10%; --top: 5%; --left: 10%;";

    let a_div = document.createElement('div');
    a_div.id='#tabulator-dive'


    deckGoDRR.appendChild(a_div);

    document.getElementById('container').appendChild(deckGoDRR);


    this.myTable = jexcel(a_div, {
      data: [[]],
      columns: [
      ],
      toolbar:[
        /*{
            type: 'i',
            content: 'undo',
            onclick: function() {
                this.myTable.undo();
            }
        },
        {
            type: 'i',
            content: 'redo',
            onclick: function() {
              this.myTable.redo();
            }
        },
        {
            type: 'i',
            content: 'save',
            onclick: function () {
              this.myTable.download();
            }
        },*/
        {
            type: 'select',
            k: 'font-family',
            v: ['Arial','Verdana']
        },
        {
            type: 'select',
            k: 'font-size',
            v: ['9px','10px','11px','12px','13px','14px','15px','16px','17px','18px','19px','20px']
        },
        {
            type: 'i',
            content: 'format_align_left',
            k: 'text-align',
            v: 'left'
        },
        {
            type:'i',
            content:'format_align_center',
            k:'text-align',
            v:'center'
        },
        {
            type: 'i',
            content: 'format_align_right', 
            k: 'text-align',
            v: 'right'
        },
        {
            type: 'i',
            content: 'format_bold',
            k: 'font-weight',
            v: 'bold'
        },
        {
            type: 'i',
            content: 'format_italic',
            k: 'font-style',
            v: 'italic'
        },
        {
            type: 'i',
            content: 'format_underline',
            k: 'text-decoration',
            v: 'underline'
        },
        {
            type: 'color',
            content: 'format_color_text',
            k: 'color'
        },
        {
            type: 'color',
            content: 'format_color_fill',
            k: 'background-color'
        }
    ],
      minDimensions: [5, 5]
    });

    this.myTable.setCell

  }
}
