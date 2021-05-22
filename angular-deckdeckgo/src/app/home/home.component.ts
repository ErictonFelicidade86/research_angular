import { Component, OnInit } from '@angular/core';

import { defineCustomElements as deckInline } from '@deckdeckgo/inline-editor/dist/loader';
import { defineCustomElements as deckDRR } from '@deckdeckgo/drag-resize-rotate/dist/loader';
import { HttpClient, HttpHeaders} from '@angular/common/http'

deckInline(window);
deckDRR(window);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  msg: string = "";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  addElement() {
    let deckGoDRR = document.createElement('deckgo-drr');
    deckGoDRR.text = true;
    deckGoDRR.style.cssText = "--width: 20%; --height: 10%; --top: 5%; --left: 10%;";

    let text = document.createElement('p');
    text.contentEditable = 'true';
    text.textContent = 'New element';
    text.style.margin = '0px';
    text.style.padding = '10px';

    deckGoDRR.appendChild(text);

    document.getElementById('container').appendChild(deckGoDRR);
  }

  addImage() {
    let deckGoDRR = document.createElement('deckgo-drr');
    deckGoDRR.style.cssText = "--width: 20%; --height: 10%; --top: 5%; --left: 10%;";

    let image = document.createElement('img');
    image.src = "https://www.grupoicts.com.br/images/logo_principal.jpg?crc=3803668215";
    image.alt = "ICTS";

    deckGoDRR.appendChild(image);

    document.getElementById('container').appendChild(deckGoDRR);
  }

  selectFile(event) {
    if(!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }
    
    var mimeType = event.target.files[0].type;
    
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    const formData = new FormData();
    formData.append('file', event.target.files[0])

    this.http.post<any>('http://localhost:3333/upload', formData).subscribe(data => {
      
      const {fileUrl} = data;
      console.log("fileUrl is", fileUrl)

      let deckGoDRR = document.createElement('deckgo-drr');
      deckGoDRR.style.cssText = "--width: 20%; --height: 10%; --top: 5%; --left: 10%;";
      let image = document.createElement('img');

      image.src = 'http://localhost:3333/' + fileUrl
      image.alt = "Image";
      deckGoDRR.appendChild(image);
      document.getElementById('container').appendChild(deckGoDRR);

    })
  
  }
}
