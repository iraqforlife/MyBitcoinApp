import { Component, Inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { slideInAnimation } from './app.animation';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  animations: [slideInAnimation],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'bit-hodler';
  constructor(
    private userService: UserService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en'); // Set default language
  }
  loggin() {
    console.log('Logging in...');

    this.userService.login('admin@test.ca', 'Test12#');
  }
  testData() {
    var w = this.userService.forcasts();
    console.log(w);
  }
  switchLanguage(lang: string) {
    this.translate.use(lang); // Switch language
  }
}
