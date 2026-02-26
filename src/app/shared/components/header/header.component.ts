import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        NzLayoutModule,
        NzMenuModule,
        NzButtonModule,
        NzInputModule,
        NzIconModule,
        NzDropDownModule,
        NzAvatarModule
    ],
    template: `
    <header class="header">
      <div class="container header-container">
        <div class="logo-section" routerLink="/">
          <div class="logo-box">
            <span nz-icon nzType="shopping-cart" nzTheme="outline" class="logo-icon"></span>
          </div>
          <h1 class="logo-text">Thuê Gì <small>v2</small></h1>
        </div>

        <nav class="nav-section">
          <ul nz-menu nzMode="horizontal" class="nav-menu">
            <li nz-menu-item nzSelected routerLink="/" routerLinkActive="ant-menu-item-selected" [routerLinkActiveOptions]="{exact: true}">Trang chủ</li>
            <li nz-menu-item routerLink="/costumes" routerLinkActive="ant-menu-item-selected">Trang phục</li>
            <li nz-menu-item routerLink="/blog" routerLinkActive="ant-menu-item-selected">Cảm hứng</li>
            <li nz-menu-item routerLink="/community" routerLinkActive="ant-menu-item-selected">Cộng đồng</li>
            <li nz-menu-item routerLink="/help" routerLinkActive="ant-menu-item-selected">Hỗ trợ</li>
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
          <button nz-button nzType="text" class="btn-login" routerLink="/auth/login">Đăng nhập</button>
          <button nz-button nzType="primary" class="btn-signup" routerLink="/auth/register">Tham gia ngay</button>
        </div>
      </div>
    </header>
  `,
    styles: [`
    .header {
      background: #fff;
      border-bottom: 1px solid var(--primary-navy-100);
      position: sticky;
      top: 0;
      z-index: 1000;
      height: 80px;
      display: flex;
      align-items: center;
    }

    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;

      .logo-box {
        width: 40px;
        height: 40px;
        background: var(--primary-navy-500);
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        
        .logo-icon {
          color: #fff;
          font-size: 20px;
        }
      }

      .logo-text {
        font-size: 22px;
        color: var(--primary-navy-900);
        margin: 0;
        letter-spacing: -0.5px;
        
        small {
          font-size: 12px;
          background: var(--primary-navy-50);
          color: var(--primary-navy-500);
          padding: 2px 6px;
          border-radius: 4px;
          vertical-align: middle;
          font-weight: 500;
        }
      }
    }

    .nav-section {
      flex: 1;
      margin: 0 40px;

      .nav-menu {
        border-bottom: none;
        line-height: normal;
        background: transparent;

        ::ng-deep .ant-menu-item {
          font-weight: 500;
          color: var(--primary-navy-700);
          
          &:hover, &-selected {
            color: var(--primary-navy-500) !important;
            &::after {
              border-bottom-color: var(--primary-navy-500) !important;
            }
          }
        }
      }
    }

    .search-section {
      width: 240px;
      margin-right: 24px;

      ::ng-deep .ant-input {
        border-radius: var(--radius-full);
        background: var(--primary-navy-50);
        border: 1px solid transparent;
        transition: all 0.3s;

        &:focus {
          background: #fff;
          border-color: var(--primary-navy-500);
          box-shadow: 0 0 0 2px rgba(65, 90, 118, 0.1);
        }
      }
    }

    .auth-section {
      display: flex;
      gap: 12px;
      align-items: center;

      .btn-login {
        font-weight: 600;
        color: var(--primary-navy-700);
      }

      .btn-signup {
        border-radius: var(--radius-full);
        padding: 0 24px;
        height: 40px;
      }
    }

    @media (max-width: 1024px) {
      .nav-section, .search-section {
        display: none;
      }
    }
  `]
})
export class HeaderComponent { }
