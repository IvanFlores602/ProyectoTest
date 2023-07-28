import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alerta-p',
  templateUrl: './alerta-p.component.html',
  styleUrls: ['./alerta-p.component.css']
})
export class AlertaPComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToNextComponent() {
    // Navegar al siguiente componente
    this.router.navigate(['/testp']);
  }
}
