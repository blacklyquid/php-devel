FROM php:apache-buster
RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN a2enmod rewrite
VOLUME /var/www/html
