#!/usr/bin/env node

/**
 * Script để chạy TypeScript trực tiếp cho MCP server
 * Giải quyết vấn đề Claude không thể chạy TypeScript trực tiếp
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Kiểm tra xem tsx có được cài đặt không
function checkTsxInstalled() {
  try {
    require.resolve('tsx');
    return true;
  } catch (error) {
    return false;
  }
}

// Chạy với tsx nếu có, nếu không thì build và chạy
async function runMcpServer() {
  const srcPath = path.join(__dirname, 'src', 'index.ts');
  const distPath = path.join(__dirname, 'dist', 'index.js');
  
  if (checkTsxInstalled()) {
    console.error('🚀 Running TypeScript directly with tsx...');
    
    const child = spawn('npx', ['tsx', srcPath], {
      stdio: 'inherit',
      env: process.env
    });
    
    child.on('error', (error) => {
      console.error('❌ Error running tsx:', error.message);
      process.exit(1);
    });
    
    child.on('exit', (code) => {
      process.exit(code || 0);
    });
  } else {
    console.error('📦 tsx not found, building and running JavaScript...');
    
    // Build first
    const buildChild = spawn('npm', ['run', 'build'], {
      stdio: 'inherit',
      cwd: __dirname
    });
    
    buildChild.on('error', (error) => {
      console.error('❌ Error building:', error.message);
      process.exit(1);
    });
    
    buildChild.on('exit', (buildCode) => {
      if (buildCode !== 0) {
        console.error('❌ Build failed with code:', buildCode);
        process.exit(buildCode);
      }
      
      // Check if dist file exists
      if (!fs.existsSync(distPath)) {
        console.error('❌ Built file not found:', distPath);
        process.exit(1);
      }
      
      console.error('✅ Build successful, running JavaScript...');
      
      // Run the built JavaScript
      const runChild = spawn('node', [distPath], {
        stdio: 'inherit',
        env: process.env
      });
      
      runChild.on('error', (error) => {
        console.error('❌ Error running JavaScript:', error.message);
        process.exit(1);
      });
      
      runChild.on('exit', (runCode) => {
        process.exit(runCode || 0);
      });
    });
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.error('\n🛑 Received SIGINT, shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('\n🛑 Received SIGTERM, shutting down...');
  process.exit(0);
});

// Run the server
runMcpServer().catch((error) => {
  console.error('❌ Unhandled error:', error);
  process.exit(1);
});