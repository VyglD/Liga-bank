const Currency = {
  RUB: `RUB`,
  USD: `USD`,
  EUR: `EUR`,
  GBR: `GBR`,
  CNY: `CNY`,
};

const ConverterFieldType = {
  IN: {
    label: `У меня есть`,
    name: `input`,
    initialСurrency: Currency.RUB
  },
  OUT: {
    label: `Хочу приобрести`,
    name: `output`,
    initialСurrency: Currency.USD
  }
};

export {
  Currency,
  ConverterFieldType,
};
