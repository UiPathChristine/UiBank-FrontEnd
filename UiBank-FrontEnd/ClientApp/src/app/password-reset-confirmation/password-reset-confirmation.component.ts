import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-reset-confirmation',
  templateUrl: './password-reset-confirmation.component.html',
  styleUrls: ['./password-reset-confirmation.component.css']
})
export class PasswordResetConfirmationComponent implements OnInit {
  public sub: any;
  public valid: boolean;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const validValue = params['valid'];
      if (validValue === "true") {
        this.valid = true;
      } else {
        this.valid = false;
      }
    });
  }

}
