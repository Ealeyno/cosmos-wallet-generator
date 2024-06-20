# Cosmos Wallet Generator

Этот проект предназначен для массового создания кошельков Cosmos и Solana

## Установка

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/yourusername/cosmos-wallet-generator.git
   cd cosmos-wallet-generator

2. Установите зависимости
   ```bash
   npm install
   
## Конфигурация
Вы можете изменить количество создаваемых кошельков, изменив значение переменной numOfWallets в файлах 'generateCosmosWallets' и 'generateSolanaWallets.js'

const numOfWallets = 100;
    
## Использование 
Для создания кошельков запустить одну из команд и будут получены cosmos_wallets.csv и solana_wallets.csv
  ```bash
npm run generate-cosmos
npm run generate-solana
