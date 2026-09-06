const fs = require('fs');

// Read the raw input text
const rawText = fs.readFileSync('./input/raw-text.txt', 'utf8');

// --- Regex patterns ---
const phoneRegex = /\(?(\+250|0)\)?[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{3}/g;
const cardRegex = /\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}/g;
const emailRegex = /[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}/g;
const hashtagRegex = /#\w+/g;

// --- Run extraction ---
const phones = rawText.match(phoneRegex) || [];
const cards = rawText.match(cardRegex) || [];
const emails = rawText.match(emailRegex) || [];
const hashtags = rawText.match(hashtagRegex) || [];

console.log("Phones found:", phones);
console.log("Cards found:", cards);
console.log("Emails found:", emails);
console.log("Hashtags found:", hashtags);