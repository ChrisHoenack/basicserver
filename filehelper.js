import fs from 'fs';

export function doesFileExist(filePath) {
    let existence = false;
    try {
        fs.statSync(filePath);
        existence = true;
    } catch (error) {
        console.log(error);
    }
    return existence;
};
