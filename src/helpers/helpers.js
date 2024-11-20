import SHA256 from "crypto-js/sha256";

export const isCryptoWallet = (text) => {
  // Регулярные выражения для каждого типа кошельков
  const ethereumRegex = /^0x[a-fA-F0-9]{40}$/; // Ethereum (42 символа, 0x-префикс)
  const solanaRegex = /^[1-9A-HJ-NP-Za-km-z]{43,44}$/; // Solana (43-44 символа, буквенно-цифровой)
  const starknetRegex = /^0x[a-fA-F0-9]{40,64}$/; // StarkNet (40-64 символа, 0x-префикс)
  const aptosRegex = /^[a-fA-F0-9]{66}$/; // Aptos (66 символов, буквенно-цифровой)
  const cosmosRegex = /^cosmos1[0-9a-z]{38,43}$/; // Cosmos (начинается с cosmos1, 39-44 символа)
  const bitcoinRegex = /^(1|3|bc1)[A-HJ-NP-Za-km-z1-9]{25,42}$/; // Bitcoin (26-42 символа, определённые префиксы)
  const isCryptoWallet =
    ethereumRegex.test(text) ||
    solanaRegex.test(text) ||
    starknetRegex.test(text) ||
    aptosRegex.test(text) ||
    cosmosRegex.test(text) ||
    bitcoinRegex.test(text);

  // Если не соответствует ни одному из форматов
  return isCryptoWallet;
};

export const identifyCryptoWallet = (text) => {
  // Регулярные выражения для каждого типа кошельков
  const ethereumRegex = /^0x[a-fA-F0-9]{40}$/; // Ethereum (42 символа, 0x-префикс)
  const solanaRegex = /^[1-9A-HJ-NP-Za-km-z]{43,44}$/; // Solana (43-44 символа, буквенно-цифровой)
  const starknetRegex = /^0x[a-fA-F0-9]{40,64}$/; // StarkNet (40-64 символа, 0x-префикс)
  const aptosRegex = /^[a-fA-F0-9]{66}$/; // Aptos (66 символов, буквенно-цифровой)
  const cosmosRegex = /^cosmos1[0-9a-z]{38,43}$/; // Cosmos (начинается с cosmos1, 39-44 символа)
  const bitcoinRegex = /^(1|3|bc1)[A-HJ-NP-Za-km-z1-9]{25,42}$/; // Bitcoin (26-42 символа, определённые префиксы)

  if (ethereumRegex.test(text)) {
    return "Ethereum";
  } else if (solanaRegex.test(text)) {
    return "Solana";
  } else if (starknetRegex.test(text)) {
    return "StarkNet";
  } else if (aptosRegex.test(text)) {
    return "Aptos";
  } else if (cosmosRegex.test(text)) {
    return "Cosmos";
  } else if (bitcoinRegex.test(text)) {
    return "Bitcoin";
  }

  // Если не соответствует ни одному из форматов
  return null; //
};

export const cutWalletNumber = (str = "-") => {
  if (str.length <= 12) return str; // Если строка короче 12 символов, возвращаем её целиком
  return `${str.slice(0, 6)}...${str.slice(-6)}`;
};

export const generateCode = (length = 10) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

export const getRandomInt = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
};

export const getAirdrops = async (wallet, allAirdrops) => {
  // Генерация хэша
  const hash = SHA256(wallet).toString();

  // Преобразуем хэш в число
  const seed = parseInt(hash.slice(0, 8), 16);

  // Генерация псевдослучайных индексов
  const randomIndexes = [];
  for (let i = 0; i < 4; i++) {
    // Получаем 5 индексов
    randomIndexes.push((seed + i) % allAirdrops.length);
  }

  // Возвращаем выбранные аирдропы
  return randomIndexes.map((index) => allAirdrops[index]);
};
