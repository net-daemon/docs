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
        items: ['api/standard/configuration', 'api/standard/getstate', 'api/standard/scheduler', 'api/standard/events', 'api/standard/storage', 'api/standard/get_app']
      },
      {
        type: 'category',
        label: 'Auto generated',
        items: ['api/generated/generated']
      },
    ],
    Advanced: [
      'advanced/thread_safety'
      // {
      //   type: 'category',
      //   label: 'Advanced topics',
      //   items: ['advanced/thread_safety']
      // }
    ],

  },
  "developer documentation": {
    "NetDaemon development": [
      "developer/developer",
      "developer/vscode",
      "developer/vs"
    ]
  },
};
