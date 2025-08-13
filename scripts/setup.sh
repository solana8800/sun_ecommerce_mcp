#!/bin/bash

# Sun eCommerce Platform MCP Server Setup Script
# This script helps you set up and configure the MCP server

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}$1${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check Node.js version
check_node_version() {
    if command_exists node; then
        NODE_VERSION=$(node --version | cut -d'v' -f2)
        REQUIRED_VERSION="18.0.0"
        
        if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_VERSION" ]; then
            print_status "Node.js version $NODE_VERSION is compatible"
            return 0
        else
            print_error "Node.js version $NODE_VERSION is too old. Required: $REQUIRED_VERSION or higher"
            return 1
        fi
    else
        print_error "Node.js is not installed"
        return 1
    fi
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    if [ -f "package-lock.json" ]; then
        npm ci
    else
        npm install
    fi
    
    print_status "Dependencies installed successfully"
}

# Function to build the project
build_project() {
    print_status "Building the project..."
    npm run build
    print_status "Project built successfully"
}

# Function to create environment file
create_env_file() {
    print_header "=== Environment Configuration ==="
    
    if [ -f ".env" ]; then
        print_warning ".env file already exists. Backing up to .env.backup"
        cp .env .env.backup
    fi
    
    echo "# Sun eCommerce Platform MCP Server Configuration" > .env
    echo "# Generated on $(date)" >> .env
    echo "" >> .env
    
    # Get base URL
    read -p "Enter your Sun eCommerce Platform base URL (e.g., http://42.96.60.253:8080): " BASE_URL
    if [ -z "$BASE_URL" ]; then
        BASE_URL="http://42.96.60.253:8080"
        print_warning "Using default base URL: $BASE_URL"
    fi
    echo "SUN_ECOMMERCE_API_URL=$BASE_URL" >> .env
    
    # Get API token
    read -s -p "Enter your API authentication token: " API_TOKEN
    echo ""
    if [ -z "$API_TOKEN" ]; then
        print_error "API token is required"
        exit 1
    fi
    echo "SUN_ECOMMERCE_API_TOKEN=$API_TOKEN" >> .env
    
    # Optional configurations
    echo "" >> .env
    echo "# Optional Configuration" >> .env
    echo "SUN_ECOMMERCE_API_VERSION=v1" >> .env
    echo "SUN_ECOMMERCE_TIMEOUT=30000" >> .env
    echo "SUN_ECOMMERCE_RETRIES=3" >> .env
    echo "SUN_ECOMMERCE_ENABLE_LOGGING=true" >> .env
    
    print_status "Environment file created: .env"
}

# Function to test the configuration
test_configuration() {
    print_header "=== Testing Configuration ==="
    
    if [ ! -f ".env" ]; then
        print_error ".env file not found. Run the setup first."
        return 1
    fi
    
    # Source the environment file
    set -a
    source .env
    set +a
    
    print_status "Testing connection to $SUN_ECOMMERCE_API_URL..."
    
    # Test health check
    if command_exists curl; then
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
            -H "Authorization: Bearer $SUN_ECOMMERCE_API_TOKEN" \
            "$SUN_ECOMMERCE_API_URL/api/v1/health" || echo "000")
        
        if [ "$HTTP_CODE" = "200" ]; then
            print_status "✅ Connection successful!"
        elif [ "$HTTP_CODE" = "401" ]; then
            print_error "❌ Authentication failed. Check your API token."
            return 1
        elif [ "$HTTP_CODE" = "000" ]; then
            print_error "❌ Connection failed. Check your base URL and network."
            return 1
        else
            print_warning "⚠️  Unexpected response code: $HTTP_CODE"
        fi
    else
        print_warning "curl not found. Skipping connection test."
    fi
}

# Function to create Claude Desktop configuration
setup_claude_desktop() {
    print_header "=== Claude Desktop Setup ==="
    
    # Detect OS and set config path
    case "$(uname -s)" in
        Darwin*)
            CONFIG_DIR="$HOME/Library/Application Support/Claude"
            ;;
        Linux*)
            CONFIG_DIR="$HOME/.config/Claude"
            ;;
        CYGWIN*|MINGW32*|MSYS*|MINGW*)
            CONFIG_DIR="$APPDATA/Claude"
            ;;
        *)
            print_error "Unsupported operating system"
            return 1
            ;;
    esac
    
    CONFIG_FILE="$CONFIG_DIR/claude_desktop_config.json"
    
    # Create directory if it doesn't exist
    mkdir -p "$CONFIG_DIR"
    
    # Source environment variables
    if [ -f ".env" ]; then
        set -a
        source .env
        set +a
    else
        print_error ".env file not found. Run setup first."
        return 1
    fi
    
    # Create or update Claude Desktop config
    if [ -f "$CONFIG_FILE" ]; then
        print_warning "Claude Desktop config already exists. Backing up..."
        cp "$CONFIG_FILE" "$CONFIG_FILE.backup"
    fi
    
    cat > "$CONFIG_FILE" << EOF
{
  "mcpServers": {
    "sun-ecommerce": {
      "command": "npx",
      "args": ["-y", "@sun-ecommerce/mcp-server"],
      "env": {
        "SUN_ECOMMERCE_API_URL": "$SUN_ECOMMERCE_API_URL",
        "SUN_ECOMMERCE_API_TOKEN": "$SUN_ECOMMERCE_API_TOKEN",
        "SUN_ECOMMERCE_API_VERSION": "${SUN_ECOMMERCE_API_VERSION:-v1}",
        "SUN_ECOMMERCE_TIMEOUT": "${SUN_ECOMMERCE_TIMEOUT:-30000}",
        "SUN_ECOMMERCE_RETRIES": "${SUN_ECOMMERCE_RETRIES:-3}",
        "SUN_ECOMMERCE_ENABLE_LOGGING": "${SUN_ECOMMERCE_ENABLE_LOGGING:-true}"
      }
    }
  }
}
EOF
    
    print_status "Claude Desktop configuration created: $CONFIG_FILE"
    print_warning "Please restart Claude Desktop for changes to take effect."
}

