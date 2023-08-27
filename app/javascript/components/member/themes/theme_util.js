import dayjs from 'dayjs';

const badgeColors = {
  upcomingExpiry: '#FFBA01',
  expired: '#FF4857',
  available: '#47C93A',
}

export function getColor(expiresAt) {
  const status = getStatus(expiresAt)
  return badgeColors[status]
}

export function getStatus(expiresAt) {
  const currentDate = dayjs();
  const oneMonthLater = currentDate.add(1, 'month');

  if (dayjs(expiresAt).isBefore(currentDate)) {
    return 'expired';
  } else if (dayjs(expiresAt).isBefore(oneMonthLater)) {
    return 'upcomingExpiry';
  } else {
    return 'available';
  }
}

export function formatExpiresAt(expiresAt) {
  const status = getStatus(expiresAt)

  if (expiresAt) {
    switch (status) {
      case 'expired':
        return '已过期'
      default:
        return `${dayjs(expiresAt).format(dateFormat)} 过期`
    }
  }
  return '永久'
}

export function formatCardNumber(cardNumber) {
  if (!/^\d+$/.test(cardNumber)) {
    return cardNumber;
  }

  const cleanCardNumber = cardNumber.replace(/\D/g, '');

  if (cleanCardNumber.length === 11) {
    const formattedCardNumber = cleanCardNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
    return formattedCardNumber;
  } else {
    const formattedCardNumber = cleanCardNumber.replace(/\d{4}(?=\d)/g, '$& ');
    return formattedCardNumber;
  }
}
