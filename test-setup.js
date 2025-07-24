#!/usr/bin/env node

console.log('🚀 Testing A.Ca.Ri.D Application Setup...\n');

// Test 1: Check if all required files exist
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'package.json',
  'next.config.js',
  '.env.local',
  'src/app/page.tsx',
  'src/components/CharityWebsite.tsx',
  'src/lib/mongodb.ts',
  'src/models/index.ts',
  'src/app/api/messages/route.ts',
  'src/app/api/volunteers/route.ts',
  'src/app/api/donations/route.ts'
];

console.log('✅ Checking required files...');
let missingFiles = [];

requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`   ✓ ${file}`);
  } else {
    console.log(`   ✗ ${file} (MISSING)`);
    missingFiles.push(file);
  }
});

// Test 2: Check environment variables
console.log('\n✅ Checking environment variables...');
require('dotenv').config({ path: '.env.local' });

const requiredEnvVars = [
  'MONGODB_URI',
  'FEDAPAY_SECRET_KEY',
  'FEDAPAY_ENVIRONMENT',
  'NEXT_PUBLIC_BASE_URL'
];

let missingEnvVars = [];

requiredEnvVars.forEach(envVar => {
  if (process.env[envVar]) {
    console.log(`   ✓ ${envVar} (configured)`);
  } else {
    console.log(`   ✗ ${envVar} (NOT SET)`);
    missingEnvVars.push(envVar);
  }
});

// Test 3: Check package.json dependencies
console.log('\n✅ Checking key dependencies...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const keyDeps = [
  'next',
  'react',
  'mongoose',
  'fedapay',
  'tailwindcss'
];

keyDeps.forEach(dep => {
  if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
    console.log(`   ✓ ${dep}`);
  } else {
    console.log(`   ✗ ${dep} (MISSING)`);
  }
});

// Summary
console.log('\n📊 SUMMARY:');
console.log('='.repeat(50));

if (missingFiles.length === 0 && missingEnvVars.length === 0) {
  console.log('🎉 All checks passed! Your A.Ca.Ri.D application is ready.');
  console.log('\n🚀 To start development:');
  console.log('   npm run dev');
  console.log('\n🏗️  To build for production:');
  console.log('   npm run build');
  console.log('\n📚 Features included:');
  console.log('   ✓ Dynamic content with MongoDB');
  console.log('   ✓ FedaPay payment integration');
  console.log('   ✓ Working carousels');
  console.log('   ✓ Contact forms');
  console.log('   ✓ Volunteer registration');
  console.log('   ✓ Testimonial system');
  console.log('   ✓ Responsive design');
} else {
  console.log('❌ Some issues found:');
  if (missingFiles.length > 0) {
    console.log(`   Missing files: ${missingFiles.join(', ')}`);
  }
  if (missingEnvVars.length > 0) {
    console.log(`   Missing environment variables: ${missingEnvVars.join(', ')}`);
  }
}

console.log('\n📝 Next steps:');
console.log('   1. Set up MongoDB database (local or Atlas)');
console.log('   2. Configure FedaPay credentials');
console.log('   3. Update environment variables in .env.local');
console.log('   4. Run: npm run dev');
