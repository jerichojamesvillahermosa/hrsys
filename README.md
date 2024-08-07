## Installation
1. Install `laravel`:
```
composer install
```
2. Install `node modules`:
```
npm install
```

## Create app key
```
php artisan key:generate
```

## Migrate
Run the follwing command to create a migration file
```
For first migration:
php artisan migrate:fresh --seed
```

## How to run the application
Run the follwing command for backend
```
php artisan serve
```

Run the follwing command for frontend
```
npm run dev
```