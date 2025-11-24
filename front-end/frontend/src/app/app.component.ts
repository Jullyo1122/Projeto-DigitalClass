import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from "./pages/auth/auth.component";
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  constructor(){
    console.log('TO AQUI', environment.api)
  }
}
