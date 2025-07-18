import { Component, computed, HostListener, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Sidebar } from "../sidebar/sidebar";
import { CommonModule } from '@angular/common';
import { Header } from "../header/header";

@Component({
  selector: 'app-menu',
  imports: [RouterOutlet, Sidebar, CommonModule, Header],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);

  sizeClass = computed(() => {
    const isLeftSidebarCollapsed = this.isLeftSidebarCollapsed();
    if (isLeftSidebarCollapsed) {
      return '';
    }
    return this.screenWidth() > 768 ? 'body-trimmed' : 'body-md-screen';
  });

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() < 768) {
      this.isLeftSidebarCollapsed.set(true);
    }
  }

  ngOnInit(): void {
    this.isLeftSidebarCollapsed.set(true);
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }

}
