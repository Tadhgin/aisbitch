import dotenv from 'dotenv';

console.log('Current working directory:', process.cwd()); // Log the current working directory
dotenv.config();
console.log('GITHUB_TOKEN:', process.env.GITHUB_TOKEN); // Log the GitHub token