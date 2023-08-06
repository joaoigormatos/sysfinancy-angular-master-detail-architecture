import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = []

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe((data: Category[]) => {
      this.categories = data
    },
    error => alert(`Error ao carregar a lista`)
    )
  }

  deleteCategory(id: number) {
    const mustDelete = confirm("Deseja mesmo excluir essa categoria?")

    if(mustDelete) {
      this.categoryService.delete(id).subscribe(()=> {
        this.categories = this.categories.filter((category) => category.id !== id)
      },
      (error) => alert(`Error na delação da categoria`)
      )
    }
  }
}
