import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzRateModule } from "ng-zorro-antd/rate";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzAvatarModule } from "ng-zorro-antd/avatar";
import { NzResultModule } from "ng-zorro-antd/result";

@Component({
  selector: "app-costume-detail",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NzGridModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzRateModule,
    NzTagModule,
    NzBreadCrumbModule,
    NzTabsModule,
    NzInputNumberModule,
    NzAvatarModule,
    NzResultModule,
  ],
  templateUrl: "./costume-detail.component.html",
  styleUrls: ["./costume-detail.component.scss"],
})
export class CostumeDetailComponent implements OnInit {
  costumeId: string | null = null;
  quantity: number = 1;
  selectedSize: string = "M";
  selectedImage: string = "";

  costume: any = null;

  sizes = ["S", "M", "L", "XL"];

  // Detailed mock data
  costumeDb = [
    {
      id: "1",
      name: "Yae Miko Shrine Maiden",
      price: 320000,
      images: [
        "/asset/mẫu ảnh/mẫu_2.jpg",
        "/asset/mẫu ảnh/mẫu_2.2.jpg",
        "/asset/mẫu ảnh/mẫu_3.jpg",
      ],
      rating: 4.9,
      reviews: 126,
      category: "Game",
      description:
        "Trang phục Yae Miko chuẩn auth. Chất liệu lụa satin mềm mại, in họa tiết sắc nét. Set bao gồm: áo trong, áo ngoài, váy, thắt lưng, phụ kiện tóc, và tất.",
      material: "Lụa Satin, Voan",
      includes: "Fullset (chưa kèm wig và guốc)",
      deposit: 500000,
      shop: {
        id: "shop-1",
        name: "Cosplay Haven",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
        rating: 4.8,
        totalItems: 45,
      },
    },
    {
      id: "2",
      name: "Nezuko Kimono Premium",
      price: 280000,
      images: [
        "/asset/mẫu ảnh/mẫu_1.2.jpg",
        "/asset/mẫu ảnh/mẫu 1.jpg",
        "/asset/mẫu ảnh/mẫu_1.3.jpg",
      ],
      rating: 4.8,
      reviews: 98,
      category: "Anime",
      description:
        "Kimono Nezuko chất liệu vải kaki mịn, form dáng chuẩn anime. Màu sắc tươi sáng, hoa văn thêu tỉ mỉ. Phù hợp cho fes và photoshoot.",
      material: "Kaki, Cotton",
      includes: "Kimono, đai obi, ống tre, ruy băng tóc",
      deposit: 300000,
      shop: {
        id: "shop-2",
        name: "Wibu Store",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lily",
        rating: 4.9,
        totalItems: 120,
      },
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the ID from the route parameters
    this.route.paramMap.subscribe((params) => {
      this.costumeId = params.get("id");
      this.loadCostumeDetail();
    });
  }

  loadCostumeDetail(): void {
    // In a real app, this would be an API call
    const found = this.costumeDb.find((c) => c.id === this.costumeId);

    if (found) {
      this.costume = found;
      this.selectedImage = this.costume.images[0];
    } else {
      // Fallback if ID not found (e.g. they clicked from listing mock data)
      this.costume = {
        id: this.costumeId || "0",
        name: "Trang phục Cosplay Premium",
        price: 350000,
        images: [
          "/asset/mẫu ảnh/mẫu_4.jpg",
          "/asset/mẫu ảnh/mẫu_4.1.jpg",
          "/asset/mẫu ảnh/mẫu_4.2.jpg",
          "/asset/mẫu ảnh/mẫu_5.jpg",
        ],
        rating: 4.7,
        reviews: 84,
        category: "Cosplay",
        description:
          "Trang phục cosplay cao cấp được thiết kế tỉ mỉ từng đường kim mũi chỉ. Giống nguyên tác 99%, chất liệu thoải mái thoáng mát khi mặc.",
        material: "Vải Poly, Cotton",
        includes: "Fullset tiêu chuẩn",
        deposit: 400000,
        shop: {
          id: "shop-3",
          name: "Stitch Studio",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Stitch",
          rating: 4.9,
          totalItems: 85,
        },
      };
      this.selectedImage = this.costume.images[0];
    }
  }

  selectImage(img: string): void {
    this.selectedImage = img;
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }

  addToCart(): void {
    console.log(
      `Đã thêm ${this.quantity} ${this.costume?.name} size ${this.selectedSize} vào giỏ hàng`,
    );
    // Will integrate with cart service later
  }

  rentNow(): void {
    console.log(
      `Tiến hành thuê ${this.quantity} ${this.costume?.name} size ${this.selectedSize}`,
    );
    // Will navigate to checkout later
  }
}
