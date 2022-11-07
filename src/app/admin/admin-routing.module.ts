//* Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//* Components
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { TopicsComponent } from './topics/topics.component';
import { BoardsComponent } from './topics/boards/boards.component';
import { ChannelsComponent } from './topics/channels/channels.component';

const routes: Routes = [
  {
    path: 'admin',
    redirectTo: '/admin/home',
    pathMatch: 'full',
  },
  {
    path: 'admin/topics',
    redirectTo: '/admin/topics/boards',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'topics',
        component: TopicsComponent,
        children: [
          {
            path: 'boards',
            component: BoardsComponent
          },
          {
            path: 'channels',
            component: ChannelsComponent
          }
        ]
      }
    ]
  }
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }