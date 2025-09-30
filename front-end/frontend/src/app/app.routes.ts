import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';

export const routes: Routes = [
    {
        path: '', component: AuthComponent
    },
    {
        path: 'cadastro', component: CadastroComponent
    }
];
