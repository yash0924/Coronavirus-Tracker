import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HowtostaysafeComponent } from './howtostaysafe/howtostaysafe.component';
import { ImportantnewsComponent } from './importantnews/importantnews.component';
import { DatasourceComponent } from './datasource/datasource.component';
import { AboutmeComponent } from './aboutme/aboutme.component';

const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'home', component : HomeComponent},
  {path : 'how-to-stay-safe', component : HowtostaysafeComponent},
  {path : 'important-news', component : ImportantnewsComponent},
  {path : 'data-source', component : DatasourceComponent},
  {path : 'about-me', component : AboutmeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
