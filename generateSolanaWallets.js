const { Keypair } = require('@solana/web3.js');
const bs58 = require('bs58');
const fs = require('fs');

const generateWallets = async (numOfWallets) => {
  const wallets = [];
  for (let i = 0; i < numOfWallets; i++) {
    const keypair = Keypair.generate();
    wallets.push({
      address: keypair.publicKey.toBase58(),
      privateKey: bs58.encode(Buffer.from(keypair.secretKey)),
    });
  }
  return wallets;
};

const saveWalletsToFile = (wallets, filename) => {
  let existingWallets = [];
  if (fs.existsSync(filename)) {
    const data = fs.readFileSync(filename, "utf8");
    existingWallets = data.split('\n').filter(line => line.trim() !== ''); // Split lines and filter empty lines
  }
  const newWallets = wallets.map(wallet => `${wallet.address},${wallet.privateKey}`);
  const allWallets = existingWallets.concat(newWallets).join('\n');
  fs.writeFileSync(filename, allWallets);
};

const numOfWallets = 10; // Укажите количество кошельков, которое хотите создать
const outputFilename = "solana_wallets.csv"; // Имя файла для сохранения данных

generateWallets(numOfWallets).then((wallets) => {
  saveWalletsToFile(wallets, outputFilename);
  console.log(`Создано ${numOfWallets} кошельков и добавлено в ${outputFilename}`);
});


