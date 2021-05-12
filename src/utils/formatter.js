import moment from 'moment';

export const currencyFormatter = (currency) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(currency);

export const integerFormatter = (number) =>
  new Intl.NumberFormat().format(number);

export const dateFormatter = (date) => moment(date).format('DD MMM, YYYY');
