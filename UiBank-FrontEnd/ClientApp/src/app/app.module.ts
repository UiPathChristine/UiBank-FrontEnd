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
import { MobileBankingComponent } from './mobile-banking/mobile-banking.component';
import { CreditCardsComponent } from './credit-cards/credit-cards.component';
import { TransferResultComponent } from './transfer-result/transfer-result.component';
import { DisputeTransactionComponent } from './dispute-transaction/dispute-transaction.component';
import { DisputeAccountViewComponent } from './dispute-account-view/dispute-account-view.component';
import { AccountCreateResultsComponent } from './account-create-results/account-create-results.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DisputeDetailsComponent } from './dispute-details/dispute-details.component';
import { HelpReceivedComponent } from './help-received/help-received.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ConfirmationComponent } from './password-reset/confirmation/confirmation.component';
import { PasswordResetConfirmationComponent } from './password-reset-confirmation/password-reset-confirmation.component';
import { PasswordRequestComponent } from './password-request/password-request.component';
import { PasswordRequestConfirmationComponent } from './password-request-confirmation/password-request-confirmation.component';

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
    ProfileComponent,
    MobileBankingComponent,
    CreditCardsComponent,
    TransferResultComponent,
    DisputeTransactionComponent,
    DisputeAccountViewComponent,
    AccountCreateResultsComponent,
    EditProfileComponent,
    DisputeDetailsComponent,
    HelpReceivedComponent,
    PasswordResetComponent,
    ConfirmationComponent,
    PasswordResetConfirmationComponent,
    PasswordRequestComponent,
    PasswordRequestConfirmationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MaterialDesignModule,
    RouterModule.forRoot([
      { path: '', component: WelcomePageComponent, pathMatch: 'full' },
      { path: 'home', component: WelcomePageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'help', component: HelpComponent },
      { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard] },
      { path: 'account-apply', component: AccountApplyComponent, canActivate: [AuthGuard] },
      { path: 'account-details/:accountID/:balance/:accountName', component: AccountDetailsComponent },
      { path: 'account-create-results/:accountId/:friendlyName', component: AccountCreateResultsComponent },
      { path: 'cards', component: CardsComponent },
      { path: 'credit-cards/apply', component: CardApplicationComponent },
      { path: 'dispute-transaction/:accountId', component: DisputeTransactionComponent },
      { path: 'dispute-transaction/view-details/:accountId', component: DisputeAccountViewComponent },
      { path: 'userprofile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'userprofile/edit', component: EditProfileComponent, canActivate: [AuthGuard] },
      { path: 'register-account', component: RegisterComponent },
      { path: 'register-account/success/:username', component: RegisterSuccessComponent },
      { path: 'loans', component: LoansComponent },
      { path: 'loans/apply', component: LoanApplicationComponent },
      { path: 'loans/lookup', component: LoanLookupComponent },
      { path: 'loans/result/:loanID/:rate/:success', component: LoanResultComponent },
      //{ path: 'loans/detailView/:quoteID', component: LoanDetailsComponent },
      { path: 'loans/detailView/:isValid/:quoteId', component: LoanDetailsComponent },
      {
        path: 'loans/detailView/:isValid/:quoteId/:term/:amount/:rate/:age/:income/:email',
        component: LoanDetailsComponent
      },
      { path: 'mobile-banking', component: MobileBankingComponent },
      { path: 'credit-cards', component: CreditCardsComponent },
      { path: 'transfer-money', component: TransferMoneyComponent },
      { path: 'transfer-result', component: TransferResultComponent },
      { path: 'help/confirmation', component: HelpReceivedComponent },
      { path: 'reset-password',  component: PasswordResetComponent },
      { path: 'reset-password/confirmation/:valid', component: PasswordResetConfirmationComponent },
      { path: 'password-request/confirmation/:valid', component: PasswordRequestConfirmationComponent },
      { path: 'password-request', component: PasswordRequestComponent }
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