# Function to create Cursor configuration
setup_cursor() {
    print_header "=== Cursor Setup ==="
    
    # Create .cursor directory if it doesn't exist
    mkdir -p .cursor
    
    # Source environment variables
    if [ -f ".env" ]; then
        set -a
        source .env
        set +a
    else
        print_error ".env file not found. Run setup first."
        return 1
    fi
    
    cat > .cursor/mcp.json << EOF
{
  "mcpServers": {
    "sun-ecommerce": {
      "command": "npx",
      "args": ["-y", "@sun-ecommerce/mcp-server"],
      "env": {
        "SUN_ECOMMERCE_API_URL": "$SUN_ECOMMERCE_API_URL",
        "SUN_ECOMMERCE_API_TOKEN": "$SUN_ECOMMERCE_API_TOKEN",
        "SUN_ECOMMERCE_API_VERSION": "${SUN_ECOMMERCE_API_VERSION:-v1}",
        "SUN_ECOMMERCE_TIMEOUT": "${SUN_ECOMMERCE_TIMEOUT:-30000}",
        "SUN_ECOMMERCE_RETRIES": "${SUN_ECOMMERCE_RETRIES:-3}",
        "SUN_ECOMMERCE_ENABLE_LOGGING": "${SUN_ECOMMERCE_ENABLE_LOGGING:-true}"
      }
    }
  }
}
EOF
    
    print_status "Cursor configuration created: .cursor/mcp.json"
}

# Function to run the MCP server
run_server() {
    print_header "=== Running MCP Server ==="
    
    if [ ! -f "dist/index.js" ]; then
        print_error "Project not built. Run 'npm run build' first."
        return 1
    fi
    
    if [ ! -f ".env" ]; then
        print_error ".env file not found. Run setup first."
        return 1
    fi
    
    print_status "Starting Sun eCommerce MCP Server..."
    print_status "Press Ctrl+C to stop the server"
    
    # Load environment variables and start server
    set -a
    source .env
    set +a
    
    node dist/index.js
}

# Function to show usage
show_usage() {
    echo "Sun eCommerce Platform MCP Server Setup"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  setup           Complete setup (dependencies, build, config)"
    echo "  install         Install dependencies only"
    echo "  build           Build the project only"
    echo "  config          Create environment configuration"
    echo "  test            Test the configuration"
    echo "  claude          Setup Claude Desktop integration"
    echo "  cursor          Setup Cursor integration"
    echo "  run             Run the MCP server"
    echo "  help            Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 setup        # Complete setup process"
    echo "  $0 config       # Configure environment only"
    echo "  $0 test         # Test current configuration"
}

# Main script logic
main() {
    print_header "🌟 Sun eCommerce Platform MCP Server Setup 🌟"
    echo ""
    
    case "${1:-setup}" in
        "setup")
            print_header "=== Complete Setup ==="
            check_node_version || exit 1
            install_dependencies
            build_project
            create_env_file
            test_configuration
            echo ""
            print_status "✅ Setup completed successfully!"
            echo ""
            print_status "Next steps:"
            echo "  1. Run '$0 claude' to setup Claude Desktop integration"
            echo "  2. Run '$0 cursor' to setup Cursor integration"
            echo "  3. Run '$0 run' to start the server locally"
            ;;
        "install")
            check_node_version || exit 1
            install_dependencies
            ;;
        "build")
            build_project
            ;;
        "config")
            create_env_file
            ;;
        "test")
            test_configuration
            ;;
        "claude")
            setup_claude_desktop
            ;;
        "cursor")
            setup_cursor
            ;;
        "run")
            run_server
            ;;
        "help"|"-h"|"--help")
            show_usage
            ;;
        *)
            print_error "Unknown command: $1"
            echo ""
            show_usage
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
