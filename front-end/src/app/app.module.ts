import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabelasComponent } from './components/tabelas/tabelas.component';
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgxMaskModule } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbLayoutModule, NbAccordionModule, NbAlertModule, NbButtonModule, NbCheckboxModule, NbIconModule, NbInputModule, NbListModule, NbSelectModule, NbThemeModule, NbTabsetModule, NbCardModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  declarations: [
    AppComponent,
    TabelasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    Ng2SmartTableModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbInputModule,
    NbThemeModule,
    NbAccordionModule,
    NbTabsetModule,
    NbButtonModule,
    NbLayoutModule,
    NbSelectModule,
    NbListModule,
    NbCheckboxModule,
    NbAlertModule,
    NbCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
