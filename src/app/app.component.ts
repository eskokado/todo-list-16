import { Component, EventEmitter, Input, Output, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component'
import { TodoCardComponent } from './components/todo-card/todo-card.component'
import { TodoSignalsService } from './services/todo-signals.service'
import { Todo } from './models/model/todo.model'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() public projectName!: string;
  @Output() public outputEvent = new EventEmitter<string>();
  public title = 'todo-list-16';
  public todoSignal!: WritableSignal<Array<Todo>>;

  constructor(private todoSignalsService: TodoSignalsService) {

  }

  public handleEmitEvent(): void {
    this.outputEvent.emit(this.projectName);
  }

  public handleCreateTodo(todo: Todo) {
    if (todo) {
      this.todoSignalsService.updateTodos(todo);
      this.todoSignal = this.todoSignalsService.todosState;
    }
  }
}
