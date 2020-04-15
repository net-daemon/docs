module.exports = {
  someSidebar: {
    Documentation: [
      'index',
      {
        type: 'category',
        label: 'Getting started',
        items: ['started/installation', 'started/development', 'started/tips_and_tricks', 'started/example', 'started/hacs']
      },
    ],
    API: [
      'api/api',
      {
        type: 'category',
        label: 'Fluent',
        items: ['api/fluent/entities', 'api/fluent/state']
      },
      {
        type: 'category',
        label: 'Standard',
        items: ['api/standard/getstate', 'api/standard/scheduler', 'api/standard/storage']
      },
      {
        type: 'category',
        label: 'Auto generated',
        items: ['api/generated/generated']
      },
    ]

  },
};
