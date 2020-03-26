#!/bin/bash
if [[ -d "/docker-entrypoint-initdb.d" ]]; then
    find . -type f -name '*.sql' -exec cp {} /docker-entrypoint-initdb.d \;
else
    file_name=$(find . -type f -name '*.sql')
    cat $file_name | mysql -u root --password=${DBMS_ROOT_PASSWORD}
fi
exit 0
