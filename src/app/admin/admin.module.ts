import { ShortenModPipe } from './../infrastructure/pipes/shorten-mod.pipe';
//* Default Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//* Components
import { AdminComponent } from './admin.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { TopicsComponent } from './topics/topics.component';
import { HeaderComponent } from './topics/header/header.component';
import { BoardsComponent } from './topics/boards/boards.component';
import { ChannelsComponent } from './topics/channels/channels.component';
import { FormularyComponent } from './topics/formulary/formulary.component';

//* Pipe
import { TimeAgoPipe } from './../infrastructure/pipes/time-ago.pipe';
import { UserTypePipe } from '../infrastructure/pipes/user-type.pipe';
import { FilterUsersPipe } from '../infrastructure/pipes/filter-users.pipe';


@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    HomeComponent,
    UsersComponent,
    TopicsComponent,
    HeaderComponent,
    BoardsComponent,
    ChannelsComponent,
    FormularyComponent,
    TimeAgoPipe,
    ShortenModPipe,
    UserTypePipe,
    FilterUsersPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
    // HttpClientModule
  ]
})
export class AdminModule { }
