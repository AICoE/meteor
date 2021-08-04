# Project Meteor

Similar to how a *meteoroid* enters the atmosphere, becomes visible as a *meteor* and finally hits the Earth's surface as a *meteorite*, with this initiative we aim to create better visibility and impact of the tools, processes and expertise developed by the AICoE through project *Meteor*.

This project is being driven by members of the Artificial Intelligence Center of Excellence (AICoE), part of Red Hat's Office of the CTO. This team is focused on applying AI to Red Hat's core business and services through open source development that enables user's needs and fosters open collaboration in the data science and machine learning space.

Project Meteor is a combined effort across the AICoE to provide a single tool for data scientists and other users where they can interact with, explore and leverage all of our services, tools and technologies for developing intelligent applications.

## Proof of concept

The first application is an interactive [AIDevSecOps tutorial](https://github.com/AICoE/elyra-aidevsecops-tutorial) and web application that is rendered as both a static [JupyterBook](https://jupyterbook.org/) and an interactive Jupyter Lab environment. The user adds the git repository of the tutorial to a webinterface which triggers the build and deployment pipelines in the background.

The entire project workflow is shown below:

![Project Workflow](/docs/images/project-flowchart.png)

All is build on the infrastructure and services provided by the [Operate First Community Cloud](https://www.operate-first.cloud/).

### AIDevSecOps Tutorial

The tutorial is used to discuss the interface between Data Science and DevOps using project templates, pipelines and bots. Moreover, it highlights that data scientists are not so different from developers, and DevSecOps practices and tools can (and should) be applied to MLOps.

The demo application used in this tutorial is the "hello world" for AI: MNIST Classification. The ML application developed itself is not the main focus of the product, but its the various services, workflows, and pipeline integrations supported by the product that we would like to highlight and provide for our users.

## Project Workstreams

In order to support the goals of Project Meteor, we have created 3 workstreams to efficiently manage and focus on the different aspects of the project. The workstreams are as follows:

### Team Comet

Team Comet focuses on the technical planning and implementation of the tool. Their main responsibilities include designing the technical roadmap/design of the tool, implementing the backend CI/build pipelines for deploying the web application and maintaining the application.

### Team Shooting Star

Team Shooting Star focuses on polishing the tutorial and project content, as well as other AICoE tutorials and workshops to be well adopted into the tool. Team members will work on improving the interactive tutorials both in terms of the content and the user experience from a data scientist perspective.

### Team Telescope

Team Telescope focuses on measuring the overall impact of the tool by implementing well defined metrics and dashboards. Team members will work with both developers and users to assess the tool, utilizing data and user feedback to suggest improvements.

## Community

To keep up with this project's progress, check out [Meteor](https://youtube.com/playlist?list=PL8VBRDTElCWp5i9bU486ewQDAQ0wYT0U4) on the Operate First YouTube channel.
