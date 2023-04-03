import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faCoffee = faCoffee;

  pendingList:string[] = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  inProgressList:string[] = ['Walk dog'];
  completedList:string[] = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail'];

  addTask(task: string, listType: string) {
    console.log('task', task);
    if (listType === 'pending') {
      this.pendingList.push(task);
    } else if (listType === 'inProgress') {
      this.inProgressList.push(task);
    } else if (listType === 'completed') {
      this.completedList.push(task);
    }
  }

  deleteTask(task: string, listType: string) {
    if (listType === 'pending') {
      this.pendingList.splice(this.pendingList.indexOf(task), 1);
    } else if (listType === 'inProgress') {
      this.inProgressList.splice(this.inProgressList.indexOf(task), 1);
    } else if (listType === 'completed') {
      this.completedList.splice(this.completedList.indexOf(task), 1);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
