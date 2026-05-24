import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PainelComponent } from './painel-controle/painel-controle';
import { SidebarComponent } from './sidebar-component/sidebar-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PainelComponent, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app-donation-blood-front');
}
