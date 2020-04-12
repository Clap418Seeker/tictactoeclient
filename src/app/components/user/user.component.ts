import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../types/user";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user: User;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  toRegister() {
    this.router.navigate(['/register_user']);
  }

  toLogin() {
    this.router.navigate(['/login_user']);
  }

  logout() {
    this.authService.logout();
  }

}
