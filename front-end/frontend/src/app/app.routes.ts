import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HomeAlunoComponent } from './pages/home-aluno/home-aluno.component';
import { CatalogoCursosComponent } from './pages/catalogo-cursos/catalogo-cursos.component';

export const routes: Routes = [
    {
        path: '', component: AuthComponent
    },
    {
        path: 'cadastro', component: CadastroComponent
    },
    {
        path: 'homealuno', component: HomeAlunoComponent
    },
    {
        path: 'catalogocursos', component: CatalogoCursosComponent
    }
];
