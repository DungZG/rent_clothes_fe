import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzSliderModule } from "ng-zorro-antd/slider";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { NzRateModule } from "ng-zorro-antd/rate";

@Component({
  selector: "app-listing",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NzGridModule,
    NzCardModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzSelectModule,
    NzSliderModule,
    NzCheckboxModule,
    NzPaginationModule,
    NzTagModule,
    NzBreadCrumbModule,
    NzRateModule,
  ],
  templateUrl: "./listing.component.html",
  styleUrls: ["./listing.component.scss"],
})
export class ListingComponent {
  priceRange: [number, number] = [0, 1000000];

  categories = [
    { label: "Anime/Manga", value: "anime", checked: false },
    { label: "Game", value: "game", checked: false },
    { label: "Movie/TV Series", value: "movie", checked: false },
    { label: "Original/Concept", value: "original", checked: false },
    { label: "Vocaloid", value: "vocaloid", checked: false },
  ];

  sizes = [
    { label: "S", checked: false },
    { label: "M", checked: false },
    { label: "L", checked: false },
    { label: "XL", checked: false },
  ];

  costumes = [
    {
      id: 1,
      name: "Yae Miko Shrine Maiden",
      price: 320000,
      image: "/asset/mẫu ảnh/mẫu_2.jpg",
      rating: 4.9,
      reviews: 126,
      category: "Game",
    },
    {
      id: 2,
      name: "Nezuko Kimono Premium",
      price: 280000,
      image: "/asset/mẫu ảnh/mẫu_1.2.jpg",
      rating: 4.8,
      reviews: 98,
      category: "Anime",
    },
    {
      id: 3,
      name: "Marin Kitagawa School Look",
      price: 350000,
      image: "/asset/mẫu ảnh/Mẫu_1.3.jpg",
      rating: 4.9,
      reviews: 114,
      category: "Anime",
    },
    {
      id: 4,
      name: "Raiden Shogun Ceremony Set",
      price: 390000,
      image: "/asset/mẫu ảnh/mẫu_4.jpg",
      rating: 4.7,
      reviews: 87,
      category: "Game",
    },
    {
      id: 5,
      name: "Asuna Sword Art Online",
      price: 260000,
      image: "/asset/mẫu ảnh/mẫu_2.2.jpg",
      rating: 4.6,
      reviews: 73,
      category: "Anime",
    },
    {
      id: 6,
      name: "Mikasa Tactical Outfit",
      price: 300000,
      image: "/asset/mẫu ảnh/mẫu 1.jpg",
      rating: 4.8,
      reviews: 102,
      category: "Anime",
    },
    {
      id: 7,
      name: "2B Automata Black Dress",
      price: 420000,
      image: "/asset/mẫu ảnh/mẫu_7.1.jpg",
      rating: 4.9,
      reviews: 141,
      category: "Game",
    },
    {
      id: 8,
      name: "Zero Two Battle Suit",
      price: 310000,
      image: "/asset/mẫu ảnh/mẫu_3.jpg",
      rating: 4.7,
      reviews: 89,
      category: "Anime",
    },
    {
      id: 9,
      name: "Hinata Festival Yukata",
      price: 240000,
      image: "/asset/mẫu ảnh/mẫu_5.jpg",
      rating: 4.6,
      reviews: 67,
      category: "Anime",
    },
    {
      id: 10,
      name: "Lucy Edgerunners Set",
      price: 360000,
      image: "/asset/mẫu ảnh/mẫu_7.jpg",
      rating: 4.8,
      reviews: 95,
      category: "Game",
    },
    {
      id: 11,
      name: "Nami Pirate Princess",
      price: 290000,
      image: "/asset/mẫu ảnh/mẫu_6.jpg",
      rating: 4.7,
      reviews: 84,
      category: "Anime",
    },
    {
      id: 12,
      name: "Sailor Moon Classic",
      price: 330000,
      image: "/asset/mẫu ảnh/mẫu_7.2.jpg",
      rating: 4.8,
      reviews: 109,
      category: "Anime",
    },
  ];

  formatPrice(price: number): string {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }
}
