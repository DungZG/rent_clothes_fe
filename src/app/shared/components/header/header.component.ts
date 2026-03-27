import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
  ],
  template: `
    <header class="header">
      <div class="container header-container">
        <a class="logo-section" routerLink="/" aria-label="Thuê Gì">
          <div class="logo-box">
            <span
              nz-icon
              nzType="shopping-cart"
              nzTheme="outline"
              class="logo-icon"
            ></span>
          </div>
          <h1 class="logo-text">Thuê Gì <small>v2</small></h1>
        </a>

        <nav class="nav-section" aria-label="Main navigation">
          <ul class="nav-list">
            <li *ngFor="let item of navLinks">
              <a
                class="nav-link"
                [routerLink]="item.link"
                routerLinkActive="is-active"
                [routerLinkActiveOptions]="
                  item.exact ? { exact: true } : { exact: false }
                "
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>

        <div class="search-section">
          <nz-input-group [nzSuffix]="suffixIconSearch">
            <input type="text" nz-input placeholder="Tìm trang phục..." />
          </nz-input-group>
          <ng-template #suffixIconSearch>
            <span nz-icon nzType="search"></span>
          </ng-template>
        </div>

        <div class="auth-section">
          <button
            nz-button
            nzType="text"
            class="btn-login"
            routerLink="/auth/login"
          >
            Đăng nhập
          </button>
          <button
            nz-button
            nzType="primary"
            class="btn-signup"
            routerLink="/auth/register"
          >
            Tham gia ngay
          </button>
        </div>

        <button
          nz-button
          nzType="text"
          class="mobile-toggle"
          (click)="toggleMobileMenu()"
          [attr.aria-expanded]="isMobileMenuOpen"
          aria-label="Mở menu điều hướng"
        >
          <span nz-icon [nzType]="isMobileMenuOpen ? 'close' : 'menu'"></span>
        </button>
      </div>

      <div class="mobile-panel" *ngIf="isMobileMenuOpen">
        <div class="container mobile-panel-inner">
          <nav aria-label="Mobile navigation">
            <a
              *ngFor="let item of navLinks"
              class="mobile-link"
              [routerLink]="item.link"
              [routerLinkActiveOptions]="
                item.exact ? { exact: true } : { exact: false }
              "
              routerLinkActive="is-active"
              (click)="closeMobileMenu()"
            >
              {{ item.label }}
            </a>
          </nav>

          <div class="mobile-search">
            <nz-input-group [nzSuffix]="mobileSuffixIconSearch">
              <input type="text" nz-input placeholder="Tìm trang phục..." />
            </nz-input-group>
            <ng-template #mobileSuffixIconSearch>
              <span nz-icon nzType="search"></span>
            </ng-template>
          </div>

          <div class="mobile-actions">
            <button
              nz-button
              nzType="default"
              routerLink="/auth/login"
              (click)="closeMobileMenu()"
            >
              Đăng nhập
            </button>
            <button
              nz-button
              nzType="primary"
              routerLink="/auth/register"
              (click)="closeMobileMenu()"
            >
              Tham gia ngay
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      .header {
        position: sticky;
        top: 0;
        z-index: 1000;
        background: rgba(255, 255, 255, 0.96);
        border-bottom: 1px solid var(--primary-navy-100);
        backdrop-filter: blur(10px);
      }

      .header-container {
        height: 80px;
        display: flex;
        align-items: center;
        gap: 20px;
      }

      .logo-section {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
      }

      .nav-section {
        flex: 1;
        min-width: 0;
        overflow: hidden;
      }

      .search-section {
        width: 260px;
        flex-shrink: 0;
      }

      .auth-section {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        white-space: nowrap;
      }

      .logo-box {
        width: 40px;
        height: 40px;
        background: var(--primary-navy-500);
        border-radius: 10px;
        display: grid;
        place-items: center;
        flex-shrink: 0;
      }

      .logo-icon {
        color: #fff;
        font-size: 18px;
      }

      .logo-text {
        margin: 0;
        font-size: 32px;
        line-height: 1;
        color: var(--primary-navy-900);
        letter-spacing: -0.02em;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-weight: 800;
        white-space: nowrap;
      }

      .logo-text small {
        font-size: 12px;
        background: var(--primary-navy-50);
        color: var(--primary-navy-500);
        padding: 2px 6px;
        border-radius: 6px;
        font-weight: 600;
        line-height: 1;
      }

      .nav-list {
        list-style: none;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        gap: 10px;
        margin: 0;
        padding: 0;
        overflow-x: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }

      .nav-list::-webkit-scrollbar {
        display: none;
      }

      .nav-link {
        display: inline-flex;
        align-items: center;
        height: 40px;
        padding: 0 12px;
        border-radius: 999px;
        color: var(--primary-navy-700);
        font-weight: 600;
        white-space: nowrap;
        transition: all 0.2s ease;
      }

      .nav-link:hover {
        color: var(--primary-navy-500);
        background: var(--primary-navy-50);
      }

      .nav-link.is-active {
        color: var(--primary-navy-500);
        background: #eef3f8;
        box-shadow: inset 0 0 0 1px var(--primary-navy-100);
      }

      .search-section ::ng-deep .ant-input-affix-wrapper,
      .mobile-search ::ng-deep .ant-input-affix-wrapper {
        border-radius: 999px;
        background: var(--primary-navy-50);
        border: 1px solid transparent;
        transition: all 0.2s ease;
      }

      .search-section ::ng-deep .ant-input-affix-wrapper:hover,
      .mobile-search ::ng-deep .ant-input-affix-wrapper:hover {
        border-color: var(--primary-navy-100);
        background: #fff;
      }

      .search-section ::ng-deep .ant-input-affix-wrapper-focused,
      .mobile-search ::ng-deep .ant-input-affix-wrapper-focused {
        border-color: var(--primary-navy-300);
        box-shadow: 0 0 0 3px rgba(65, 90, 118, 0.14);
        background: #fff;
      }

      .btn-login {
        font-weight: 600;
        color: var(--primary-navy-700);
      }

      .btn-signup {
        border-radius: 999px;
        padding-inline: 20px;
        height: 40px;
        font-weight: 700;
      }

      .mobile-toggle,
      .mobile-panel {
        display: none;
      }

      @media (max-width: 1400px) {
        .nav-link {
          padding-inline: 10px;
          font-size: 14px;
        }
      }

      @media (max-width: 1280px) {
        .nav-link {
          padding-inline: 8px;
          font-size: 13px;
        }
      }

      @media (max-width: 1100px) {
        .search-section {
          display: none;
        }
      }

      @media (max-width: 1024px) {
        .header-container {
          justify-content: space-between;
        }

        .nav-section,
        .auth-section,
        .search-section {
          display: none;
        }

        .mobile-toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .mobile-toggle span[nz-icon] {
          font-size: 18px;
          color: var(--primary-navy-700);
        }

        .mobile-panel {
          display: block;
          border-top: 1px solid var(--primary-navy-100);
          background: #fff;
        }

        .mobile-panel-inner {
          padding-top: 14px;
          padding-bottom: 18px;
        }

        .mobile-link {
          display: block;
          padding: 10px 4px;
          border-bottom: 1px dashed var(--primary-navy-100);
          color: var(--primary-navy-800);
          font-weight: 600;
        }

        .mobile-link.is-active {
          color: var(--primary-navy-500);
        }

        .mobile-search {
          margin-top: 12px;
        }

        .mobile-actions {
          margin-top: 12px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
      }

      @media (max-width: 640px) {
        .header-container {
          height: 72px;
        }

        .logo-box {
          width: 36px;
          height: 36px;
        }

        .logo-text {
          font-size: 24px;
        }

        .mobile-actions {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class HeaderComponent {
  isMobileMenuOpen = false;

  readonly navLinks = [
    { label: "Trang chủ", link: "/", exact: true },
    { label: "Trang phục", link: "/costumes", exact: false },
    { label: "Cảm hứng", link: "/blog", exact: false },
    { label: "Cộng đồng", link: "/community", exact: false },
    { label: "Hỗ trợ", link: "/help", exact: false },
  ];

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
