import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';  // Import AppModule here

@NgModule({
  imports: [AppModule, ServerModule],  // Import AppModule to use it for SSR
  bootstrap: [AppComponent],  // Bootstrapping the component on the server-side
})
export class AppServerModule {}
