export const CURRICULUM_DATA = [
  {
    id: 'module-1',
    title: 'Module 1: Skip Barber Fundamentals',
    subtitle: 'Racetrack Physics & The 3-Tiered Priority Pyramid',
    badge: 'Core Physics',
    chapters: [
      {
        id: 'chap-1',
        title: 'Chapter 1: A Plan of Attack',
        subtitle: 'Demystifying racetrack chaos through a systematic methodology',
        steps: [
          {
            id: 'step-1-1',
            type: 'theory',
            title: '1. Theory & Priority Pyramid',
            shortName: 'Priority Pyramid',
            icon: 'BookOpen',
            estimatedMin: 5,
            description: 'Learn Skip Barber\'s 3 fundamental driver problems and the priority pyramid.'
          },
          {
            id: 'step-1-2',
            type: 'simulator',
            title: '2. Corner Radius & Path Simulator',
            shortName: 'Line Simulator',
            icon: 'Activity',
            estimatedMin: 10,
            description: 'Interactive canvas simulation calculating maximum cornering velocity and lateral G-force based on arc radius.'
          },
          {
            id: 'step-1-3',
            type: 'sebring',
            title: '3. Sebring Telemetry Walkthrough',
            shortName: 'Sebring Telemetry',
            icon: 'MapPin',
            estimatedMin: 12,
            description: '8-step telemetry turn-by-turn breakdown around Sebring International Raceway in the Dodge Viper.'
          },
          {
            id: 'step-1-4',
            type: 'assessment',
            title: '4. Driver Self-Assessment Rubric',
            shortName: 'Self-Assessment',
            icon: 'CheckSquare',
            estimatedMin: 8,
            description: 'Rate your driving habits against Priority 1, 2 & 3 criteria and common mistake checklists.'
          },
          {
            id: 'step-1-5',
            type: 'quiz',
            title: '5. Scenario Knowledge Check',
            shortName: 'Scenario Quiz',
            icon: 'HelpCircle',
            estimatedMin: 10,
            description: 'Test your understanding of Skip Barber driving concepts with scenario-based questions.'
          },
          {
            id: 'step-1-6',
            type: 'tracker',
            title: '6. Practice Session Logger',
            shortName: 'Practice Log',
            icon: 'ClipboardList',
            estimatedMin: 5,
            description: 'Record sim racing practice sessions, lap times, setup notes, and focus areas.'
          }
        ]
      }
    ]
  }
];
