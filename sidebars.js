module.exports = {
  someSidebar: {
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
        ]
      },
      {
        type: 'category',
        label: 'AppModel',
        items: [
          'v3/app_model/app_model',
          'v3/app_model/app_model_instancing',
          'v3/app_model/app_model_advanced_config',
          'v3/app_model/app_model_custom_logging',
          'v3/app_model/app_model_custom_config',
          'v3/app_model/app_model_moving_from_v2',
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
          'v3/hass_model/hass_model_subscribe_to_triggers',
          'v3/hass_model/hass_model_events',
          'v3/hass_model/hass_model_integration_servicecallback',
        ]
      },
      {
        type: 'category',
        label: 'Advanced',
        items: [
          'v3/advanced/call_ha_api',
          'v3/advanced/async_features',
          'v3/advanced/dev_workflow3'
        ]
      },
      {
        type: 'category',
        label: 'Extensions API',
        items: [
          'v3/extensions/extensions_scheduling',
          'v3/extensions/extensions_tts',
          'v3/extensions/extensions_mqttEntityManager',
        ]
      },
      {
        type:'category',
        label: 'Tutorials',
        items: [
          'v3/tutorials/publish_script',
          'v3/tutorials/webhost',
        ]
      },
      {
        type: 'category',
        label: 'Troubleshooting',
        items: [
          'v3/troubleshooting/trouble_call_service',
        ]
      },
    ],
  },
  "developer documentation": {
    "NetDaemon development": [
      "developer/developer",
      "developer/architecture",
      "developer/vscode",
      "developer/vs",
      "developer/unit_test"
    ]
  },
};
