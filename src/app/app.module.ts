import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { SliderComponent } from './slider/slider.component';
import { SkillsComponent } from './slider/skills/skills.component';
import { LoginBoxComponent } from './login-box/login-box.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AboutmeComponent } from './slider/aboutme/aboutme.component';
import { ExpComponent } from './slider/entry/exp/exp.component';
import { EduComponent } from './slider/entry/edu/edu.component';
import { ProyComponent } from './slider/entry/proy/proy.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    SliderComponent,
    SkillsComponent,
    LoginBoxComponent,
    AboutmeComponent,
    ExpComponent,
    EduComponent,
    ProyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
