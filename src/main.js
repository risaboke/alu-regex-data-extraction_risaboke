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
// --- Mask sensitive card numbers for safe display ---
const maskedCards = cards.map(card => {
  const digitsOnly = card.replace(/[\s-]/g, ""); // strip spaces/dashes
  const last4 = digitsOnly.slice(-4);
  return "**** **** **** " + last4;
});

console.log("Cards found (masked):", maskedCards);
console.log("Emails found:", emails);
console.log("Hashtags found:", hashtags);
const officialEmail = /@alueducation\.com$/;
const alumniEmail = /@alumni\.alueducation\.com$/;
const siEmail = /@si\.alueducation\.com$/;

const categorisedEmails = emails.map(email => {
  if (alumniEmail.test(email)) return { email, category: "alumni" };
  if (siEmail.test(email)) return { email, category: "si" };
  if (officialEmail.test(email)) return { email, category: "official" };
  return { email, category: "other" };
});

console.log("Categorised emails:", categorisedEmails);
// --- Security check: detect suspicious/malicious patterns ---
const suspiciousPattern = /<script.*?>.*?<\/script>|javascript:|on\w+\s*=/gi;

const suspiciousMatches = rawText.match(suspiciousPattern) || [];

if (suspiciousMatches.length > 0) {
  console.log("SECURITY WARNING: Potentially malicious content detected:", suspiciousMatches);
} else {
  console.log("No suspicious content detected.");
}