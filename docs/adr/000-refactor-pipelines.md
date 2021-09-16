# Refactor all Build and Deployment Pipelines into external component

* Status: accepted
* Deciders:
* Date: 2021-09-15

## Context and Problem Statement

Meteor builder is ment as an orchestrator build and deploy tasks. Embedding the build and deploy logic itself into meteor or
meteor-operator introduces a tight compling of components that makes independend development and code reuse harder.

This ADR proposed the isolation of all build and deployment related Tekton/OpenShift Pipelines into a separate component. This
component would provide a specific set of pipelines, that could be used by Meteor to build and deploy meteors.

## Decision Drivers

Build and deployment of container images and applications is a utility that could be reused in different scenarios, therefore
a separation of these is advised.

## Considered Options

1. Tekton YAML as port of meteor-operator
2. Tekton YAML as a seperate Helm application
3. Tekton YAML as a seperate GitHub with Kustomize manifests
4. Tekton YAML as a seperate Tekton Bundle

## Decision Outcome

Chosen option: _"2. Tekton YAML as a seperate Helm application"_, because it's seems to be the best way to distribute and
deploy these components to many different deployments, including customer depolyments.

### Positive Consequences

* Tekton YAML can be developed and distributed independently of Meteor builder.
* Python Module Build/Delivery Pipelines can be deployed independently of Meteor builder.
* all build/deliver/deploy related components are maintained in one place

### Negative Consequences

* a stable interface between two projects need to be maintained
* ArgoCD needs to deploy Helm
