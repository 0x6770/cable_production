#!/bin/sh
#echo -e "subject: test mail\r\n\r\nthis is a test mail" | msmtp --debug -t Yujie Wang@foxmail.com
rm /message.txt
echo -e "\nContainer Status" >> /message.txt
docker ps >> /message.txt
echo -e "\nExisting backups" >> /message.txt
docker exec mongo ls /backup >> /message.txt
docker exec mongo /bin/bash /mongoBackup.sh >> /message.txt
echo -e "\nCopying backups to host" >> /message.txt
docker cp mongo:/backup / >> /message.txt
echo -e "\nBackups on host" >> /message.txt
ls /backup >> /message.txt

echo "This message is sent by $MACHINE_NAME when a backup is done. The attachment is the latest mongodb archive file. " | /usr/bin/mutt -F /root/.muttrc -s "A new backup on mongodb $(ls -t /backup | head -1)" -a /backup/$(ls -t /backup | head -1) -- shangfu@charleswang.name
#echo -e "This message is sent by server when a backup is done. Attachment is a mongodb archive file. Following is log content:\n$(cat /message.txt)" | mutt -a "/backup/$(cd backup && ls -t | head -1)" -s "A new backup on mongodb $(cd backup && ls -t | head -1)" -- shangfu@charleswang.name
