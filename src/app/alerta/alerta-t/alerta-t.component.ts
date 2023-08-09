import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-alerta-t',
  templateUrl: './alerta-t.component.html',
  styleUrls: ['./alerta-t.component.css']
})
export class AlertaTComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToNextComponent() {
    // Navegar al siguiente componente
    this.router.navigate(['/Tecnico']);
  }
}
