# NetDaemon documentation

This documentation site for NetDaemon is build using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

The documentation site for NetDaemon is hosted on [netlify](https://www.netlify.com/)

## Development

_It is recomended that you use the provided devcontainer when making changes to the documentation._

To do this, ensure that you have [docker](https://docs.docker.com/get-docker/) installed locally and that you are using a code editor that can develop within a container.

A great (and free!) option is to use Visual Studio Code and its [Dev Containers extension](https://code.visualstudio.com/docs/devcontainers/containers).

Using your code editor, open up this repo inside the container - if you are using VS Code and have the extension installed then just open up the folder and it should prompt you to open it as a container instead.

### Building the code within the container

Connect to the console within the container. If you are using VS Code then just go to the `TERMINAL` window and you should already have a console open.

If you're not using VS Code then find the container within Docker and start a command shell within it.

In either case, make sure you are sitting in the `/workspaces/netdaemon-docs` folder and then run `yarn start` - it should look like this:

```bash
root ➜ /workspaces/netdaemon-docs (readme-containers ✗) $ yarn start
yarn run v1.22.17
$ docusaurus start --host 0.0.0.0
[INFO] Starting the development server...
Warn: `blogDir` doesn't exist: "/workspaces/netdaemon-docs/blog".
[SUCCESS] Docusaurus website is running at: http://localhost:3000/

✔ Client
  Compiled successfully in 23.06s

client (webpack 5.74.0) compiled successfully
```

_Note that yarn can take a long time to start, during which time it appears to be doing nothing - have patience!_


Once Yarn has started you can connect to the newly built docs via your browser at http://localhost:3000/ (Docker automatically maps the port - just make sure that the port matches what is displayed in the terminal output).

If there is a problem with your docs (syntax error in a file, missing files etc.) then yarn should fail to start and tell you what's wrong. **It is essential that you fix all build issues** before submitting a pull-request, as otherwise GitHub won't be able to deploy the code either.



### Dynamic refresh of docs (maybe)

In theory, yarn should be able to tell when you make changes to the doc files and dynamically reflect the changes immediately in the live view.

In practise this doesn't seem to work for many people (investigations welcome!) so if you don't get dynamic changes then you'll need to kill yarn (`ctrl-c` in the terminal) and restart it.

Don't forget that you'll likely need to F5 your browser to force it to reload the changes.


### Forcing a clean up

If you are having problems with cached files etc. within the container you can force a rebuild by typing this into the terminal:

`rm -rf node_modules && yarn install`


## Submitting a pull request

Finally, once you've verified that the docs code builds correctly locally you can submit a pull request. The PR on GitHub will have a series of checks, including one for "build" - clicking the "view details" link on that check should point you to a GitHub-hosted version of your docs so you (and reviewers) can do a check of the generated documentation.

