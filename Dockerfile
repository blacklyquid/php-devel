FROM php:apache-buster
RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN a2enmod rewrite
RUN service apache2 restart
VOLUME /var/www/html
