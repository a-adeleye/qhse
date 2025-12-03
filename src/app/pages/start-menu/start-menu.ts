import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

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
                    style({ opacity: 0, transform: 'translateY(20px)' }),
                    stagger(50, [
                        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
                    ])
                ], { optional: true })
            ])
        ])
    ]
})
export class StartMenu {
    menuItems = [
        { title: 'Ambulift', icon: 'accessible', route: '/start/ambulift', description: 'Daily Inspection Checklist', color: '#4CAF50' },
        { title: 'Baggage Trolly', icon: 'luggage', route: '/start/baggage-trolly', description: 'Daily Inspection Checklist', color: '#2196F3' },
        { title: 'GPU', icon: 'power', route: '/start/gpu', description: 'Daily Inspection Checklist', color: '#9C27B0' },
        { title: 'JX027 TLD TMX 450', icon: 'local_shipping', route: '/start/jx027-tld-tmx-450', description: 'Daily Inspection Checklist', color: '#F44336' },
        { title: 'Lavatory Service', icon: 'wash', route: '/start/lavatory-service', description: 'Daily Inspection Checklist', color: '#00BCD4' },
        { title: 'Lektro - FBO GSE', icon: 'electric_bolt', route: '/start/lektro-fbo-gse', description: 'Daily Inspection Checklist', color: '#607D8B' },
        { title: 'Mobile Conveyor Belt (MCB)', icon: 'move_up', route: '/start/mobile-conveyor-belt', description: 'Daily Inspection Checklist', color: '#FF9800' },
        { title: 'Passenger Step', icon: 'stairs', route: '/start/passenger-step', description: 'Daily Inspection Checklist', color: '#795548' },
        { title: 'Toyota Tractor', icon: 'agriculture', route: '/start/toyota-tractor', description: 'Daily Inspection Checklist', color: '#3F51B5' },
        { title: 'Water Service', icon: 'water_drop', route: '/start/water-service', description: 'Daily Inspection Checklist', color: '#E91E63' },
        { title: 'Air Condition Unit', icon: 'ac_unit', route: '/start/air-condition-unit', description: 'Daily Inspection Checklist', color: '#673AB7' },
    ];
}
