import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NzResultModule } from "ng-zorro-antd/result";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzTagModule } from "ng-zorro-antd/tag";

@Component({
  selector: "app-search-results",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzResultModule,
    NzButtonModule,
    NzIconModule,
    NzGridModule,
    NzCardModule,
    NzTagModule,
  ],
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.scss"],
})
export class SearchResultsComponent {
  suggestions = [
    {
      id: 5,
      name: "Mẫu anime concept 01",
      price: "100,000đ",
      unit: "/ngày",
      image: "/asset/mẫu ảnh/mẫu_4.1.jpg",
      rating: 4.8,
      category: "Anime",
    },
    {
      id: 6,
      name: "Đồng phục Shujin (Persona 5)",
      price: "130,000đ",
      unit: "/ngày",
      image: "/asset/mẫu ảnh/mẫu_4.2.jpg",
      rating: 4.9,
      category: "Game",
    },
  ];
}
