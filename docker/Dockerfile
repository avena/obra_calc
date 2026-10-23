# Dockerfile — Obra Calc Backend (PHP-FPM para Lumen)
#
# Imagem do serviço `app`. Base: php:8.5.5-fpm (Debian trixie-slim).
#
# Extensões exigidas pelo Ticket 01 (todas presentes nesta imagem):
#   pdo_mysql, bcmath, gd, intl, zip  -> instaladas abaixo (precisam de libs de sistema)
#   mbstring, openssl, xml            -> já compiladas na imagem base php:8.5.5-fpm
FROM php:8.5.5-fpm

RUN apt-get update && apt-get install -y --no-install-recommends \
    libfreetype6-dev libjpeg62-turbo-dev libpng-dev libwebp-dev libavif-dev \
    libzip-dev libicu-dev libxml2-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp --with-avif \
    && docker-php-ext-install -j$(nproc) pdo_mysql bcmath gd intl zip \
    && apt-get purge -y --auto-remove \
    && rm -rf /var/lib/apt/lists/*

# Diretivas PHP ajustadas para desenvolvimento local (espelha o espírito do php-dreamhost.ini)
COPY docker/php-lumen.ini /usr/local/etc/php/conf.d/zz-php-lumen.ini

WORKDIR /var/www/html

EXPOSE 9000
# Mantém o CMD default da imagem php:fpm (php-fpm) como PID 1.
CMD ["php-fpm"]
