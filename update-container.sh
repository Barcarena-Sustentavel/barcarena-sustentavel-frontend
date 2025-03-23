#!/bin/bash

# Configuration
IMAGE_NAME="barcarena-front"
CONTAINER_NAME="barcarena-sustentavel"
NEW_CONTAINER_NAME="${CONTAINER_NAME}_new"

# Stop and remove the old container (if it exists)
echo "Stopping and removing existing container $CONTAINER_NAME and image $IMAGE_NAME..."
docker stop $CONTAINER_NAME
docker rm $CONTAINER_NAME
docker image rm $IMAGE_NAME

# Run the new container
echo "Starting new container $CONTAINER_NAME..."
docker run -it -d --name $CONTAINER_NAME $IMAGE_NAME

echo "Update complete."
