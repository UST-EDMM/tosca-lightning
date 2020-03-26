#!/bin/bash
apt -y update
apt -y install wget
wget -c https://dev.mysql.com/get/mysql-apt-config_0.8.11-1_all.deb
DEBIAN_FRONTEND=noninteractive dpkg -i mysql-apt-config_0.8.14-1_all.deb
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password ${DBMS_ROOT_PASSWORD}'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password ${DBMS_ROOT_PASSWORD}'
apt -y install mysql-server
exit 0
