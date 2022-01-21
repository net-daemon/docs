module.exports = {
  someSidebar: {
    Documentation: [
      'v2/index',
      {
        type: 'category',
        label: 'Getting started',
        items: [
          'v2/started/get_started',
          'v2/started/development',
          'v2/started/installation',
          'v2/started/integration',
          'v2/started/tips_and_tricks',
          'v2/started/example',
          'v2/started/hacs'

        ]
      },
      {
        type: 'category',
        label: 'AppModel',
        items: [
          'v2/app_model/app_model',
          'v2/app_model/app_model_instancing',
          'v2/app_model/app_model_advanced_config',
          'v2/app_model/app_model_context',
          'v2/app_model/app_model_custom_logging'
        ],
      },
      {
        type: 'category',
        label: 'HassModelApi',
        items: [
          'v2/hass_model/hass_model',
          'v2/hass_model/hass_model_codegen',
          'v2/hass_model/hass_model_generated_entities',
          'v2/hass_model/hass_model_generated_service',
          'v2/hass_model/hass_model_working_with_entities',
          'v2/hass_model/hass_model_events',
          'v2/hass_model/hass_model_integration_servicecallback',
          'v2/hass_model/hass_model_migration'
        ]
      },
      {
        type: 'category',
        label: 'Extensions API',
        items: [
          {
            type: 'category',
            label: 'Scheduling',
            items: [
              'v2/extensions/scheduling/extensions_scheduling',
            ]
          },
        ]
      },
      {
        type: 'category',
        label: 'Deprecated',
        items: [
          {
            type: 'category',
            label: 'Baseclass API',
            items: [
              'v2/api/api',
              'v2/api/api_entities',
              'v2/api/api_state',
              'v2/api/api_gen_entities',
              'v2/api/api_call_service',
              'v2/api/api_events',
              'v2/api/api_scheduler',
              'v2/api/api_storage',
              'v2/api/api_configuration',
              'v2/api/api_callback',
              'v2/api/api_app'
            ],
          },
        ]
      },
    ],
  },
  someSidebar2: {
    Documentation: [
      'v3/index',
      {
        type: 'category',
        label: 'Getting started',
        items: [
          'v3/started/get_started',
          'v3/started/development',
          'v3/started/installation',
          'v3/started/integration',
          'v3/started/example',
          'v3/started/hacs'

        ]
      },
      {
        type: 'category',
        label: 'AppModel',
        items: [
          'v3/app_model/app_model',
          'v3/app_model/app_model_instancing',
          'v3/app_model/app_model_advanced_config',
          'v3/app_model/app_model_custom_logging'
        ],
      },
      {
        type: 'category',
        label: 'HassModelApi',
        items: [
          'v3/hass_model/hass_model',
          'v3/hass_model/hass_model_codegen',
          'v3/hass_model/hass_model_generated_entities',
          'v3/hass_model/hass_model_generated_service',
          'v3/hass_model/hass_model_working_with_entities',
          'v3/hass_model/hass_model_events',
          'v3/hass_model/hass_model_integration_servicecallback',
          'v3/hass_model/hass_model_migration'
        ]
      },
      {
        type: 'category',
        label: 'Extensions API',
        items: [
          {
            type: 'category',
            label: 'Scheduling',
            items: [
              'v3/extensions/scheduling/extensions_scheduling',
            ]
          },
        ]
      },
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
