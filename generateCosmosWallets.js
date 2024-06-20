const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const fs = require("fs");
const path = require("path");

const generateWallets = async (numOfWallets) => {
  const wallets = [];
  for (let i = 0; i < numOfWallets; i++) {
    const wallet = await DirectSecp256k1HdWallet.generate(12);
    const [account] = await wallet.getAccounts();
    wallets.push({
      address: account.address,
      mnemonic: wallet.mnemonic,
    });
  }
  return wallets;
};

const saveWalletsToFile = (wallets, filename) => {
  const filePath = path.resolve(__dirname, filename);
  const fileExists = fs.existsSync(filePath);
  const csvLines = wallets.map(wallet => `${wallet.address},${wallet.mnemonic}`).join('\n');
  
  if (fileExists) {
    // Append to the existing file
    fs.appendFileSync(filePath, '\n' + csvLines);
  } else {
    // Create a new file with header
    const header = 'Address,Mnemonic';
    fs.writeFileSync(filePath, header + '\n' + csvLines);
  }
};

const numOfWallets = 10; // Укажите количество кошельков, которое хотите создать
const outputFilename = "cosmos_wallets.csv"; // Имя файла для сохранения данных

generateWallets(numOfWallets).then((wallets) => {
  saveWalletsToFile(wallets, outputFilename);
  console.log(`Создано ${numOfWallets} кошельков и добавлено в ${outputFilename}`);
});



