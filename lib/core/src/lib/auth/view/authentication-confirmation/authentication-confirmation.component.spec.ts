import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockProvider } from 'ng-mocks';
import { AuthService } from '../../auth.service';
import { AuthenticationConfirmationComponent } from './authentication-confirmation.component';

describe('AuthenticationConfirmationComponent', () => {
  let component: AuthenticationConfirmationComponent;
  let fixture: ComponentFixture<AuthenticationConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthenticationConfirmationComponent],
      providers: [
        MockProvider(AuthService, {
          loginCallback() {
            return Promise.resolve(undefined);
          }
        })
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
