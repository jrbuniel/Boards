import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { faCoffee, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';

interface Task {
  Name: string;
  IsHovered?: boolean;
  IsEditClicked?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faCoffee = faCoffee;
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  isHidden: boolean = false;
  isEditClicked: boolean = false;

  pendingList:Task[] = [{ Name: 'Get to work' }, { Name: 'Pick up groceries' }, { Name: 'Go home' }, { Name: 'Fall asleep' }];
  inProgressList:Task[] = [{ Name: 'Walk dog' }];
  completedList:Task[] = [{ Name: 'Get up' }, { Name: 'Brush teeth' }, { Name: 'Take a shower' }, { Name: 'Check e-mail' }];

  addPendingClicked: boolean = false;
  addInProgressClicked: boolean = false;
  addCompletedClicked: boolean = false;

  constructor(public dialog: MatDialog) {}

  addClicked(listType: string): void {
    if (listType === 'pending') {
      this.addPendingClicked = true;
    } else if (listType === 'inProgress') {
      this.addInProgressClicked = true;
    } else if (listType === 'completed') {
      this.addCompletedClicked = true;
    }
  }

  addTask(task: string, listType: string) {
    if (listType === 'pending') {
      this.pendingList.push({ Name : task });
      this.addPendingClicked = false;
    } else if (listType === 'inProgress') {
      this.inProgressList.push({ Name : task });
      this.addInProgressClicked = false;
    } else if (listType === 'completed') {
      this.completedList.push({ Name : task });
      this.addCompletedClicked = false;
    }
  }

  editTask(editedTaskName: string, index: number, listType: string) {
    if (listType === 'pending') {
      let task = this.pendingList[index];
      task.Name = editedTaskName;
      task.IsHovered = false;
      task.IsEditClicked = false;
    } else if (listType === 'inProgress') {
      let task = this.inProgressList[index];
      task.Name = editedTaskName;
      task.IsHovered = false;
      task.IsEditClicked = false;
    } else if (listType === 'completed') {
      let task = this.completedList[index];
      task.Name = editedTaskName;
      task.IsHovered = false;
      task.IsEditClicked = false;
    }
  }

  deleteTask(task: Task, listType: string) {
    if (listType === 'pending') {
      this.pendingList.splice(this.pendingList.indexOf(task), 1);
    } else if (listType === 'inProgress') {
      this.inProgressList.splice(this.inProgressList.indexOf(task), 1);
    } else if (listType === 'completed') {
      this.completedList.splice(this.completedList.indexOf(task), 1);
    }
  }

  drop(event: CdkDragDrop<Task[]>) {
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
