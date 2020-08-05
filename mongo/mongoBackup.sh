#!/bin/bash
echo -e "\nStart Backup"
cd /backup && mongodump -h 127.0.0.1 --port 27017 -u=$MONGO_USERNAME -p=$MONGO_PASSWORD -d admin --archive="admin@$(date '+%Y_%m_%d_%H_%M_%S')"
echo -e "\nNew backup at $(date '+%Y_%m_%d_%H_%M_%S')"

