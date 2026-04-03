// check-exports.cjs
const fs = require('fs');
const path = require('path');

const components = [
  'src/components/GiftRegistryPromo/GiftRegistryPromo.jsx',
  'src/components/CountdownTimer/CountdownTimer.jsx',
  'src/components/Gallery/Gallery.jsx',
  'src/pages/Home/Home.jsx'
];

components.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    console.log(`\n📁 ${file}`);
    
    // Check for export default
    if (content.includes('export default')) {
      console.log('✅ Has export default');
    } else {
      console.log('❌ MISSING export default');
    }
    
    // Check for named exports
    const namedExports = content.match(/export const/g);
    if (namedExports) {
      console.log(`📦 Has named exports: ${namedExports.length}`);
    }
  } else {
    console.log(`\n❌ File not found: ${file}`);
  }
});
