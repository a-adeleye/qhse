import {Injectable} from '@angular/core';

export interface LogAnswer {
  question: string;
  answer: boolean;
}

export interface LogEntry {
  id: string;
  title: string;
  createdAt: string; // ISO string for simplicity
  answers: LogAnswer[];
}

@Injectable({providedIn: 'root'})
export class LogsService {
  private readonly logs: LogEntry[] = [
    {
      id: 'LOG-001',
      title: 'Daily Safety Checklist',
      createdAt: new Date().toISOString(),
      answers: [
        {question: 'Is the equipment ready?', answer: true},
        {question: 'Are safety checks complete?', answer: true},
        {question: 'Do you acknowledge the policy?', answer: true},
      ],
    },
    {
      id: 'LOG-002',
      title: 'Forklift Pre-Use Inspection',
      createdAt: new Date(Date.now() - 3600_000).toISOString(),
      answers: [
        {question: 'Is the equipment ready?', answer: true},
        {question: 'Are safety checks complete?', answer: false},
        {question: 'Do you acknowledge the policy?', answer: true},
      ],
    },
    {
      id: 'LOG-003',
      title: 'First Aid Station Check',
      createdAt: new Date(Date.now() - 86_400_000).toISOString(),
      answers: [
        {question: 'Is the equipment ready?', answer: true},
        {question: 'Are safety checks complete?', answer: true},
        {question: 'Do you acknowledge the policy?', answer: false},
      ],
    },
    {
      id: 'LOG-004',
      title: 'Site Entry Screening',
      createdAt: new Date(Date.now() - 2 * 86_400_000).toISOString(),
      answers: [
        {question: 'Is the equipment ready?', answer: true},
        {question: 'Are safety checks complete?', answer: true},
        {question: 'Do you acknowledge the policy?', answer: true},
      ],
    },
    {
      id: 'LOG-005',
      title: 'Chemical Storage Audit',
      createdAt: new Date(Date.now() - 3 * 86_400_000).toISOString(),
      answers: [
        {question: 'Is the equipment ready?', answer: false},
        {question: 'Are safety checks complete?', answer: false},
        {question: 'Do you acknowledge the policy?', answer: true},
      ],
    },
  ];

  getLogs(): LogEntry[] {
    return this.logs;
  }

  getLogById(id: string): LogEntry | undefined {
    return this.logs.find(l => l.id === id);
  }
}

