import { Routes } from '@angular/router';
import { SessionContainerComponent } from './session-container/session-container.component';
import { ActiveSessionOverviewComponent } from './active-session-overview/active-session-overview.component';

export const routes: Routes = [
    {
        path: '',
        component: SessionContainerComponent
    },
    {
        path: 'session',
        component: ActiveSessionOverviewComponent
    }
];
