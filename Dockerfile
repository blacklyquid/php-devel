
# From
FROM php:apache-buster
# using pdo
RUN docker-php-ext-install mysqli pdo pdo_mysql

RUN apt-get update && \
    apt-get install -y curl

# enable apache mod rewrite
RUN a2enmod rewrite

HEALTHCHECK CMD curl --fail http://localhost:80/ || exit 1
VOLUME /var/www/html
