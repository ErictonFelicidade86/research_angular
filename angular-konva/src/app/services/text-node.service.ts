import { Injectable } from '@angular/core';
import Konva from 'konva';
import { UUID } from 'angular2-uuid';
import Quill from 'quill';

@Injectable({
  providedIn: 'root'
})
export class TextNodeService {
  [x: string]: any;

  constructor() { }

  textNode(stage: Konva.Stage, layer: Konva.Layer) {
    const textNode = new Konva.Text({
      text: 'type here',
      x: 50,
      y: 80,
      fontSize: 20,
      draggable: true,
      width: 200
    });
    layer.add(textNode);

    let tr = new Konva.Transformer({
      node: textNode as any,
      enabledAnchors: ['middle-left', 'middle-right'],
      // set minimum width of text
      boundBoxFunc: function (oldBox, newBox) {
        newBox.width = Math.max(30, newBox.width);
        return newBox;
      }
    });

    stage.on('click', function (e) {
      if (!this.clickStartShape) {
        return;
      }
      if (e.target._id == this.clickStartShape._id) {
        layer.add(tr);
        tr.attachTo(e.target);
        layer.draw();
      }
      else {
        tr.detach();
        layer.draw();
      }
    });

    textNode.on('transform', function () {
      // reset scale, so only with is changing by transformer
      textNode.setAttrs({
        width: textNode.width() * textNode.scaleX(),
        scaleX: 1
      });
    });

    layer.add(tr);
    layer.draw();

    textNode.on('dblclick', () => {
      console.log("entrou aqui dbclick");
      // hide text node and transformer:
      textNode.hide();
      tr.hide();
      layer.draw();
      // create textarea over canvas with absolute position
      // first we need to find position for textarea
      // how to find it?
      // at first lets find position of text node relative to the stage:
      let textPosition = (textNode as any).absolutePosition();
      // then lets find position of stage container on the page:
      let stageBox = stage.container().getBoundingClientRect();
      // so position of textarea will be the sum of positions above:
      let areaPosition = {
        x: stageBox.left + textPosition.x,
        y: stageBox.top + textPosition.y
      };
      // create textarea and style it

      // let textarea = document.createElement('textarea');
      // let textareaId = UUID.UUID();
      // textarea.id = `text-${textareaId}`;

      // document.body.appendChild(textarea);

      let textDiv = document.createElement('div');
      let textDivId = UUID.UUID();
      textDiv.id = `text-${textDivId}`;

      document.body.appendChild(textDiv);

      let quill = new Quill(`#${textDiv.id}`, {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline']
          ]
        },
        theme: 'bubble'
      });

      quill.setText(textNode.text());
      textDiv.style.position = 'absolute';
      textDiv.style.top = areaPosition.y + 'px';
      textDiv.style.left = areaPosition.x + 'px';
      textDiv.style.width = textNode.width() - textNode.padding() * 2 + 'px';
      // textDiv.style.width = `${textNode.width() * 2}px`;
      textDiv.style.height =
        textNode.height() - textNode.padding() * 2 + 5 + 'px';
      // textDiv.style.height = `${textNode.height() * 2}px`;
      textDiv.style.fontSize = textNode.fontSize() + 'px';
      textDiv.style.border = 'none';
      textDiv.style.padding = '0px';
      textDiv.style.margin = '0px';
      textDiv.style.overflow = 'hidden';
      textDiv.style.background = 'none';
      textDiv.style.outline = 'none';
      textDiv.style.resize = 'none';
      (textDiv as any).style.lineHeight = textNode.lineHeight();
      textDiv.style.fontFamily = textNode.fontFamily();
      textDiv.style.transformOrigin = 'left top';
      textDiv.style.textAlign = textNode.align();
      textDiv.style.color = textNode.fill();

      let rotationDiv = textNode.rotation();
      let transformDiv = '';
      if (rotationDiv) {
        transformDiv += 'rotateZ(' + rotationDiv + 'deg)';
      }
      let pxDiv = 0;
      // also we need to slightly move textarea on firefox
      // because it jumps a bit
      let isFirefoxDiv =
        navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      if (isFirefoxDiv) {
        pxDiv += 2 + Math.round(textNode.fontSize() / 20);
      }
      transformDiv += 'translateY(-' + pxDiv + 'px)';
      textDiv.style.transform = transformDiv;
      // reset height
      textDiv.style.height = 'auto';
      // after browsers resized it we can set actual value
      textDiv.style.height = textDiv.scrollHeight + 3 + 'px';
      textDiv.focus();



      // apply many styles to match text on canvas as close as possible
      // remember that text rendering on canvas and on the textarea can be different
      // and sometimes it is hard to make it 100% the same. But we will try...
      // textarea.value = textNode.text();
      // textarea.style.position = 'absolute';
      // textarea.style.top = areaPosition.y + 'px';
      // textarea.style.left = areaPosition.x + 'px';
      // textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
      // textarea.style.height =
      //   textNode.height() - textNode.padding() * 2 + 5 + 'px';
      // textarea.style.fontSize = textNode.fontSize() + 'px';
      // textarea.style.border = 'none';
      // textarea.style.padding = '0px';
      // textarea.style.margin = '0px';
      // textarea.style.overflow = 'hidden';
      // textarea.style.background = 'none';
      // textarea.style.outline = 'none';
      // textarea.style.resize = 'none';
      // (textarea as any).style.lineHeight = textNode.lineHeight();
      // textarea.style.fontFamily = textNode.fontFamily();
      // textarea.style.transformOrigin = 'left top';
      // textarea.style.textAlign = textNode.align();
      // textarea.style.color = textNode.fill();
      // let rotation = textNode.rotation();
      // let transform = '';
      // if (rotation) {
      //   transform += 'rotateZ(' + rotation + 'deg)';
      // }
      // let px = 0;
      // also we need to slightly move textarea on firefox
      // because it jumps a bit
      // let isFirefox =
      //   navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      // if (isFirefox) {
      //   px += 2 + Math.round(textNode.fontSize() / 20);
      // }
      // transform += 'translateY(-' + px + 'px)';
      // textarea.style.transform = transform;
      // // reset height
      // textarea.style.height = 'auto';
      // // after browsers resized it we can set actual value
      // textarea.style.height = textarea.scrollHeight + 3 + 'px';
      // textarea.focus();

      // let quill = new Quill(`#text-${textareaId}`, {
      //   modules: {
      //     toolbar: [
      //       ['bold', 'italic', 'underline']
      //     ]
      //   },
      //   theme: 'bubble'
      // })

      function removeTextarea() {
        // console.log(textarea);
        // console.log(textarea.parentNode);
        // textarea.parentNode.removeChild(textarea);
        console.log("Removing element");
        textDiv.parentNode.removeChild(textDiv);
        window.removeEventListener('click', handleOutsideClick);
        textNode.show();
        tr.show();
        tr.forceUpdate();
        layer.draw();
      }

      function setTextareaWidth(newWidth) {
        if (!newWidth) {
          // set width for placeholder
          newWidth = (textNode as any).placeholder.length * textNode.fontSize();
        }
        // some extra fixes on different browsers
        let isSafari = /^((?!chrome|android).)*safari/i.test(
          navigator.userAgent
        );
        let isFirefox =
          navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isSafari || isFirefox) {
          newWidth = Math.ceil(newWidth);
        }
        let isEdge =
          (document as any).documentMode || /Edge/.test(navigator.userAgent);
        if (isEdge) {
          newWidth += 1;
        }
        // textarea.style.width = newWidth + 'px';
        textDiv.style.width = newWidth + 'px';
      }
      // textarea.addEventListener('keydown', function (e) {
      //   // hide on enter
      //   // but don't hide on shift + enter
      //   if (e.keyCode === 13 && !e.shiftKey) {
      //     textNode.text(textarea.value);
      //     removeTextarea();
      //   }
      //   // on esc do not set value back to node
      //   if (e.keyCode === 27) {
      //     removeTextarea();
      //   }
      // });
      textDiv.addEventListener('keydown', function(e) {
        // if(e.keyCode === 13 && !e.shiftKey) {
        //   textNode.text(quill.getText());
        //   removeTextarea();
        // }

        if(e.keyCode === 27) {
          removeTextarea();
        }
      });
      // textarea.addEventListener('keydown', function (e) {
      //   let scale = textNode.getAbsoluteScale().x;
      //   setTextareaWidth(textNode.width() * scale);
      //   textarea.style.height = 'auto';
      //   textarea.style.height =
      //     textarea.scrollHeight + textNode.fontSize() + 'px';
      // });

      textDiv.addEventListener('keydown', function(e) {
        let scale = textNode.getAbsoluteScale().x;
        setTextareaWidth(textNode.width() * scale);
        textDiv.style.height = 'auto';
        textDiv.style.height =
          textDiv.scrollHeight + textNode.fontSize() + 'px';
      })

      function handleOutsideClick(e) {
        if(!textDiv.contains(e.target)) {
          // textNode.text(quill.getText());
          // textNode.text(quill.root.innerHTML);
          textNode.text(textDiv.textContent);
          removeTextarea();
        }

        // if (parent !== textDiv) {
        //   removeTextarea();
        // }
        // if (e.target !== textarea) {
        //   removeTextarea();

        // }
        // if(e.target !== textDiv) {
        //   removeTextarea();
        // }
      }
      setTimeout(() => {
        window.addEventListener('click', handleOutsideClick);
      });
    });
    return { textNode, tr };
  }
}
