import csv from 'csv-parser';
import fs from 'fs';
import crypto from 'crypto';

let uploadedFileHash: string | null | undefined = null;
let csvData: any[] = [];

export function generateFileHash(filePath: string, callback: (err: Error | null, hash?: string) => void) {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);

    stream.on('data', (data) => hash.update(data));
    stream.on('end', () => callback(null, hash.digest('hex')));
    stream.on('error', (err) => callback(err));
};

export function checkForDuplicateFile(filePath: string, callback: (err: Error | null, isDuplicate?: boolean) => void) {
    generateFileHash(filePath, (err, fileHash) => {
        if (err) {
            return callback(err);
        }

        if (uploadedFileHash === fileHash) {
            return callback(null, true);
        }

        uploadedFileHash = fileHash;
        return callback(null, false);
    });
};


export function uploadService(filePath: string) {
    return new Promise<void>((resolve, reject) => {
        const newCsvData: any[] = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                newCsvData.push(row);
            })
            .on('end', () => {
                csvData = newCsvData;
                resolve();
            })
            .on('error', (error) => {
                reject(error);
            });
    })
};

export const getCsvData = () => {
    return csvData;
};
