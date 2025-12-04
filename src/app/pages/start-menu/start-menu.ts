import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-start-menu',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './start-menu.html',
  styleUrls: ['./start-menu.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({opacity: 0, transform: 'translateY(20px)'}),
          stagger(50, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({opacity: 1, transform: 'translateY(0)'}))
          ])
        ], {optional: true})
      ])
    ])
  ]
})
export class StartMenu {
  menuItems = [
    {
      title: 'AmbuLift',
      icon: 'accessible',
      route: '/inspection/AmbuLift - Daily Inspection Checklist',
      description: 'Daily Inspection Checklist',
      color: '#4CAF50'
    },
    {
      title: 'Air Condition Unit',
      icon: 'ac_unit',
      route: '/inspection/Air Condition Unit - Daily Inspection Checklist',
      description: 'Daily Inspection Checklist',
      color: '#673AB7'
    },
    {
      title: 'Baggage Trolly',
      icon: 'luggage',
      route: '/inspection/Baggage Trolly - Daily Inspection Checklist',
      description: 'Daily Inspection Checklist',
      color: '#2196F3'
    },
    {
      title: 'FBO Vehicle',
      icon: 'directions_car',
      route: '/inspection/FBO Vehicle Daily Inspection Checklist',
      description: 'Daily Inspection Checklist',
      color: '#F44336'
    },
    {
      title: 'GPU',
      icon: 'power',
      route: '/inspection/GPU - Daily Inspection Checklist',
      description: 'Daily Inspection Checklist',
      color: '#9C27B0'
    },
    {
      title: 'JX027 TLD TMX 450',
      icon: 'local_shipping',
      route: '/inspection/JX027 TLD TMX 450 - Daily Inspection Checklist',
      description: 'Daily Inspection Checklist',
      color: '#795548'
    },
    {
      title: 'Lavatory Service',
      icon: 'wash',
      route: '/inspection/Lavatory Service - Daily Inspection Checklist',
      description: 'Daily Inspection Checklist',
      color: '#00BCD4'
    },
    {
      title: 'Lektro - FBO GSE',
      icon: 'electric_bolt',
      route: '/inspection/Lektro - Daily Inspection Checklist',
      description: 'Daily Inspection Checklist',
      color: '#607D8B'
    },
    {
      title: 'Mobile Conveyor Belt (MCB)',
      icon: 'move_up',
      route: '/inspection/Mobile Conveyor Belt (MCB) - Daily Inspection Checklist',
      description: 'Daily Inspection Checklist',
      color: '#FF9800'
    },
    {
      title: 'Passenger Step',
      icon: 'stairs',
      route: '/inspection/Passenger Step',
      description: 'Daily Inspection Checklist',
      color: '#9C27B0'
    },
    {
      title: 'Toyota Tractor',
      icon: 'agriculture',
      route: '/inspection/Toyota Tractor - Daily Inspection Checklist',
      description: 'Daily Inspection Checklist',
      color: '#3F51B5'
    },
    {
      title: 'Water Service',
      icon: 'water_drop',
      route: '/inspection/Water Service - Daily Inspection Checklist',
      description: 'Daily Inspection Checklist',
      color: '#E91E63'
    },
  ];
}
