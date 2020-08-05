FROM library/docker:stable

RUN apk update && apk add msmtp mutt

COPY crontab /crontab

RUN chmod 0644 /crontab

RUN crontab /crontab

COPY backup.sh /backup.sh

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh /backup.sh

ENTRYPOINT /entrypoint.sh
