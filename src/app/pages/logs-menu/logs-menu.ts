import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-logs-menu',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterLink],
    templateUrl: './logs-menu.html',
    styleUrls: ['./logs-menu.scss'],
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
export class LogsMenu {
    menuItems = [
        { title: 'Ambulift Logs', icon: 'accessible', route: '/logs/ambulift', description: 'View Ambulift inspection history', color: '#4CAF50' },
        { title: 'Baggage Trolly Logs', icon: 'luggage', route: '/logs/baggage-trolly', description: 'View Baggage Trolly inspection history', color: '#2196F3' },
        { title: 'GPU Logs', icon: 'power', route: '/logs/gpu', description: 'View GPU inspection history', color: '#9C27B0' },
        { title: 'JX027 TLD TMX 450 Logs', icon: 'local_shipping', route: '/logs/jx027-tld-tmx-450', description: 'View JX027 inspection history', color: '#F44336' },
        { title: 'Lavatory Service Logs', icon: 'wash', route: '/logs/lavatory-service', description: 'View Lavatory Service inspection history', color: '#00BCD4' },
        { title: 'Lektro - FBO GSE Logs', icon: 'electric_bolt', route: '/logs/lektro-fbo-gse', description: 'View Lektro inspection history', color: '#607D8B' },
        { title: 'Mobile Conveyor Belt Logs', icon: 'move_up', route: '/logs/mobile-conveyor-belt', description: 'View MCB inspection history', color: '#FF9800' },
        { title: 'Passenger Step Logs', icon: 'stairs', route: '/logs/passenger-step', description: 'View Passenger Step inspection history', color: '#795548' },
        { title: 'Toyota Tractor Logs', icon: 'agriculture', route: '/logs/toyota-tractor', description: 'View Toyota Tractor inspection history', color: '#3F51B5' },
        { title: 'Water Service Logs', icon: 'water_drop', route: '/logs/water-service', description: 'View Water Service inspection history', color: '#E91E63' },
        { title: 'Air Condition Unit Logs', icon: 'ac_unit', route: '/logs/air-condition-unit', description: 'View Air Condition Unit inspection history', color: '#673AB7' },
    ];
}
