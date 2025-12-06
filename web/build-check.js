// Script para verificar que el build está listo
const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando preparación para build...\n');

const checks = [
  {
    name: 'netlify.toml',
    path: path.join(__dirname, 'netlify.toml'),
    required: true
  },
  {
    name: 'public/_redirects',
    path: path.join(__dirname, 'public', '_redirects'),
    required: true
  },
  {
    name: 'package.json',
    path: path.join(__dirname, 'package.json'),
    required: true
  },
  {
    name: 'vite.config.js',
    path: path.join(__dirname, 'vite.config.js'),
    required: true
  }
];

let allPassed = true;

checks.forEach(check => {
  if (fs.existsSync(check.path)) {
    console.log(`✅ ${check.name} - OK`);
  } else {
    console.log(`❌ ${check.name} - FALTANTE`);
    if (check.required) {
      allPassed = false;
    }
  }
});

console.log('\n📦 Verificando dependencias...');
if (fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log('✅ node_modules - OK');
} else {
  console.log('⚠️  node_modules - Ejecuta "npm install" primero');
}

if (allPassed) {
  console.log('\n✅ ¡Todo listo para build!');
  console.log('Ejecuta: npm run build');
  process.exit(0);
} else {
  console.log('\n❌ Faltan archivos requeridos');
  process.exit(1);
}

