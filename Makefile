# VERSION defines the project version for the bundle.
# Update this value when you upgrade the version of your project.
# To re-generate a bundle for another specific version without changing the standard setup, you can:
# - use the VERSION as arg of the bundle target (e.g make bundle VERSION=0.0.2)
# - use environment variables to overwrite this value (e.g export VERSION=0.0.2)
VERSION ?= 0.0.1

# IMAGE_TAG_BASE defines the docker.io namespace and part of the image name for remote images.
#
# For example, running 'make docker-build docker-push' will build and push quay.io/aicoe/meteor-shower:$VERSION.
IMAGE_TAG_BASE ?= quay.io/aicoe/meteor-shower

# Image URL to use all building/pushing image targets
IMG ?= $(IMAGE_TAG_BASE):v$(VERSION)

docker-build: ## Build docker image with the manager.
	$(eval UUID := $(shell uuidgen))
	s2i build . registry.access.redhat.com/ubi8/nodejs-14 --as-dockerfile /tmp/${UUID}/Dockerfile
	cd /tmp/${UUID} && docker build -t ${IMG} .

docker-push: ## Push docker image with the manager.
	docker push ${IMG}

deploy: ## Deploy controller to the K8s cluster specified in ~/.kube/config.
	cd manifests && $(KUSTOMIZE) edit set image meteor-shower=${IMG}
	$(KUSTOMIZE) build manifests | kubectl apply -f -
