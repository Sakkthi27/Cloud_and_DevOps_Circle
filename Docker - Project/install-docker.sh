#!/bin/bash

# Script to install Docker on Ubuntu EC2
# Works for Ubuntu 20.04 / 22.04 / 24.04

set -e

echo "----- Updating system -----"
sudo apt update -y
sudo apt upgrade -y

echo "----- Removing old Docker versions -----"
sudo apt remove -y docker docker-engine docker.io containerd runc || true

echo "----- Installing dependencies -----"
sudo apt install -y ca-certificates curl gnupg lsb-release

echo "----- Adding Docker GPG key -----"
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
    | sudo gpg --yes --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo "----- Adding Docker repository -----"
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

echo "----- Updating apt index -----"
sudo apt update -y

echo "----- Installing Docker Engine -----"
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "----- Starting Docker -----"
sudo systemctl start docker
sudo systemctl enable docker

echo "----- Adding current user to docker group -----"
sudo usermod -aG docker $USER

echo "----- Docker installation complete -----"
echo "✔ Docker Version:"
docker --version

echo "⚠ Please log out and log back in to use Docker without sudo!"
