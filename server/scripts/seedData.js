import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from '../src/config/env.js';
import User from '../src/models/User.js';
import EmergencyRequest from '../src/models/EmergencyRequest.js';
import Donation from '../src/models/Donation.js';
import Camp from '../src/models/Camp.js';

const indianNames = [
  'Aarav Sharma', 'Vivaan Patel', 'Aditya Kumar', 'Vihaan Reddy', 'Arjun Singh',
  'Sai Verma', 'Reyansh Gupta', 'Ayaan Khan', 'Krishna Iyer', 'Ishaan Joshi',
  'Ananya Sharma', 'Diya Patel', 'Aadhya Kumar', 'Saanvi Reddy', 'Pari Singh',
  'Anika Verma', 'Navya Gupta', 'Myra Khan', 'Sara Iyer', 'Kiara Joshi',
  'Rohan Mehta', 'Karan Malhotra', 'Rahul Chopra', 'Amit Bansal', 'Vikram Sethi',
  'Priya Nair', 'Sneha Kapoor', 'Riya Deshmukh', 'Neha Agarwal', 'Pooja Bhatt',
  'Manish Tiwari', 'Suresh Rao', 'Ramesh Pillai', 'Mahesh Desai', 'Naresh Yadav',
  'Kavita Mishra', 'Sunita Pandey', 'Anita Saxena', 'Rekha Dubey', 'Geeta Sinha',
];

const cities = [
  { city: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777 },
  { city: 'Delhi', state: 'Delhi', lat: 28.6139, lng: 77.2090 },
  { city: 'Bangalore', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
  { city: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 },
  { city: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639 },
  { city: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867 },
  { city: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
  { city: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714 },
  { city: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
  { city: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462 },
];

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const bloodTypeWeights = [25, 2, 30, 2, 5, 1, 30, 5];

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomBloodType = () => {
  const total = bloodTypeWeights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < bloodTypeWeights.length; i++) {
    r -= bloodTypeWeights[i];
    if (r <= 0) return bloodTypes[i];
  }
  return bloodTypes[0];
};

const randomDate = (daysAgo) => {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysAgo));
  return d;
};

