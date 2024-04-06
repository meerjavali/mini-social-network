import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AngularMaterialModule } from './angular-material.module';
import { AuthModule } from './auth/auth.module';



import { HeaderComponent } from './header/header/header.component';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { ErrorInterceptor } from './error-interceptor.service';
import { ErrorComponent } from './error/error.component';
import { PostModule } from './posts/post.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PostModule,
    AuthModule,
    AngularMaterialModule// instead of all the material modules we can use only one angular material module
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi:true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
