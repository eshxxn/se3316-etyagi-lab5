import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SongsComponent} from './songs/songs.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HttpClientModule} from '@angular/common/http';
import {PrivacyComponent} from './privacy/privacy.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
    { path: 'songs', component: SongsComponent},
      { path: 'login', component: LoginComponent},
        { path: 'register', component: RegisterComponent},
          { path: 'privacy', component: PrivacyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