const seedData = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log('Connected to MongoDB');

    // Clear existing demo data (optional - comment out to keep existing)
    // await User.deleteMany({ email: /@demo\.com$/ });
    // await EmergencyRequest.deleteMany({});
    // await Donation.deleteMany({});
    // await Camp.deleteMany({});

    const hashedPassword = await bcrypt.hash('demo123', 10);

    // Create 200 donors
    console.log('Creating donors...');
    const donors = [];
    for (let i = 0; i < 200; i++) {
      const location = randomFrom(cities);
      const name = randomFrom(indianNames);
      const phone = `9${Math.floor(100000000 + Math.random() * 900000000)}`;

      const donor = {
        name,
        email: `donor${i + 1}@demo.com`,
        phone,
        password: hashedPassword,
        role: 'donor',
        bloodType: randomBloodType(),
        state: location.state,
        city: location.city,
        isVerified: true,
        isActive: true,
        lastDonationDate: randomDate(365),
        location: {
          type: 'Point',
          coordinates: [
            location.lng + (Math.random() - 0.5) * 0.5,
            location.lat + (Math.random() - 0.5) * 0.5,
          ],
        },
        createdAt: randomDate(365),
      };
      donors.push(donor);
    }
    const createdDonors = await User.insertMany(donors);
    console.log(`Created ${createdDonors.length} donors`);

    // Create 20 hospitals
    console.log('Creating hospitals...');
    const hospitals = [];
    const hospitalNames = [
      'Apollo Hospital', 'Fortis Healthcare', 'Max Super Speciality', 'AIIMS',
      'Manipal Hospital', 'Kokilaben Hospital', 'Lilavati Hospital', 'Ruby Hall Clinic',
      'Christian Medical College', 'Narayana Health', 'Medanta Hospital',
      'Artemis Hospital', 'Jaslok Hospital', 'Hinduja Hospital',
      'Breach Candy Hospital', 'Wockhardt Hospital', 'Columbia Asia',
      'Global Hospitals', 'Aster CMI', 'Continental Hospital',
    ];

    for (let i = 0; i < 20; i++) {
      const location = randomFrom(cities);
      const phone = `8${Math.floor(100000000 + Math.random() * 900000000)}`;

      hospitals.push({
        name: hospitalNames[i],
        hospitalName: hospitalNames[i],
        email: `hospital${i + 1}@demo.com`,
        phone,
        password: hashedPassword,
        role: 'hospital',
        hospitalType: randomFrom(['Government', 'Private', 'Blood Bank', 'NGO']),
        licenseNumber: `LIC${100000 + i}`,
        address: `${Math.floor(Math.random() * 200) + 1}, ${location.city} Main Road`,
        state: location.state,
        city: location.city,
        pincode: `${400000 + Math.floor(Math.random() * 99999)}`,
        isVerified: true,
        isActive: true,
        location: {
          type: 'Point',
          coordinates: [location.lng, location.lat],
        },
        createdAt: randomDate(365),
      });
    }
    const createdHospitals = await User.insertMany(hospitals);
    console.log(`Created ${createdHospitals.length} hospitals`);

    // Create 150 requests spread over 6 months
    console.log('Creating requests...');
    const requests = [];
    const statuses = ['Fulfilled', 'Fulfilled', 'Fulfilled', 'In Progress', 'Open', 'Closed'];
    const urgencies = ['Critical', 'High', 'Medium', 'Medium', 'Medium'];

    for (let i = 0; i < 150; i++) {
      const hospital = randomFrom(createdHospitals);
      const daysAgo = Math.floor(Math.random() * 180);
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - daysAgo);

      requests.push({
        hospital: hospital._id,
        hospitalName: hospital.hospitalName,
        patientName: randomFrom(indianNames),
        bloodType: randomBloodType(),
        unitsNeeded: Math.floor(Math.random() * 3) + 1,
        urgency: randomFrom(urgencies),
        hospitalAddress: hospital.address,
        state: hospital.state,
        city: hospital.city,
        location: hospital.location,
        contactPhone: hospital.phone,
        status: randomFrom(statuses),
        acceptedDonors: [],
        createdAt,
      });
    }
    const createdRequests = await EmergencyRequest.insertMany(requests);
    console.log(`Created ${createdRequests.length} requests`);

    // Create 300 donations
    console.log('Creating donations...');
    const donations = [];
    for (let i = 0; i < 300; i++) {
      const donor = randomFrom(createdDonors);
      const hospital = randomFrom(createdHospitals);
      const daysAgo = Math.floor(Math.random() * 180);
      const donationDate = new Date();
      donationDate.setDate(donationDate.getDate() - daysAgo);

      donations.push({
        donor: donor._id,
        hospital: hospital._id,
        donorName: donor.name,
        hospitalName: hospital.hospitalName,
        bloodType: donor.bloodType,
        units: 1,
        status: 'Completed',
        donationDate,
        createdAt: donationDate,
      });
    }
    await Donation.insertMany(donations);
    console.log(`Created ${donations.length} donations`);

    // Create 10 camps
    console.log('Creating camps...');
    const camps = [];
    for (let i = 0; i < 10; i++) {
      const location = randomFrom(cities);
      const daysFromNow = Math.floor(Math.random() * 60) - 10;
      const campDate = new Date();
      campDate.setDate(campDate.getDate() + daysFromNow);

      camps.push({
        name: `${location.city} Blood Donation Camp ${i + 1}`,
        organizer: randomFrom(['Red Cross', 'Rotary Club', 'NSS', 'Lions Club', 'Helpage India']),
        address: `${location.city} Community Hall`,
        state: location.state,
        city: location.city,
        pincode: `${400000 + Math.floor(Math.random() * 99999)}`,
        date: campDate,
        startTime: '09:00',
        endTime: '17:00',
        contactPhone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
        description: 'Join us for a blood donation drive. Every drop counts!',
        status: daysFromNow < 0 ? 'Completed' : 'Upcoming',
      });
    }
    await Camp.insertMany(camps);
    console.log(`Created ${camps.length} camps`);

    console.log('\nDemo data seeded successfully!');
    console.log('\nDemo Accounts:');
    console.log('Donor: donor1@demo.com / demo123');
    console.log('Hospital: hospital1@demo.com / demo123');
    console.log('Admin: admin@lifelink.com / admin123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();