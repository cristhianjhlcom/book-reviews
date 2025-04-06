# Book Reviews 📕

[![Deploy Laravel App to Digital Ocean Droplet](https://github.com/cristhianjhlcom/book-reviews/actions/workflows/main.yml/badge.svg)](https://github.com/cristhianjhlcom/book-reviews/actions/workflows/main.yml) [![PHP 8.4](https://img.shields.io/badge/php-8.4-blue.svg)](https://www.php.net/downloads.php) [![Node.js 20.12.0](https://img.shields.io/badge/node.js-20.12.0-blue.svg)](https://nodejs.org/es/download/) [![Composer 2](https://img.shields.io/badge/composer-2-blue.svg)](https://getcomposer.org/) [![Laravel 12](https://img.shields.io/badge/laravel-12-blue.svg)](https://laravel.com/docs/12.x) [![Tailwind CSS 3](https://img.shields.io/badge/tailwind-3-blue.svg)](https://tailwindcss.com/docs/installation) [![Inertia.js](https://img.shields.io/badge/inertia.js-v2-blue.svg)](https://inertiajs.com/) [![Vite](https://img.shields.io/badge/vite-v4-blue.svg)](https://vitejs.dev/) [![Pest](https://img.shields.io/badge/pest-v3-blue.svg)](https://pestphp.com/) [![Pint](https://img.shields.io/badge/pint-v1-blue.svg)](https://github.com/laravel/pint) [![ESLint](https://img.shields.io/badge/eslint-v8-blue.svg)](https://eslint.org/) [![Prettier](https://img.shields.io/badge/prettier-v3-blue.svg)](https://prettier.io/) [![Stylelint](https://img.shields.io/badge/stylelint-v15-blue.svg)](https://stylelint.io/) [![GitHub](https://img.shields.io/badge/github-v5-blue.svg)](https://github.com/) [![Git](https://img.shields.io/badge/git-v2-blue.svg)](https://git-scm.com/)

Proyecto parte del curso de Laravel en mi canal de YouTube. En este proyecto se utiliza la librería [Inertia.js](https://inertiajs.com/) para crear una aplicación web de libros. Ademas, de Laravel 12, React 19 y Tailwind CSS 3.

## Configuración de un Droplet en Digital Ocean

Lo principal es crearnos una cuenta en [Digital Ocean](https://m.do.co/c/12056ed8b114) y configurar el servidor para que funcione con Laravel y Node.js.

<a href="https://www.digitalocean.com/?refcode=12056ed8b114&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge"><img src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg" alt="DigitalOcean Referral Badge" /></a>

1. Creación del Droplet y Usuario Seguro.

    - Crear el Droplet en Digital Ocean
        - Seleccionar Debian como sistema operativo.
        - Elegir un plan adecuado (recomendado 2GB RAM mínimo para Laravel y Node.js).
        - Agregar una clave SSH para acceso seguro.Seleccionar el tamaño de memoria de 2GB.
    - Crear un usuario y dar permisos
        ```bash
        adduser superadmin
        usermod -aG sudo superadmin
        su - superadmin
        ```

2. Instalación de Dependencias del Servidor

    - Actaulizar el servidor
        ```bash
        sudo apt-get update
        sudo apt-get upgrade -y
        ```
    - Instalar Nginx
        ```bash
        sudo apt-get install -y nginx
        sudo systemctl enable --now nginx
        ```
    - Instalar PHP 8.4 y dependencias

        ```bash
        sudo apt update && sudo apt install -y lsb-release ca-certificates apt-transport-https software-properties-common

        sudo wget -O /usr/share/keyrings/sury-php.gpg https://packages.sury.org/php/apt.gpg

        echo "deb [signed-by=/usr/share/keyrings/sury-php.gpg] https://packages.sury.org/php $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/sury-php.list

        sudo apt-get install -y php8.4 php8.4-fpm php8.4-cli php8.4-mbstring php8.4-xml php8.4-bcmath php8.4-curl php8.4-dom php8.4-fileinfo php8.4-filter php8.4-hash php8.4-openssl php8.4-pcre php8.4-pdo php8.4-session php8.4-tokenizer php8.4-intl php8.4-zip unzip

        sudo apt-get upgrade -y
        ```

    - Instalar Composer 2
        ```bash
        sudo mv composer.phar /usr/local/bin/composer
        sudo curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
        ```

3. Instalación de Base de Datos
    - Instalar MySQL
        ```bash
        sudo apt-get install -y mysql-server
        sudo mysql_secure_installation
        sudo mysql -u root -p
        ```
    - MariaDB fork de MySQL (alternativa)
        ```bash
        sudo apt install -y mariadb-server mariadb-client
        ```
    - Crear base de datos para Laravel
        ```SQL
        CREATE DATABASE db_book_reviews;
        CREATE USER 'superadmin'@'localhost' IDENTIFIED BY 'password';
        GRANT ALL PRIVILEGES ON db_book_reviews.* TO 'superadmin'@'localhost';
        FLUSH PRIVILEGES;
        ```
        ```bash
        cp .env.example .env
        php artisan key:generate
        vim .env
        ```
        ```env
        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=db_book_reviews
        DB_USERNAME=superadmin
        DB_PASSWORD=password
        ```
    - SQLite3 (alternativa)
        ```bash
        sudo apt install sqlite3 -y
        mkdir -p /var/www/book-reviews/database
        sqlite3 /var/www/book-reviews/database/database.sqlite
        ```
    - Configurar `.env` de laravel para sqlite3
        ```env
        DB_CONNECTION=sqlite
        DB_DATABASE=/var/www/book-reviews/database/database.sqlite
        ```
4. Instalación de Node.js y NVM
    ```bash
    curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
    # copy in .bashrc
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    source ~/.bashrc
    nvm --version
    nvm install --lts
    // nvm install 22.14.0
    node -v
    npm install -g yarn
    ```
5. Configurar Laravel y el Proyecto

    - Descargar y Configurar Laravel
        ```bash
        cd /var/www/
        sudo apt-get install git
        sudo git clone https://github.com/tu-repositorio/book-reviews.git
        sudo chown -R $USER:$USER /var/www/book-reviews
        sudo chmod -R 775 /var/www/book-reviews
        cd book-reviews
        composer install --no-dev --optimize-autoloader
        yarn install
        yarn build
        cp .env.example .env
        php artisan key:generate
        php artisan migrate --seed
        ```
    - Configurar Permisos, importante al momento de acceder a la IP.
        ```bash
        sudo chown -R superadmin:superadmin /var/www/book-reviews/
        sudo chmod -R 755 /var/www/book-reviews/
        ```
    - Ejecutar Migraciones y Configurar Cache

        ```bash
        # Ejecuta esto si lo necesitas.
        sudo chown -R $USER:$USER /var/www/book-reviews/storage/
        sudo chown -R $USER:$USER /var/www/book-reviews/storage/logs
        sudo chown -R $USER:$USER /var/www/book-reviews/storage/framework
        sudo chown -R $USER:$USER /var/www/book-reviews/bootstrap/
        sudo chown -R $USER:$USER /var/www/book-reviews/bootstrap/cache

        # Ejecuta esto si lo necesitas.
        sudo chmod -R 775 /var/www/book-reviews/storage/
        sudo chmod -R 775 /var/www/book-reviews/storage/logs
        sudo chmod -R 775 /var/www/book-reviews/storage/framework
        sudo chmod -R 775 /var/www/book-reviews/bootstrap/
        sudo chmod -R 775 /var/www/book-reviews/bootstrap/cache

        # Comandos importantes.
        php artisan migrate --force
        php artisan config:cache
        php artisan route:cache
        php artisan view:cache
        ```

6. Configurar Nginx para Laravel

    ```bash
    sudo nano /etc/nginx/sites-available/book-reviews
    ```

    - Configurar el archivo:

        ```toml
        server {
            listen 80;
            server_name 143.244.181.91;
            root /var/www/book-reviews/public;
            index index.php index.html;

            location / {
                try_files $uri $uri/ /index.php?$query_string;
            }

            location ~ \\.php$ {
                include fastcgi_params;
                fastcgi_pass unix:/run/php/php8.3-fpm.sock;
                fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            }

            location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|otf|eot|map|json)$ {
                expires max;
                log_not_found off;
            }

            error_log /var/log/nginx/book_reviews_error.log;
            access_log /var/log/nginx/book_reviews_access.log;
        }
        ```

    - Activar configuración y reiniciar Nginx:
        ```bash
        sudo ln -s /etc/nginx/sites-available/book-reviews /etc/nginx/sites-enabled/
        sudo systemctl restart nginx
        ```

7. Configurar Supervisor para Inertia SSR
    - Ejecutar en `/var/www/book-reviews` `yarn run build:ssr` para que se pueda ejecutar el comando `php artisan inertia:start-ssr`.
    - Crear archivo de configuración para Supervisor:
        ```bash
        sudo nano /etc/supervisor/conf.d/inertia-ssr.conf
        ```
    - Agrega el siguiente contenido:
        ```ini
        [program:inertia-ssr]
        command=node /var/www/book-reviews/bootstrap/ssr/ssr.js
        directory=/var/www/book-reviews
        autostart=true
        autorestart=true
        stderr_logfile=/var/log/inertia-ssr.err.log
        stdout_logfile=/var/log/inertia-ssr.out.log
        user=superadmin
        environment=HOME="/home/superadmin",USER="superadmin",PATH="/home/superadmin/.nvm/versions/node/v22.14.0/bin:/usr/bin:/bin"
        ```
    - Habilitar Supervisor:
        ```bash
        sudo supervisorctl reread
        sudo supervisorctl update
        sudo supervisorctl start inertia-ssr
        ```
8. Configuración Final y Optimización

    ```bash
    php artisan optimize:clear
    php artisan cache:clear
    php artisan config:clear
    php artisan route:clear
    php artisan view:clear

    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    php artisan optimize
    php artisan storage:link
    ```
