import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfirmDialogService } from '../../services/confirm-dialog';
import { InfoUserLogin } from '../../services/info-user-login';
import { MenuItem } from '../../models/roteamento.model';
import { Roteamento } from '../../services/roteamento';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  private http = inject(HttpClient);
  private opdusCod: number;

  constructor(private infoUserLogin: InfoUserLogin, private roteamento: Roteamento, private ConfirmDialogService: ConfirmDialogService, private router: Router) {
    this.opdusCod = this.infoUserLogin.getOpdusCod()
    this.buscaItensMenu(this.opdusCod)
  }

  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();

  items: MenuItem[] = [];

  buscaItensMenu(opdusCod: number) {
    this.http.get('/rede/apirest/controle_link_view/carregaVEstrutAcessoUsuar/'+opdusCod +'/'+"'M'"+'/'+null+'/'+null).subscribe((res: any) => {
      let itemFixo = {
        icon: 'fal fa-book',
        opaeDsc: 'Manuais',
        vestrutAcessoUsuarItens: [
          { icon: '', opaeDsc: 'Cadastro'},
          { icon: '', opaeDsc: 'Dimensionamento'},
          { icon: '', opaeDsc: 'Qualificação'}
        ],
        isOpen: false
      }
      res.forEach((objeto: any) => {
        switch (objeto.opaeDsc) {
          case "Cadastro":
            objeto.icon = "fal fa-plus"
          break;
          case "Administrador":
            objeto.icon = "fal fa-user-tie"
          break;
          case "Operadora":
            objeto.icon = "fal fa-user-headset"
          break;
          case "Prestador":
            objeto.icon = "fal fa-stethoscope"
          break;
          case "Relacionamento":
            objeto.icon = "fal fa-users"
          break;
          case "Dimensionamento":
            objeto.icon = "fal fa-vector-square"
          break;
          case "Qualificação":
            objeto.icon = "fal fa-user-minus"
          break;
          case "Plano de Ação":
            objeto.icon = "fal fa-list-ol"
          break;
        }
        this.roteamento.buscaLinkItensMenu(objeto.vestrutAcessoUsuarItens)
      });
      this.items = res
      this.items.push(itemFixo)
    })
  }

  logout() {
    this.ConfirmDialogService.confirm("Tem certeza disso?", "Deseja realmente sair do sistema PRIMe?", "Sim, quero sair", "Não").then((confirmed) => {
      if(confirmed){
        this.router.navigate(['/login']);
      }
    })
  }

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }

  toggleMenuItem(item: MenuItem) {
    if (!this.isLeftSidebarCollapsed() && item.vestrutAcessoUsuarItens) {
      item.isOpen = !item.isOpen;
    }
  }

}
