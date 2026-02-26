import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, RouterModule, NzGridModule, NzIconModule, NzButtonModule],
    template: `
    <footer class="footer">
      <div class="footer-main">
        <div class="container">
          <div nz-row [nzGutter]="[32, 32]">
            <div nz-col [nzXs]="24" [nzMd]="8" class="footer-info">
              <div class="footer-logo">
                <span nz-icon nzType="shopping-cart" class="logo-icon"></span>
                <h2>Thuê Gì</h2>
              </div>
              <p class="footer-desc">
                Nền tảng cho thuê trang phục Cosplay lớn nhất Việt Nam. 
                Kết nối Cosplayers với những bộ trang phục tâm huyết.
              </p>
              <div class="social-links">
                <a href="#" class="social-icon"><span nz-icon nzType="facebook"></span></a>
                <a href="#" class="social-icon"><span nz-icon nzType="instagram"></span></a>
                <a href="#" class="social-icon"><span nz-icon nzType="twitter"></span></a>
                <a href="#" class="social-icon"><span nz-icon nzType="youtube"></span></a>
              </div>
            </div>

            <div nz-col [nzXs]="12" [nzMd]="4">
              <h3>Khám phá</h3>
              <ul>
                <li><a [routerLink]="['/costumes']">Trang phục mới</a></li>
                <li><a href="#">Danh mục phổ biến</a></li>
                <li><a href="#">Gợi ý cho bạn</a></li>
                <li><a [routerLink]="['/community']">Cộng đồng</a></li>
              </ul>
            </div>

            <div nz-col [nzXs]="12" [nzMd]="4">
              <h3>Về chúng tôi</h3>
              <ul>
                <li><a [routerLink]="['/become-host']">Trở thành Host</a></li>
                <li><a href="#">Câu chuyện thương hiệu</a></li>
                <li><a href="#">Tuyển dụng</a></li>
                <li><a [routerLink]="['/blog']">Tin tức & Blog</a></li>
              </ul>
            </div>

            <div nz-col [nzXs]="12" [nzMd]="4">
              <h3>Hỗ trợ</h3>
              <ul>
                <li><a [routerLink]="['/help']">Trung tâm trợ giúp</a></li>
                <li><a href="#">Quy trình thuê</a></li>
                <li><a href="#">Chính sách bảo mật</a></li>
                <li><a href="#">Điều khoản sử dụng</a></li>
              </ul>
            </div>

            <div nz-col [nzXs]="12" [nzMd]="4">
              <h3>Liên hệ</h3>
              <ul>
                <li>Email: hi&#64;thuegi.vn</li>
                <li>Hotline: 1900 1234</li>
                <li>Địa chỉ: Quận 1, TP. HCM</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container bottom-container">
          <p>&copy; 2026 Thuê Gì v2. All rights reserved.</p>
          <div class="bottom-links">
            <a href="#">Bảo mật</a>
            <a href="#">Điều khoản</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  `,
    styles: [`
    .footer {
      background: var(--primary-navy-900);
      color: var(--primary-navy-200);
    }

    .footer-main {
      padding: 80px 0 40px;
      border-bottom: 1px solid var(--primary-navy-700);

      h3 {
        color: #fff;
        font-size: 16px;
        margin-bottom: 24px;
        font-weight: 600;
      }

      ul {
        list-style: none;
        padding: 0;
        
        li {
          margin-bottom: 12px;
          font-size: 14px;
          
          a:hover {
            color: var(--accent-gold);
          }
        }
      }
    }

    .footer-info {
      .footer-logo {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 24px;
        
        .logo-icon {
          font-size: 28px;
          color: var(--accent-gold);
        }
        
        h2 {
          color: #fff;
          margin: 0;
          font-size: 24px;
        }
      }

      .footer-desc {
        font-size: 14px;
        margin-bottom: 24px;
        line-height: 1.8;
      }
    }

    .social-links {
      display: flex;
      gap: 16px;
      
      .social-icon {
        width: 36px;
        height: 36px;
        background: var(--primary-navy-800);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: #fff;
        
        &:hover {
          background: var(--primary-navy-500);
          color: var(--accent-gold);
        }
      }
    }

    .footer-bottom {
      padding: 24px 0;
      font-size: 13px;

      .bottom-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .bottom-links {
        display: flex;
        gap: 24px;
        
        a:hover {
          color: #fff;
        }
      }
    }

    @media (max-width: 768px) {
      .bottom-container {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent { }
