import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar-service';
import { HttpClient } from '@angular/common/http';

interface MenuItem {
  icon: string;
  label: string;
  children?: MenuItem[];
  isOpen?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  private http = inject(HttpClient);

  constructor(private sideBarService: SidebarService) {
    const opdusCod = this.sideBarService.obterOpdusCod()
    this.buscaItensMenu(opdusCod)
  }

  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();

  items: MenuItem[] = [
    {
      icon: 'fal fa-user-headset',
      label: 'Operadoras',
      isOpen: false,
      children: [
        { icon: 'fas fa-chart-pie', label: 'Clientes' },
        { icon: 'fas fa-tasks', label: 'Tabela de preços Base' },
        { icon: 'fas fa-tasks', label: 'Modelos de contratos' },
        { icon: 'fas fa-tasks', label: 'Histórico de atualizações' },
        { icon: 'fas fa-tasks', label: 'Histórico de interações' },
      ],
    },
    {
      icon: 'fal fa-stethoscope',
      label: 'Prestadores',
      children: [
        { icon: 'fas fa-chart-pie', label: 'Clientes' },
        { icon: 'fas fa-tasks', label: 'Tabela de preços Base' },
        { icon: 'fas fa-tasks', label: 'Modelos de contratos' },
        { icon: 'fas fa-tasks', label: 'Histórico de atualizações' },
        { icon: 'fas fa-tasks', label: 'Coeficientes da dimensionamento' },
        { icon: 'fas fa-chart-pie', label: 'Repositório' },
        { icon: 'fas fa-tasks', label: 'Comunicados' },
        { icon: 'fas fa-tasks', label: 'Ocorrências' },
        { icon: 'fas fa-tasks', label: 'Atas de reuniões' },
        { icon: 'fas fa-tasks', label: 'Agenda' },
      ],
    },
    {
      icon: 'fal fa-users',
      label: 'Relacionamento',
    },
    {
      icon: 'fal fa-cog',
      label: 'Configurações',
    },
  ];

  buscaItensMenu(opdusCod: number | undefined) {
    this.http.get('/rede/apirest/controle_link_view/carregaVEstrutAcessoUsuar/'+opdusCod +'/'+"'M'"+'/'+null+'/'+null).subscribe((res: any) => {
      console.log(res)
    })
  }

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }

  toggleMenuItem(item: MenuItem) {
    if (!this.isLeftSidebarCollapsed() && item.children) {
      console.log(item)
      item.isOpen = !item.isOpen;
    }
  }

}
