import { TodoSignalsService } from 'src/app/services/todo-signals.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { first } from 'rxjs'
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations'
import { Todo } from './models/model/todo.model'
import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>
  let todoSignalsService: TodoSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        BrowserAnimationsModule,
        NoopAnimationsModule
      ],
      providers: [TodoSignalsService]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    todoSignalsService = TestBed.inject(TodoSignalsService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set @Input() property correcly', () => {
    component.projectName = 'Testing Angular With Jest';

    fixture.detectChanges();

    expect(component.projectName).toEqual('Testing Angular With Jest');
  });

  it('should emit event with @Output decorator correctly', () => {
    component.projectName = 'Testing my Angular application';

    component.outputEvent
    .pipe(
      first()
    )
    .subscribe({
      next: (event) => {
        expect(event).toEqual('Testing my Angular application');
        component.handleEmitEvent();
      }
    });
  });

  it('should create new todo correctly and call service method', () => {
    jest.spyOn(todoSignalsService, 'updateTodos');
    const newTodo: Todo = {
      id: 1,
      title: 'Testing creating todo',
      description: 'Test new Todo',
      done: true,
    }

    component.handleCreateTodo(newTodo);

    fixture.detectChanges();

    expect(todoSignalsService.updateTodos).toHaveBeenCalledWith(newTodo);
    expect(component.todoSignal()).toEqual([newTodo]);
  });

  it("should not render paragraph in the DOM", () => {
    const componentDebugElement: DebugElement = fixture.debugElement;
    const element: HTMLElement = componentDebugElement.nativeElement;
    const paragraph = element.querySelector('p');

    expect(paragraph).toBeNull();
  });

  it("should render paragraph correcty", () => {
    component.renderTestMessage = true;

    fixture.detectChanges();

    const componentDebugElement: DebugElement = fixture.debugElement;
    const element: HTMLElement = componentDebugElement.nativeElement;
    const paragraph = element.querySelector('p');

    expect(paragraph?.textContent).toEqual('Test your Angular application');

    const paragraphDebugElement = componentDebugElement.query(By.css('p'));

    expect(paragraph?.textContent).toEqual('Test your Angular application');
  });
});
