import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit{
  username!: string;
  balance!: number;

  constructor(private profileService: ProfileService) {}

  private getUserData(): void {
    this.profileService.getUserData().subscribe({
      next: (data) => {
        this.username = data.username;
        this.balance = data.balance;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit() {
    this.getUserData();
  }

}
