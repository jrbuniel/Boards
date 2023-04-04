import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { faCoffee, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from './create-task/create-task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faCoffee = faCoffee;
  faPlus = faPlus;

  pendingList:string[] = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  inProgressList:string[] = ['Walk dog'];
  completedList:string[] = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail'];

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

  openModal() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      height: '500px',
      width: '800px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addTask(task: string, listType: string) {
    if (listType === 'pending') {
      this.pendingList.push(task);
      this.addPendingClicked = false;
    } else if (listType === 'inProgress') {
      this.inProgressList.push(task);
      this.addInProgressClicked = false;
    } else if (listType === 'completed') {
      this.completedList.push(task);
      this.addCompletedClicked = false;
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
