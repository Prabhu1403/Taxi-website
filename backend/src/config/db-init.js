const { Client } = require('pg');
require('dotenv').config();

const ensureDatabaseExists = async () => {
    let dbName = process.env.DB_NAME || 'taxi_db';
    let dbUser = process.env.DB_USER;
    let dbPassword = process.env.DB_PASSWORD;
    let dbHost = process.env.DB_HOST;
    let dbPort = process.env.DB_PORT;

    if (process.env.DB_URL) {
        try {
            const url = new URL(process.env.DB_URL);
            dbUser = url.username || dbUser;
            dbPassword = url.password || dbPassword;
            dbHost = url.hostname || dbHost;
            dbPort = url.port || dbPort;
            dbName = url.pathname.slice(1) || dbName;
        } catch (e) {
            console.error('Error parsing DB_URL:', e.message);
        }
    }

    const config = {
        user: dbUser,
        password: dbPassword,
        host: dbHost,
        port: dbPort,
        database: 'postgres',
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    };

    const client = new Client(config);

    try {
        await client.connect();

        // Check if database exists
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);

        if (res.rowCount === 0) {
            console.log(`Database "${dbName}" does not exist. Creating...`);
            await client.query(`CREATE DATABASE "${dbName}"`);
            console.log(`Database "${dbName}" created successfully.`);
        } else {
            console.log(`Database "${dbName}" already exists.`);
        }
    } catch (error) {
        console.error('Error ensuring database exists:', error);
        throw error;
    } finally {
        await client.end();
    }

    // Now connect to the actual database to ensure tables exist
    const dbClient = new Client({
        ...config,
        database: dbName,
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    });

    try {
        await dbClient.connect();

        // Create Vehicles table if not exists
        await dbClient.query(`
            DO $$ BEGIN
                CREATE TYPE "enum_Vehicles_serviceType" AS ENUM('One Way', 'Round Trip');
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
            DO $$ BEGIN
                CREATE TYPE "enum_Vehicles_status" AS ENUM('Active', 'Inactive');
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
            CREATE TABLE IF NOT EXISTS "Vehicles" (
                id UUID PRIMARY KEY,
                "vehicleName" VARCHAR(255) NOT NULL,
                "serviceType" "enum_Vehicles_serviceType" NOT NULL,
                "ratePerKm" DECIMAL(10, 2) NOT NULL,
                "baseFare" DECIMAL(10, 2) NOT NULL,
                status "enum_Vehicles_status" DEFAULT 'Active',
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
            )
        `);

        // Create Routes table if not exists
        await dbClient.query(`
            CREATE TABLE IF NOT EXISTS "Routes" (
                id UUID PRIMARY KEY,
                source VARCHAR(255) NOT NULL,
                destination VARCHAR(255) NOT NULL,
                "distanceKm" DECIMAL(10, 2) NOT NULL,
                "estimatedTime" VARCHAR(255) NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
            )
        `);

        // Create Admins table if not exists
        await dbClient.query(`
            CREATE TABLE IF NOT EXISTS "Admins" (
                id UUID PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
            )
        `);

        // Create Bookings table if not exists
        await dbClient.query(`
            DO $$ BEGIN
                CREATE TYPE "enum_Bookings_status" AS ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed');
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
            CREATE TABLE IF NOT EXISTS "Bookings" (
                id UUID PRIMARY KEY,
                "customerId" UUID,
                "customerName" VARCHAR(255) NOT NULL,
                "customerPhone" VARCHAR(255) NOT NULL,
                "vehicleId" UUID NOT NULL REFERENCES "Vehicles"(id) ON DELETE CASCADE ON UPDATE CASCADE,
                "pickupLocation" VARCHAR(255) NOT NULL,
                "dropoffLocation" VARCHAR(255) NOT NULL,
                "serviceType" VARCHAR(255) NOT NULL,
                "pickupTime" TIMESTAMP WITH TIME ZONE NOT NULL,
                status "enum_Bookings_status" DEFAULT 'Pending',
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
            )
        `);

        console.log('Core tables (Routes, Vehicles, Admins, Bookings) ensured.');
    } catch (error) {
        console.error('Error ensuring tables exist:', error.message);
    } finally {
        await dbClient.end();
    }
};

module.exports = ensureDatabaseExists;
