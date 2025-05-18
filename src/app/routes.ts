import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ConviceComponent } from './convice/convice.component'; 
import { UsersComponent } from './users/users.component'; 
import { UserProfileComponent } from './user-profile/user-profile.component'; 
import { ProfilesComponent } from './profiles/profiles.component'; 



export const routes: Routes = [
  { path: '', component: ConviceComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'userprofile/:username', component: UserProfileComponent },
   { path: 'profilesettings', component: ProfilesComponent }


];
