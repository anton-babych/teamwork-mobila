import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

import { AppProductFacade } from 'entities/products/model';
import { MenuHamburgerComponent } from 'widgets/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, MenuHamburgerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wrapper">
      <router-outlet> </router-outlet>
    </div>

    <menu-hamburger></menu-hamburger>
  `,
  styles: [
    `
      .wrapper {
        min-height: 100vh;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  isMobile: boolean = false;
  constructor(private productFacade: AppProductFacade) {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngOnInit(): void {
    this.productFacade.loadProducts();
  }
}
