docker run \
  --name fixbike-backend  \
  -d \
  -e MODE=dev \
  -e PORT=3000 \
  -e JWT_SECRET=fixbike_secret_token \
  -e MYSQL_HOST=localhost \
  -e MYSQL_PORT=3306 \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=cuatroochenta \
  -e MYSQL_DATABASE=fixbike_dev \
  -e MYSQL_ROOT_PASSWORD=cuatroochenta \
  -e MYSQL_USER=cuatroochenta \
  -e MYSQL_PASSWORD=cuatroochenta \
  -p 3000:3000 \
  --restart=unless-stopped \
  fixbike-backend
