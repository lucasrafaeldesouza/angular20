import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parametros-rotas',
  imports: [],
  templateUrl: './parametros-rotas.html',
  styleUrl: './parametros-rotas.css'
})
export class ParametrosRotas implements OnInit {

  id: string | null = '';

  // Esse é um arquivo exemplo para adicionar parametros nas rotas
  // this.router.navigate(['/parametrosRotas/'+ data]);

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')
      console.log(this.id)
    })
  }

}
