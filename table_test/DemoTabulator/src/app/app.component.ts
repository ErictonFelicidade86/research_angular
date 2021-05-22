import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import Tabulator from 'tabulator-tables';
import { defineCustomElements as deckDRR } from '@deckdeckgo/drag-resize-rotate/dist/loader';
deckDRR(window);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnChanges {
  title = 'DemoTabulator';
  people: IPerson[] = [];
  columnNames: any[] = [];
  myTable: Tabulator;

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changees")
  }

  ngOnInit() {
  }

  clickme(){
    console.log("mytable", this.myTable.getData())
    //download the table as csv
    //this.myTable.download("csv", "data.csv");
  }
  
  addElement() {
    let deckGoDRR = document.createElement('deckgo-drr');
    deckGoDRR.text = true;
    deckGoDRR.style.cssText = "--width: 20%; --height: 10%; --top: 5%; --left: 10%;";

    let a_div = document.createElement('div');
    a_div.id='#tabulator-dive'
  
    let text = document.createElement('p');
    text.contentEditable = 'true';
    text.textContent = 'New element';
    text.style.margin = '0px';
    text.style.padding = '10px';

    a_div.appendChild(text);

    deckGoDRR.appendChild(a_div);

    document.getElementById('container').appendChild(deckGoDRR);

    this.people = [
      { id: 1, firstName: "John", lastName: "Smith", state: "Ohio" },
      { id: 2, firstName: "Jane", lastName: "Doe", state: "Iowa" },
      { id: 3, firstName: "Bill", lastName: "Great", state: "Hawaii" },
      { id: 4, firstName: "Ted", lastName: "Adventure", state: "Arizona"}
    ];

    this.columnNames = [
      { title: "Id", field: "id" },
      { title: "First Name", field: "firstName" , editor: true},
      { title: "Last Name", field: "lastName" , editor: true},
      { title: "Location", field: "state" , editor: true}
    ];

    
    this.myTable = new Tabulator(a_div); 
    this.myTable.setColumns(this.columnNames);
    this.myTable.setData(this.people);

  
  }
}

interface IPerson {
  id: number,
  firstName: string,
  lastName: string,
  state: string
}
