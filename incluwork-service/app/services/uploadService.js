import fs from "fs";
import { promisify } from "util";
import { v4 as uuidv4 } from "uuid";
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline as pipelineCallback } from "stream";
const pipeline = promisify(pipelineCallback);


//Function to ensure directory exists or create it if it doesn't
const ensureDirExists = (path) => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  };

// Getting the __dirname equivalent in ES module
const __dirname = dirname(fileURLToPath(import.meta.url));

//Service code for saving the file
export const saveFile = async (file, folder,fileExtension) => {

  const dirPath = `${__dirname}/../public/${folder}`;
  ensureDirExists(dirPath);  // Ensure the directory exists
  
 
  const filename = `${uuidv4()}${fileExtension}`;
  const filePath = `${__dirname}/../public/${folder}/${filename}`;


  console.log(file);


try {
    // Using writeFile to save the buffer to a file
    await fs.promises.writeFile(filePath, file.buffer);
    return `/host/${folder}/${filename}`;
  } catch (error) {
    console.error("Error in saveFile service:", error);
    throw new Error('Failed to save file');
  }

};

// Save resume
 export const saveResume = async (file) => {
    
    const fileExtension = path.extname(file.originalname).toLowerCase();

  return saveFile(file, "resume", fileExtension);
};

// Save medical proof
export const saveProof = async (file) => {
    
    const fileExtension = path.extname(file.originalname).toLowerCase();

  return saveFile(file, "medicalproof", fileExtension);
};