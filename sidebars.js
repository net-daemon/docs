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
    'API': [
      'api/api',
      'api/api_entities',
      'api/api_state',
      'api/api_gen_entities',
      'api/api_call_service',
      'api/api_events',
      'api/api_scheduler',
      'api/api_storage',
      'api/api_configuration',
      'api/api_callback',
      'api/api_app',

      {
        type: 'category',
        label: 'V1 (deprecated)',
        items: [{
          type: 'category',
          label: 'Fluent',
          items: ['api/v1/fluent/entities', 'api/v1/fluent/state']
        },
        {
          type: 'category',
          label: 'Standard',
          items: ['api/v1/standard/configuration', 'api/v1/standard/getstate', 'api/v1/standard/scheduler', 'api/v1/standard/events', 'api/v1/standard/storage', 'api/v1/standard/get_app']
        },
        {
          type: 'category',
          label: 'Auto generated',
          items: ['api/v1/generated/generated']
        }]
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
      "developer/vs",
      "developer/unit_test"
    ]
  },
};
