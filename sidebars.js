module.exports = {
  someSidebar: {
    Documentation: [
      'index',
      {
        type: 'category',
        label: 'Getting started',
        items: [
          'started/get_started',
          'started/development',
          'started/installation',
          'started/integration',
          'started/tips_and_tricks',
          'started/example',
          'started/hacs']
      },
    ],
      'AppModel API': [
        'app_model/app_model',
        'app_model/app_model_instancing',
        'app_model/app_model_advanced_config',
        'app_model/app_model_context',
      ],
      'HassModel API': [
        'hass_model/hass_model',
        'hass_model/hass_model_codegen',
        'hass_model/hass_model_generated_entities',
        'hass_model/hass_model_generated_service',
        'hass_model/hass_model_working_with_entities',
        'hass_model/hass_model_migration'
      ],
      'Extensions API': [
        {
          'Scheduling': [
            'extensions/scheduling/extensions_scheduling',
          ]
        },
      ],
    'V2 API (deprecated)': [
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
      'api/api_app'
    ],
    Advanced: [
      'advanced/thread_safety',
      'advanced/dev_workflow'
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
