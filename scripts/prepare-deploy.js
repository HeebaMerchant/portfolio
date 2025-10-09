const fs = require('fs');
const path = require('path');

// Create a .gitattributes file in the build directory that doesn't use LFS
const buildDir = path.join(__dirname, '..', 'build');
const gitAttributesPath = path.join(buildDir, '.gitattributes');
const nojekyllPath = path.join(buildDir, '.nojekyll');

// Remove LFS tracking for the build directory
const gitAttributesContent = `# Disable LFS for deployed build
* -filter -diff -merge -text
`;

try {
  fs.writeFileSync(gitAttributesPath, gitAttributesContent);
  console.log('✓ Created .gitattributes in build directory to disable LFS');
  
  // Create .nojekyll file to prevent Jekyll processing on GitHub Pages
  fs.writeFileSync(nojekyllPath, '');
  console.log('✓ Created .nojekyll file to disable Jekyll processing');
} catch (error) {
  console.error('Error creating deployment files:', error);
  process.exit(1);
}

