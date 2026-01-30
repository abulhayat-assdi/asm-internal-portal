const fs = require('fs');
const csv = require('csv-parser');
const admin = require('firebase-admin');

// 1. Initialize Firebase Admin
// Make sure you have 'serviceAccountKey.json' in the same folder or root
// Download from: Firebase Console > Project Settings > Service Accounts > Generate New Private Key
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const path = require('path');

// 2. CSV File Path
// Resolves to project root (one level up from this script in /scripts)
const CSV_FILE_PATH = path.join(__dirname, '../schedule.csv');

// 3. Collection Name
const COLLECTION_NAME = 'classes';

const results = [];

console.log('🚀 Starting import...');

fs.createReadStream(CSV_FILE_PATH)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
        console.log(`📂 CSV Loaded. Found ${results.length} rows.`);

        let successCount = 0;
        let errorCount = 0;

        for (const row of results) {
            try {
                // Clean keys (trim spaces from CSV headers AND lowercase them)
                const cleanRow = {};
                Object.keys(row).forEach(key => {
                    cleanRow[key.trim().toLowerCase()] = row[key].trim();
                });

                // Validate required fields (now checking lowercase keys)
                if (!cleanRow.date || !cleanRow.batch || !cleanRow.time || !cleanRow.subject) {
                    console.warn(`⚠️ Skipping invalid row: ${JSON.stringify(row)}`);
                    continue;
                }

                // 4. Create Unique ID to prevent duplicates
                // Format: Batch_Date_Time (e.g., "Batch06_2026-01-24_1000AM")
                // Remove spaces/special chars from ID for safety
                const safeBatch = cleanRow.batch.replace(/[^a-zA-Z0-9]/g, '');
                const safeTime = cleanRow.time.replace(/[^a-zA-Z0-9]/g, '');
                // Convert DD/MM/YYYY to YYYY-MM-DD if needed, or keep as is if already YYYY-MM-DD
                // The user screenshot shows 23/01/2026. We need to standardize this for sorting.
                let isoDate = cleanRow.date;
                if (cleanRow.date.includes('/')) {
                    const parts = cleanRow.date.split('/');
                    if (parts.length === 3) {
                        // Assume DD/MM/YYYY -> YYYY-MM-DD
                        isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                    }
                }

                const docId = `${safeBatch}_${isoDate}_${safeTime}`;

                // 5. Construct Document Data
                const classData = {
                    date: isoDate,                // YYYY-MM-DD
                    day: cleanRow.day,            // Saturday
                    batch: cleanRow.batch,        // Batch 06
                    time: cleanRow.time,          // 10:00 AM - 11:30 AM
                    subject: cleanRow.subject,    // Physics
                    teacher: cleanRow.teacher || "Unknown",
                    room: cleanRow.room || "TBD",
                    status: cleanRow.status || "Upcoming", // Use CSV status or default
                    createdAt: admin.firestore.FieldValue.serverTimestamp()
                };
                // 6. Write to Firestore (set with merge: true acts as upsert)
                await db.collection(COLLECTION_NAME).doc(docId).set(classData, { merge: true });

                console.log(`✅ Imported: ${docId}`);
                successCount++;

            } catch (error) {
                console.error(`❌ Error importing row: ${JSON.stringify(row)}`, error);
                errorCount++;
            }
        }

        console.log('-----------------------------------');
        console.log(`🎉 Import Finished!`);
        console.log(`✅ Success: ${successCount}`);
        console.log(`❌ Errors: ${errorCount}`);
        console.log('-----------------------------------');
    });
