const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// -----------------------------
// SAMPLE DATA
// -----------------------------

const accounts = [
  {
    id: "1r0VCg0bITB7BO8KkJTM",
    firstName: "Nasser",
    middleName: "D",
    lastName: "Eliazar",
    suffix: "",
    username: "testuser1",
    phoneNumber: "098882828282828282828",
    address: "Mangga, San Jose",
    age: 21,
    birthday: "2004-12-12",
    email: "shogikoukou@gmail.com",
    pin: "111111",
    otp: "",
    createdAt: 1776345684,
    isVerified: true
  },
  {
    id: "BtI9rP5HPj8mKh9oTgwB",
    firstName: "Lance Ricky",
    middleName: "De Guzman",
    lastName: "Garcia",
    suffix: "",
    username: "testuser",
    phoneNumber: "09276653289",
    address: "Pulo, San Isidro, Nueva Ecija",
    age: 21,
    birthday: "2005-01-27",
    email: "lancegarcia823@gmail.com",
    pin: "123456",
    otp: "",
    createdAt: 1776836356,
    isVerified: true
  }
];

const sicknessCases = [
  {
    caseId: "case001",
    userId: "1r0VCg0bITB7BO8KkJTM",
    fullName: "Nasser D Eliazar",
    sicknessName: "Dengue",
    climateType: "Rainy",
    temperature: 31,
    humidity: 88,
    barangay: "Mangga",
    municipality: "San Jose",
    province: "Nueva Ecija",
    dateReported: "2026-05-02",
    month: 5,
    year: 2026
  },
  {
    caseId: "case002",
    userId: "BtI9rP5HPj8mKh9oTgwB",
    fullName: "Lance Ricky Garcia",
    sicknessName: "Flu",
    climateType: "Rainy",
    temperature: 30,
    humidity: 90,
    barangay: "Pulo",
    municipality: "San Isidro",
    province: "Nueva Ecija",
    dateReported: "2026-05-03",
    month: 5,
    year: 2026
  },
  {
    caseId: "case003",
    userId: "1r0VCg0bITB7BO8KkJTM",
    fullName: "Nasser D Eliazar",
    sicknessName: "Heatstroke",
    climateType: "Sunny",
    temperature: 38,
    humidity: 60,
    barangay: "Mangga",
    municipality: "San Jose",
    province: "Nueva Ecija",
    dateReported: "2026-05-05",
    month: 5,
    year: 2026
  }
];

const climateRef = {
  Rainy: ["Dengue", "Leptospirosis", "Flu", "Common Cold"],
  Sunny: ["Heatstroke", "Dehydration", "Sunburn"],
  Stormy: ["Diarrhea", "Skin Infections", "Tetanus"],
  Cloudy: ["Flu", "Headache", "Sinusitis"]
};

// -----------------------------
// INSERT FUNCTIONS
// -----------------------------

async function seed() {
  console.log("Seeding Firestore...");

  // Accounts
  for (const acc of accounts) {
    await db.collection("accounts").doc(acc.id).set(acc);
  }

  // Sickness Cases
  for (const caseItem of sicknessCases) {
    await db.collection("sickness_cases").doc(caseItem.caseId).set(caseItem);
  }

  // Climate Reference
  await db.collection("climate_sickness_reference").doc("data").set(climateRef);

  // Monthly Stats (sample)
  await db.collection("monthly_statistics").doc("2026_05").set({
    Dengue: 1,
    Flu: 1,
    Heatstroke: 1,
    RainyCases: 2,
    SunnyCases: 1
  });

  console.log("DONE ✅ Firestore seeded successfully!");
  process.exit();
}

seed().catch(console.error);