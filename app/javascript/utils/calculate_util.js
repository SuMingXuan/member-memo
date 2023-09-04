export function SavingsAmount(amount, discount) {
  const originalAmount = OriginalAmount(amount, discount)
  return (originalAmount - amount).toFixed(2)
}


export function OriginalAmount(amount, discount) {
  return (amount / (discount / 10.0)).toFixed(2)
}