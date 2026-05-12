# Changelog

## branch refacto/dockerize-and-fix - 2026-05-07
### Add
 - Dockerisation of project, to allow easily run it
 - Create following containers in docker-compose :
   - proxy-server : API server
   - client : ReactJS / vite application
   - mongodb : The mongodb database

### Change
 - .gitignore to :
   - remove package-lock.json, to memorize same version of packages until we manually change versions
   - add mongodb/data to not push mongodb databases
 - Improve mongodb connection to use authentication
 - Rename env variables to be more explicit, and add needed env variables for mongodb connection

### Fix
 - Upgrade axios package to improve security

### Tested successfuly
 - All container correctly launching with docker compose
 - Connection between proxy-server and mongodb
 - Connection between client and proxy-server