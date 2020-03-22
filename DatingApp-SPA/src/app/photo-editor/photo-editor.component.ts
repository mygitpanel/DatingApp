import { Component, OnInit, Input } from '@angular/core';
import { IPhoto } from '../_Interfaces/IPhoto';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: IPhoto[];

  constructor() { }

  ngOnInit() {
    console.log(this.photos);
  }

}
