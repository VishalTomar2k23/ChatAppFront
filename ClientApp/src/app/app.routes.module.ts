import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BaseComponent } from './views/layout/base/base.component';
import { FooterComponent } from './views/layout/footer/footer.component';
import { NavbarComponent } from './views/layout/navbar/navbar.component';
import { SidebarComponent } from './views/layout/sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'nav-menu',component:NavMenuComponent},
    {path:'base',component:BaseComponent},
    {path:'footer',component:FooterComponent},
    {path:'navbar',component:NavbarComponent},
    {path:'sidebar',component:SidebarComponent},
    {path:'login',component:LoginComponent},
    {path:'signup', component: SignupComponent}
];


@NgModule({
    imports: [RouterModule.forRoot(routes),ReactiveFormsModule],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
  