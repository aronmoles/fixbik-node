docker run \
  --name fixbik-node  \
  -d \
  -e NODE_ENV=dev \
  -e MODE=dev \
  -e PORT=3000 \
  -e JWT_SECRET=fixbike_secret_token \
  -e MYSQL_HOST=host.docker.internal \
  -e MYSQL_PORT=3306 \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=cuatroochenta \
  -e MYSQL_DATABASE=fixbike_dev \
  -e RABBITMQ_HOST=host.docker.internal \
  -e RABBITMQ_USER=guest \
  -e RABBITMQ_PASSWORD=guest \
  -e RABBITMQ_EXCHANGE=ExchangeName \
  -e RABBITMQ_QUEUE=QueueName \
  -p 3000:3000 \
  --restart=unless-stopped \
  fixbik-node
