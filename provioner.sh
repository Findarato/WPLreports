#!/bin/bash
#Fedora
sudo dnf install yum-plugin-fastestmirror nano python ruby npm which make wget -y
#Ubuntu
sudo apt-get update -y && sudo apt-get install nano python ruby npm which make wget -y

sudo npm cache clean -f
sudo npm install -g n
sudo n stable


sudo npm install -g  yo bower grunt-cli gulp gulp-webp  --save-dev
sudo npm install -g generator-polymer

