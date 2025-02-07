import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthFacade } from '@auth/data-access';
import { Observable } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { PushPipe } from '@ngrx/component';
import { ThemeSwitchService } from '@users/users/core/ui/theme-switch';
import { LanguageKeys, LanguageSwitchService } from '@users/users/core/ui/language-switch';

@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatMenuModule,
    PushPipe
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private readonly facade = inject(AuthFacade);
  private readonly themeSwitchService = inject(ThemeSwitchService);
  private readonly languageSwitchService = inject(LanguageSwitchService);
  public readonly isAuthenticated$: Observable<boolean> = this.facade.isAuthenticated$;
  public readonly isDarkTheme$: Observable<boolean> = this.themeSwitchService.isDarkTheme$;
  public readonly isAdmin$: Observable<boolean | null> = this.facade.isAdmin$;
  public readonly selectedLanguage$ = this.languageSwitchService.selectedLanguage$;

  @Output() sidenavToggle = new EventEmitter();

  public onLogout() {
    this.facade.logout();
  }

  public onSwitchTheme() {
    this.themeSwitchService.switchTheme();
  }

  public onSwitchLanguage(language: LanguageKeys) {
    this.languageSwitchService.setLanguage(language);
  }

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}

