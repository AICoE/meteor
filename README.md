# Project Meteor

Available at: https://shower.meteor.zone

Similar to how a *meteoroid* enters the atmosphere, becomes visible as a *meteor* and finally hits the Earth's surface as a *meteorite*, with this initiative we aim to create better visibility and impact of the tools, processes and expertise developed by the AICoE through project *Meteor*.

This project is being driven by members of the Artificial Intelligence Center of Excellence (AICoE), part of Red Hat's Office of the CTO. This team is focused on applying AI to Red Hat's core business and services through open source development that enables user's needs and fosters open collaboration in the data science and machine learning space.

Project Meteor is a combined effort across the AICoE to provide a single tool for data scientists and other users where they can interact with, explore and leverage all of our services, tools and technologies for developing intelligent applications.

## Installation

### Prerequisites

* OpenShift Pipelines
* OpenShift 4.7+

### Steps

Meteor can be installed as an Operator to any OpenShift cluster.

Since we're still in early stages of development, we require users to deploy a custom Operator Catalog to allow faster iterations. In future the Meteor operator will be included as a Community Operator to standard OpenShift operator catalog.

1. Deploy CatalogSource

   ```sh
   oc apply -f https://raw.githubusercontent.com/AICoE/meteor-operator/main/config/olm/catalogsource.yaml
   ```

2. Subscribe to the Operator. This can be done either via UI - OpenShift web console under Administrator perspective -> Operators -> Operator Hub -> search for "Meteor" and click Install or manually via CLI:

   ```sh
   oc new-project aicoe-meteor
   oc apply -f https://raw.githubusercontent.com/AICoE/meteor-operator/main/config/olm/operatorgroup.yaml
   oc apply -f https://raw.githubusercontent.com/AICoE/meteor-operator/main/config/olm/subscription.yaml
   ```

3. Deploy Meteor Shower

   ```sh
   kustomize build github.com/AICoE/meteor/manifests | oc apply -f -
   ```

4. Deploy pipelines provided by Project Meteor and Meteor auxillary deployments

   ```sh
   kustomize build github.com/AICoE/meteor-operator/config/pipelines | oc apply -f -
   kustomize build github.com/AICoE/meteor-operator/config/pushgateway | oc apply -f -
   ```

All steps are subject to change in future updates. We aim to bake in steps 3 and 4 into the operator itself to provide a single click deployment scheme.

## Community

To keep up with this project's progress, check out [Meteor](https://youtube.com/playlist?list=PL8VBRDTElCWp5i9bU486ewQDAQ0wYT0U4) on the Operate First YouTube channel.
