---
id: hacs
title: HACS support
---

:::warning

HACS deployment model is deprecated and will be removed 
as of version 2 of HACS. Please do not add new apps.

We are currently investigate future deployment scenarios
for NetDaemon V3 apps.

:::

It is also possible to get applications through [HACS](https://hacs.xyz/). This is still early so you will have to get the latest version of HACS and uninstall and install it again if you have already configured through GUI.

Here are [detailed instructions](https://hacs.xyz/docs/categories/netdaemon_apps) on how to enable getting NetDaemon apps through HACS

## Contribute own apps through HACS

There are still not many apps available yet but please if you can contribute apps there are a [template here](https://github.com/net-daemon/netdaemon-app-template).

[Instructions for developing apps for HACS here](https://hacs.xyz/docs/publish/netdaemon)

To deploy HAC apps the default runtime is supported. Custom projects or published binaries are currently not supported.

## Attribution

Thanks [@ludeeus](https://github.com/ludeeus) for your awesome work with HACS and getting NetDaemon support in it.
