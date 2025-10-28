import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('HomePage <=> Page', [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        })
      ]),
      query(':enter', [
        style({left: '-100%'})
      ], {optional: true}),
      query(':leave', animateChild(), {optional: true}),
      group([
        query(':leave', [
          animate('300ms ease-out', style({left: '100%'}))
        ], {optional: true}),
        query(':enter', [
          animate('300ms ease-out', style({left: '0%'}))
        ], {optional: true}),
      ]),
    ]),
    transition('* <=> *', [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], {optional: true}),
      query(':enter', [
        style({left: '-100%'})
      ], {optional: true}),
      query(':leave', animateChild(), {optional: true}),
      group([
        query(':leave', [
          animate('200ms ease-out', style({left: '100%', opacity: 0}))
        ], {optional: true}),
        query(':enter', [
          animate('300ms ease-out', style({left: '0%'}))
        ], {optional: true}),
        query('@*', animateChild(), {optional: true})
      ]),
    ])
  ]);

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    style({position: 'relative'}),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], {optional: true}),
    query(':enter', [
      style({opacity: 0})
    ], {optional: true}),
    group([
      query(':leave', [
        animate('300ms ease-out', style({opacity: 0}))
      ], {optional: true}),
      query(':enter', [
        animate('300ms ease-out', style({opacity: 1}))
      ], {optional: true})
    ])
  ])
]);
