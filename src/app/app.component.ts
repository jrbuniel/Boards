import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todoList:string[] = [];
  inProgressList:string[] = [];
  doneList:string[] = [];

  addTask(task: string, listType: string) {
    console.log('task', task);
    if (listType === 'todo') {
      this.todoList.push(task);
    } else if (listType === 'doing') {
      this.inProgressList.push(task);
    } else if (listType === 'done') {
      this.doneList.push(task);
    }
  }

  deleteTask(task: string, listType: string) {
    if (listType === 'todo') {
      this.todoList.splice(this.todoList.indexOf(task), 1);
    } else if (listType === 'doing') {
      this.inProgressList.splice(this.inProgressList.indexOf(task), 1);
    } else if (listType === 'done') {
      this.doneList.splice(this.doneList.indexOf(task), 1);
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
