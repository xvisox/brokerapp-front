import {Component, OnInit} from '@angular/core';
import {StorageService} from "./services/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private storage: StorageService) {
  }

  ngOnInit(): void {
    this.update();
  }

  logout() {
    this.storage.clean();
    this.isLoggedIn = false;
  }

  update() {
    this.isLoggedIn = this.storage.isLogged();
  }
}
