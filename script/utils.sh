# Install Git
apt-get install git

# Install NVM(node version manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
# Install nodejs lts version
nvm install 20.11.1
nvm use 20.11.1

# Update NPM(Node package manager) and core development tools
npm install -g npm@latest
npm install -g yarn
npm install -g @nestjs/cli
npm install -g ts-node
