import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzSelectModule } from "ng-zorro-antd/select";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzGridModule,
    NzCardModule,
    NzTagModule,
    NzSelectModule,
  ],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  search = {
    category: null as string | null,
    keyword: "",
  };

  categoryOptions = [
    { label: "Anime", value: "anime" },
    { label: "Game", value: "game" },
    { label: "Movie", value: "movie" },
    { label: "Original", value: "original" },
  ];

  heroStats = [
    { label: "Trang phục sẵn sàng", value: "2,500+" },
    { label: "Đối tác dịch vụ", value: "300+" },
    { label: "Đánh giá trung bình", value: "4.9/5" },
  ];

  categories = [
    { name: "Anime", icon: "fire", count: "980+" },
    { name: "Game", icon: "rocket", count: "740+" },
    { name: "Movie", icon: "video-camera", count: "420+" },
    { name: "Original", icon: "star", count: "360+" },
  ];

  featuredCostumes = [
    {
      id: 1,
      name: "Tanjiro Kamado Full Set",
      category: "Anime",
      price: "149.000đ / ngày",
      rating: 4.9,
      image: "/asset/mẫu ảnh/mẫu_2.3.jpg",
      tag: "Hot",
      favorite: false,
    },
    {
      id: 2,
      name: "Yae Miko Premium",
      category: "Game",
      price: "239.000đ / ngày",
      rating: 4.8,
      image: "/asset/mẫu ảnh/mẫu_7.2.jpg",
      tag: "Mới",
      favorite: false,
    },
    {
      id: 3,
      name: "Spider Verse - Miles",
      category: "Movie",
      price: "189.000đ / ngày",
      rating: 4.9,
      image: "/asset/mẫu ảnh/mẫu_7.1.jpg",
      tag: "Trending",
      favorite: false,
    },
    {
      id: 4,
      name: "Gojo Satoru Signature Set",
      category: "Anime",
      price: "219.000đ / ngày",
      rating: 4.8,
      image: "/asset/mẫu ảnh/kuoronami.jpg",
      tag: "Mới",
      favorite: false,
    },
  ];

  howItWorks = [
    {
      title: "Chọn concept",
      desc: "Lọc nhanh theo nhân vật, sự kiện và ngân sách.",
      icon: "search",
    },
    {
      title: "Đặt lịch & dịch vụ",
      desc: "Chọn ngày thuê, makeup artist hoặc photographer.",
      icon: "calendar",
    },
    {
      title: "Nhận đồ & tỏa sáng",
      desc: "Nhận trang phục đúng hẹn và sẵn sàng xuất hiện.",
      icon: "check-circle",
    },
  ];

  testimonials = [
    {
      name: "Ngọc Anh",
      role: "Cosplayer",
      content:
        "Đồ lên form đẹp, sạch và support cực nhanh. Đi event yên tâm hẳn.",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=240&auto=format&fit=crop",
    },
    {
      name: "Minh Trí",
      role: "Nhiếp ảnh gia",
      content: "Mình book combo đồ + makeup, workflow gọn và đúng giờ.",
      avatar:
        "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=240&auto=format&fit=crop",
    },
  ];

  onSearch(): void {
    console.log("[Landing] search:", this.search);
  }

  toggleFavorite(event: Event, item: { favorite: boolean }): void {
    event.stopPropagation();
    item.favorite = !item.favorite;
  }
}
