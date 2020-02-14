import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { AppComponent } from './app.component';
import { JwtModule } from "@auth0/angular-jwt";
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { AccountsComponent } from './accounts/accounts.component';
import { CardsComponent } from './cards/cards.component';
import { AccountsService } from './accounts/accounts.service';
import { CardApplicationComponent } from './card-application/card-application.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountTransfersComponent } from './account-transfers/account-transfers.component';
import { LoansComponent } from './loans/loan-home/loans.component';
import { LoanApplicationComponent } from './loans/loan-application/loan-application.component';
import { LoanResultComponent } from './loans/loan-result/loan-result.component';
import { LoanLookupComponent } from './loans/loan-lookup/loan-lookup.component';
import { LoanDetailsComponent } from './loans/loan-details/loan-details.component';
import { RegisterService } from './register/register.service';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { HelpComponent } from './help/help.component';
import { AccountApplyComponent } from './account-apply/account-apply.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { AuthGuard } from './guards/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationService } from './auth/authentication.service';
import { CsvDataService } from './file-actions/csv-data.service';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    WelcomePageComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    AccountsComponent,
    CardsComponent,
    CardApplicationComponent,
    SideNavComponent,
    CreateAccountComponent,
    AccountDetailsComponent,
    AccountTransfersComponent,
    LoansComponent,
    LoanApplicationComponent,
    LoanResultComponent,
    LoanLookupComponent,
    LoanDetailsComponent,
    RegisterSuccessComponent,
    HelpComponent,
    AccountApplyComponent,
    TransferMoneyComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MaterialDesignModule,
    RouterModule.forRoot([
      { path: '', component: WelcomePageComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'help', component: HelpComponent },
      { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard] },
      { path: 'account-apply', component: AccountApplyComponent },
      { path: 'account-details/:isValid/:quoteId', component: AccountDetailsComponent },
      { path: 'cards', component: CardsComponent },
      { path: 'userprofile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'register-account', component: RegisterComponent },
      { path: 'register-account/success/:username', component: RegisterSuccessComponent },
      { path: 'loans', component: LoansComponent },
      { path: 'loans/apply', component: LoanApplicationComponent },
      { path: 'loans/lookup', component: LoanLookupComponent },
      { path: 'loans/result/:loanID/:rate/:success', component: LoanResultComponent },
      //{ path: 'loans/detailView/:quoteID', component: LoanDetailsComponent },
      { path: 'loans/detailView/:isValid/:quoteId', component: LoanDetailsComponent },
      {
        path: 'loans/detailView/:isValid/:quoteId/:term/:amount/:rate/:age/:income',
        component: LoanDetailsComponent
      }
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:44368"],
        blacklistedRoutes: []
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [AuthenticationService, RegisterService, AuthGuard, CsvDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
