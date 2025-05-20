import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ConviceComponent } from './convice/convice.component'; 
import { UsersComponent } from './users/users.component'; 
import { ProfilesComponent } from './profiles/profiles.component'; 
import { AdminComponent } from './admin/admin.component'; 
import { UserViewComponent } from './user-view/user-view.component'; 
import { UserconcernComponent } from './userconcern/userconcern.component'; 




export const routes: Routes = [
  { path: '', component: ConviceComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
   { path: 'profilesettings', component: ProfilesComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'viewUsers', component: UserViewComponent },
  { path: 'concerns', component: UserconcernComponent }


];
