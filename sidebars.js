module.exports = {
  someSidebar: {
    Documentation: [
      'user/index',
      'user/whats_new_v4', 
      {
        type: 'category',
        label: 'Getting started',
        items: [
          'user/started/get_started',
          'user/started/development',
          'user/started/installation',
          'user/started/integration',
          'user/started/example',
        ]
      },
      {
        type: 'category',
        label: 'AppModel',
        items: [
          'user/app_model/app_model',
          'user/app_model/app_model_instancing',
          'user/app_model/app_model_advanced_config',
          'user/app_model/app_model_custom_logging',
          'user/app_model/app_model_custom_config',
          'user/app_model/app_model_moving_from_v3',
        ],
      },
      {
        type: 'category',
        label: 'HassModelApi',
        items: [
          'user/hass_model/hass_model',
          'user/hass_model/hass_model_codegen',
          'user/hass_model/hass_model_generated_entities',
          'user/hass_model/hass_model_generated_service',
          'user/hass_model/hass_model_working_with_entities',
          'user/hass_model/hass_model_subscribe_to_triggers',
          'user/hass_model/hass_model_events',
          'user/hass_model/hass_model_notifications',
          'user/hass_model/hass_model_integration_servicecallback',
        ]
      },
      {
        type: 'category',
        label: 'Advanced',
        items: [
          'user/advanced/call_ha_api',
          'user/advanced/async_features',
          'user/advanced/dev_workflow3'
        ]
      },
      {
        type: 'category',
        label: 'Extensions API',
        items: [
          'user/extensions/extensions_scheduling',
          'user/extensions/extensions_tts',
          'user/extensions/extensions_mqttentitymanager',
        ]
      },
      {
        type:'category',
        label: 'Tutorials',
        items: [
          'user/tutorials/publish_script',
          'user/tutorials/webhost',
        ]
      },
      {
        type: 'category',
        label: 'Troubleshooting',
        items: [
          'user/troubleshooting/trouble_call_service',
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
