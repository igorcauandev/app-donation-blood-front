import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLinkActive, RouterLink } from '@angular/router';

export interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive, RouterLink],
  templateUrl: './sidebar-component.html',
  styleUrls: ['./sidebar-component.css']
})

export class SidebarComponent {
  navItems: NavItem[] = [
    { label: 'Painel',       route: '/painel',       icon: 'grid'      },
    { label: 'Doadores',     route: '/doadores',     icon: 'user'      },
    { label: 'Estoque',      route: '/estoque',       icon: 'box'       },
    { label: 'Doações',      route: '/doacoes',      icon: 'heart'     },
    { label: 'Campanhas', route: '/campanhas', icon: 'flag'  },
  ];
}