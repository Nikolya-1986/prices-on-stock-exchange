import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'stock-exchange',
    },
    {
        path: 'stock-exchange',
        loadComponent: () =>
        import('./pages/stock-exchange/stock-exchange.component').then(
            (component) => component.StockExchangeComponent
        ),
    },
    { 
        path: 'not-found', component: NotFoundComponent,
    },
    { 
        path: '**', redirectTo: '/not-found'
    }
];
