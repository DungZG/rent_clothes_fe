import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NzIconModule } from "ng-zorro-antd/icon";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule, RouterModule, NzIconModule],
  template: `
    <footer class="footer">
      <div class="footer-main">
        <div class="container">
          <div class="footer-grid">
            <!-- Column 1: Brand -->
            <section class="footer-brand">
              <div class="footer-logo" routerLink="/">
                <span nz-icon nzType="shopping-cart" class="logo-icon"></span>
                <h2>Thuê Gì</h2>
              </div>

              <p class="footer-desc">
                Nền tảng cho thuê trang phục Cosplay lớn nhất Việt Nam. Kết nối
                Cosplayers với những bộ trang phục tâm huyết.
              </p>

              <div class="social-links" aria-label="Mạng xã hội">
                <a href="#" class="social-icon" aria-label="Facebook">
                  <span nz-icon nzType="facebook"></span>
                </a>
                <a href="#" class="social-icon" aria-label="Instagram">
                  <span nz-icon nzType="instagram"></span>
                </a>
                <a href="#" class="social-icon" aria-label="Twitter">
                  <span nz-icon nzType="twitter"></span>
                </a>
                <a href="#" class="social-icon" aria-label="Youtube">
                  <span nz-icon nzType="youtube"></span>
                </a>
              </div>
            </section>

            <!-- Column 2: Explore -->
            <section>
              <h3>Khám phá</h3>
              <ul>
                <li><a [routerLink]="['/costumes']">Trang phục mới</a></li>
                <li><a href="#">Danh mục phổ biến</a></li>
                <li><a href="#">Gợi ý cho bạn</a></li>
                <li><a [routerLink]="['/community']">Cộng đồng</a></li>
              </ul>
            </section>

            <!-- Column 3: About -->
            <section>
              <h3>Về chúng tôi</h3>
              <ul>
                <li><a [routerLink]="['/become-host']">Trở thành Host</a></li>
                <li><a href="#">Câu chuyện thương hiệu</a></li>
                <li><a href="#">Tuyển dụng</a></li>
                <li><a [routerLink]="['/blog']">Tin tức & Blog</a></li>
              </ul>
            </section>

            <!-- Column 4: Support + Contact -->
            <section>
              <h3>Hỗ trợ</h3>
              <ul>
                <li><a [routerLink]="['/help']">Trung tâm trợ giúp</a></li>
                <li><a href="#">Quy trình thuê</a></li>
                <li><a href="#">Chính sách bảo mật</a></li>
                <li><a href="#">Điều khoản sử dụng</a></li>
              </ul>

              <h3 class="contact-title">Liên hệ</h3>
              <ul class="contact-list">
                <li>Email: hi&#64;thuegi.vn</li>
                <li>Hotline: 1900 1234</li>
                <li>Địa chỉ: Quận 1, TP. HCM</li>
              </ul>
            </section>
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
  styles: [
    `
      .footer {
        background: var(--primary-navy-900);
        color: var(--primary-navy-200);
        margin-top: 40px;
      }

      .footer-main {
        padding: 64px 0 36px;
        border-bottom: 1px solid var(--primary-navy-700);
      }

      .footer-grid {
        display: grid;
        grid-template-columns: 1.35fr 1fr 1fr 1fr;
        gap: 40px 28px;
        align-items: start;
      }

      .footer-brand {
        max-width: 420px;
      }

      .footer-logo {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 18px;
        cursor: pointer;

        .logo-icon {
          font-size: 24px;
          color: var(--accent-gold);
        }

        h2 {
          margin: 0;
          color: #fff;
          font-size: 24px;
          font-weight: 800;
        }
      }

      .footer-desc {
        font-size: 14px;
        line-height: 1.75;
        color: var(--primary-navy-200);
        margin-bottom: 18px;
      }

      h3 {
        color: #fff;
        font-size: 16px;
        margin: 0 0 16px;
        font-weight: 700;
      }

      .contact-title {
        margin-top: 24px;
      }

      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      li {
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 1.5;
        color: var(--primary-navy-200);
      }

      a {
        color: inherit;
        text-decoration: none;
        transition: color 0.2s ease;
      }

      a:hover {
        color: var(--accent-gold);
      }

      .social-links {
        display: flex;
        gap: 10px;
      }

      .social-icon {
        width: 36px;
        height: 36px;
        border-radius: 999px;
        background: var(--primary-navy-800);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        transition: all 0.2s ease;
        font-size: 16px;
      }

      .social-icon:hover {
        background: var(--primary-navy-500);
        color: var(--accent-gold);
        transform: translateY(-1px);
      }

      .footer-bottom {
        padding: 18px 0;
        font-size: 13px;
      }

      .bottom-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .bottom-container p {
        margin: 0;
        color: var(--primary-navy-300);
      }

      .bottom-links {
        display: flex;
        gap: 20px;
      }

      .bottom-links a {
        color: var(--primary-navy-300);
        font-weight: 500;
      }

      .bottom-links a:hover {
        color: #fff;
      }

      /* Tablet */
      @media (max-width: 1024px) {
        .footer-main {
          padding: 52px 0 30px;
        }

        .footer-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 32px 24px;
        }

        .footer-brand {
          max-width: none;
        }
      }

      /* Mobile */
      @media (max-width: 640px) {
        .footer-main {
          padding: 40px 0 24px;
        }

        .footer-grid {
          grid-template-columns: 1fr;
          gap: 24px;
        }

        h3 {
          margin-bottom: 12px;
        }

        .contact-title {
          margin-top: 14px;
        }

        li {
          margin-bottom: 8px;
        }

        .bottom-container {
          flex-direction: column;
          text-align: center;
        }

        .bottom-links {
          justify-content: center;
          flex-wrap: wrap;
          gap: 14px;
        }
      }
    `,
  ],
})
export class FooterComponent {}
