import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.scss']
})
export class DragComponent {
  items = [
    'Cloud Infrastructure',
    'Cloud perspective',
    'CLoud Gaming',
    'Cloud Data 1',
    'Big data',
    'No SQL',
    'Dev ops',
    'IHM',
  ]
  newItems = ['Cloud Infrastructure',
  'Cloud perspective',
  'CLoud Gaming',
  'Cloud Data 1',];

  activeItems = ['Cloud Data 1','Big data','No SQL',];

  doneItems = ['Dev ops','IHM',];


  dropped(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
