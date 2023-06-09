import {Component, OnInit} from '@angular/core';
import {StorageService} from "./services/storage.service";
import {Router} from "@angular/router";
import {CacheService} from "./services/cache.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private storage: StorageService, private router: Router, private cache: CacheService) {
  }

  ngOnInit(): void {
    this.update();
  }

  logout() {
    this.storage.clean();
    this.cache.clean();
    this.isLoggedIn = false;
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }

  update() {
    this.isLoggedIn = this.storage.isLogged();
  }
}
