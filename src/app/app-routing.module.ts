import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {IndexComponent} from "./index/index.component";
import {ProfileComponent} from "./profile/profile.component";
import {TradingComponent} from "./trading/trading.component";

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'index', component: IndexComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'trading', component: TradingComponent},
  {path: '', redirectTo: '/index', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
