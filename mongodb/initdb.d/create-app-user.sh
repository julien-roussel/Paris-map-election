#!/bin/bash
# https://www.stuartellis.name/articles/shell-scripting/#enabling-better-error-handling-with-set
set -Eeuo pipefail

# Based on mongo/docker-entrypoint.sh
# https://github.com/docker-library/mongo/blob/master/docker-entrypoint.sh#L303
if [ "$MONGO_USERNAME" ] && [ "$MONGO_PASSWORD" ]; then
    "${mongo[@]}" -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase "$rootAuthDatabase" "$MONGO_DB_NAME" --eval \
        "db.createUser({
            user: $(_js_escape $MONGO_USERNAME),
            pwd: $(_js_escape $MONGO_PASSWORD),
            roles: [ { role: 'readWrite', db: $(_js_escape "$MONGO_DB_NAME") } ]
        })"
fi