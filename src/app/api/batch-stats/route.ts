import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import serviceAccount from '@/../serviceAccountKey.json';

// Config
const SHEET_ID = '10BxvXsxAjrA2nJ3ypns_LoP3y84VkZPLIfXrTr183eQ';

// Predefined Subject Order (from user docs)
const SUBJECT_ORDER = [
    "Sales",
    "Service",
    "Branding",
    "Career Planning",
    "MS Office",
    "AI + Canva",
    "Digital Marketing",
    "Landing Page / Content",
    "English",
    "Dawah",
    "Quran"
];

// Helper to normalize subject names for comparison
const normalize = (str: string) => str.toLowerCase().trim();

// --- Simple in-memory cache ---
let cachedData: Record<string, { subjectName: string; classCount: number }[]> | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes (in milliseconds)

export async function GET(req: NextRequest) {
    try {
        // 1. Check Cache Validity
        const now = Date.now();
        if (cachedData && (now - lastFetchTime < CACHE_TTL)) {
            return NextResponse.json({
                success: true,
                data: cachedData,
                source: 'cache'
            });
        }

        // 2. Authenticate
        const serviceAccountAuth = new JWT({
            email: serviceAccount.client_email,
            key: serviceAccount.private_key,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        // 3. Load the Doc
        const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();

        const result: Record<string, { subjectName: string; classCount: number }[]> = {};

        // 4. Find Sheets named "Batch_*"
        const batchSheets = doc.sheetsByIndex.filter(sheet =>
            sheet.title.startsWith('Batch_')
        );

        if (batchSheets.length === 0) {
            return NextResponse.json({
                message: "No batch sheets found. Please ensure tabs are named like 'Batch_06', 'Batch_07', etc.",
                data: {}
            });
        }

        // 5. Process Each Batch Sheet
        for (const sheet of batchSheets) {
            const batchName = sheet.title;
            const subjectCount: Record<string, number> = {};

            await sheet.loadCells();

            try {
                await sheet.loadHeaderRow(3); // Row 3
                const rows = await sheet.getRows();

                // Iterate Rows (Data Row 4+)
                for (const row of rows) {
                    const subjectsInThisDay: Record<string, boolean> = {};
                    const rowData = row._rawData;

                    // Loop from Column C (Index 2).
                    for (let j = 2; j < rowData.length; j++) {
                        const rawVal = rowData[j];
                        if (!rawVal) continue;

                        const subjectName = String(rawVal).trim();
                        if (!subjectName || subjectName === '-') continue;

                        const lowerSub = normalize(subjectName);

                        // Special Handling for MS Office
                        if (lowerSub.includes("ms office") || lowerSub.includes("ms-office")) {
                            // Count EVERY occurrence
                            const key = "MS Office";
                            subjectCount[key] = (subjectCount[key] || 0) + 1;
                        } else {
                            // Standard Subject: Count Once Per Row
                            if (!subjectsInThisDay[subjectName]) {
                                subjectsInThisDay[subjectName] = true;
                                subjectCount[subjectName] = (subjectCount[subjectName] || 0) + 1;
                            }
                        }
                    }
                }
            } catch (err) {
                console.error(`Error processing sheet ${batchName}:`, err);
                continue;
            }

            // 6. Filter and Sort
            const statsArray: { subjectName: string; classCount: number }[] = [];

            for (const subjectKey of Object.keys(subjectCount)) {
                if (SUBJECT_ORDER.includes(subjectKey)) {
                    statsArray.push({
                        subjectName: subjectKey,
                        classCount: subjectCount[subjectKey]
                    });
                }
            }

            // Sort
            statsArray.sort((a, b) => {
                return SUBJECT_ORDER.indexOf(a.subjectName) - SUBJECT_ORDER.indexOf(b.subjectName);
            });

            result[batchName] = statsArray;
        }

        // 7. Update Cache
        cachedData = result;
        lastFetchTime = Date.now();

        return NextResponse.json({
            success: true,
            data: result,
            source: 'network'
        });

    } catch (error: any) {
        console.error('Batch Stats Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
