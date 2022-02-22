import { NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { DecoratorComponent } from './components/decorator/decorator.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TextareaComponent,
    DecoratorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [NgModel],
  bootstrap: [AppComponent]
})
export class AppModule { }
