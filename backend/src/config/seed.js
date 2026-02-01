const Vehicle = require('../models/Vehicle');
const Route = require('../models/Route');
const Admin = require('../models/Admin');

const seedData = async () => {
    try {
        // Seed Admin
        const adminCount = await Admin.count();
        if (adminCount === 0) {
            console.log('Seeding admin...');
            await Admin.create({
                username: 'prabhu',
                password: 'prabhu@123'
            });
            console.log('Admin seeded.');
        }

        // Check if routes already exist to avoid duplicates
        const routeCount = await Route.count();
        if (routeCount === 0) {
            console.log('Seeding routes...');
            await Route.bulkCreate([
                { source: 'Chennai', destination: 'Madurai', distanceKm: 462.5, estimatedTime: '8h 30m' },
                { source: 'Chennai', destination: 'Coimbatore', distanceKm: 506.2, estimatedTime: '9h 15m' },
                { source: 'Chennai', destination: 'Trichy', distanceKm: 332.0, estimatedTime: '6h 15m' },
                { source: 'Chennai', destination: 'Salem', distanceKm: 345.5, estimatedTime: '6h 30m' },
                { source: 'Chennai', destination: 'Tirunelveli', distanceKm: 620.8, estimatedTime: '11h 0m' },
                { source: 'Chennai', destination: 'Pondicherry', distanceKm: 155.0, estimatedTime: '3h 30m' },
                { source: 'Chennai', destination: 'Vellore', distanceKm: 139.0, estimatedTime: '3h 0m' },
                { source: 'Chennai', destination: 'Thanjavur', distanceKm: 342.0, estimatedTime: '6h 30m' },
                { source: 'Chennai', destination: 'Kanyakumari', distanceKm: 707.0, estimatedTime: '12h 30m' },
                { source: 'Chennai', destination: 'Erode', distanceKm: 400.0, estimatedTime: '7h 30m' },
                { source: 'Madurai', destination: 'Coimbatore', distanceKm: 213.0, estimatedTime: '4h 30m' },
                { source: 'Madurai', destination: 'Kanyakumari', distanceKm: 245.0, estimatedTime: '4h 30m' },
                { source: 'Madurai', destination: 'Trichy', distanceKm: 135.0, estimatedTime: '2h 30m' },
                { source: 'Coimbatore', destination: 'Salem', distanceKm: 165.0, estimatedTime: '3h 30m' },
                { source: 'Coimbatore', destination: 'Ooty', distanceKm: 86.0, estimatedTime: '3h 0m' },
                { source: 'Salem', destination: 'Erode', distanceKm: 65.0, estimatedTime: '1h 30m' },
                { source: 'Trichy', destination: 'Thanjavur', distanceKm: 58.0, estimatedTime: '1h 30m' },
                { source: 'Tirunelveli', destination: 'Kanyakumari', distanceKm: 85.0, estimatedTime: '1h 30m' },
                { source: 'Trichy', destination: 'Vellore', distanceKm: 250.0, estimatedTime: '5h 0m' },
                { source: 'Salem', destination: 'Vellore', distanceKm: 200.0, estimatedTime: '4h 0m' }
            ]);
            console.log('Routes seeded.');
        }

        // Check if vehicles already exist
        const vehicleCount = await Vehicle.count();
        if (vehicleCount === 0) {
            console.log('Seeding vehicles...');
            await Vehicle.bulkCreate([
                // One Way
                { vehicleName: 'Swift Dzire', serviceType: 'One Way', ratePerKm: 14, baseFare: 300, status: 'Active' },
                { vehicleName: 'Innova Crysta', serviceType: 'One Way', ratePerKm: 21, baseFare: 500, status: 'Active' },
                { vehicleName: 'Etios', serviceType: 'One Way', ratePerKm: 13, baseFare: 300, status: 'Active' },
                // Round Trip
                { vehicleName: 'Swift Dzire', serviceType: 'Round Trip', ratePerKm: 12, baseFare: 250, status: 'Active' },
                { vehicleName: 'Innova Crysta', serviceType: 'Round Trip', ratePerKm: 18, baseFare: 400, status: 'Active' },
                { vehicleName: 'Etios', serviceType: 'Round Trip', ratePerKm: 11, baseFare: 250, status: 'Active' }
            ]);
            console.log('Vehicles seeded.');
        }
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};

module.exports = seedData;
