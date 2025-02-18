---
id: integration
title: Install NetDaemon integration
---

The NetDaemon custom integration is optional but recommended
to get access to all NetDaemon features.

Using the NetDaemon custom integration enables you to

- Use the service callbacks from Home Assistant to your code

The integration requires NetDaemon 21.00.0 or higher to work.

## Installation

We recommend to install the custom integration through [HACS](https://hacs.xyz/).

1. Add `https://github.com/net-daemon/integration` with the category "integration" as a custom repository in [HACS](https://hacs.xyz/docs/faq/custom_repositories)
2. Install it in HACS
3. Clear browser cache and restart Home Assistant
4. Go to Configuration -> Integrations -> + -> Search for "NetDaemon" and install it.

## Integration repo

See [integration repo](https://github.com/net-daemon/integration) for details or reporting issues with the integrations
