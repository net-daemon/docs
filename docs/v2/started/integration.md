---
id: integration
title: Install NetDaemon integration
---

Using the NetDaemon custom integration enables you to
- Have service callbacks from Home Assistant to your code
- Create and update entities that survive restarts.

It is highly recommended to use this integration. The new integration requires NetDaemon 21.00.0 or higher to work.

We now support persistent entities for [SetState](v2/api/api_state.md#set-state-of-custom-entities) on the following domains:
- `binary_sensor`
- `sensor`
- `switch`
- `climate`

Other domains [SetState](v2/api/api_state.md#set-state-of-custom-entities) will create but not be persisted when restarted. You can also see warnings in logs using other domains.

## Installation

We recommend to install it through HACS to always have an updated version of the component. You can download it manually if you want.

1. Add `https://github.com/net-daemon/integration` with the category "integration" as a custom repository in [HACS](https://hacs.xyz/docs/faq/custom_repositories)
2. Install it in HACS
3. Clear browser cache and restart Home Assistant
4. Go to Configuration -> Integrations -> + -> Search for "NetDaemon" and install it.

## Integration repo
See [integration repo](https://github.com/net-daemon/integration) for details or reporting issues with the integrations
