#!/bin/sh

echo "
defaults
logfile /var/log/msmtp.log
aliases /etc/aliases

account default
host $SMTP_HOST
from $EMAIL_ADDRESS
user $EMAIL_ADDRESS
password $EMAIL_PASSWORD
auth on
tls on
tls_certcheck off
tls_starttls off
" > /etc/msmtprc

echo "
set charset="UTF-8"
set send_charset="us-ascii:iso-8859-1:gb2312:utf-8"
set locale="zh_CN.UTF-8"
charset-hook ^us-ascii$ GB18030
charset-hook !UTF-8 GB18030
set assumed_charset="GB18030"
set rfc2047_parameters=yes
set sendmail="/usr/bin/msmtp"
set use_from=yes
set realname="Yujie Wang"
set from=$EMAIL_ADDRESS
set envelope_from=yes
" > /root/.muttrc

crond -f
