
# From
FROM php:apache-buster

# using pdo
RUN docker-php-ext-install mysqli pdo pdo_mysql

RUN apt-get update

# enable apache mod rewrite
RUN a2enmod rewrite

VOLUME /var/www/html
