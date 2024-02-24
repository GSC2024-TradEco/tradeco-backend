# TradEco Backend

Welcome to the TradEco Backend repository! This project serves as the backend for the TradEco mobile application, providing the necessary APIs and server functionality.

## How to Replicate?

Follow the steps below to replicate the Sleeper Backend on your local machine.

### 1. Clone this Repository

```bash
git clone https://github.com/gsc2024-tradeco/tradeco-backend.git
cd tradeco-backend
```

### 2. Installing dependencies

```bash
npm install
```

### 3. Create your local PostgreSQL database and add your information to .env file based on .env.example

### 4. Generate your own Firebase Service Account Key and add it as serviceAccountKey.json in the root folder

### 5. Migrate the table to the created database

```bash
sequelize db:migrate
```

### 6. Run the server

```bash
npm run dev
```

### Server will run on your designated port / 9000

## Only want to test our API? 

You can use our deployed API below!
```bash
https://tradeco-api-wyk7a4jpva-et.a.run.app/
```

You can see our API documentation below!
