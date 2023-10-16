interface IExchangeRate {
  fromCode: string
  toCode: string
  rate: number
  lastUpdate: string
}

interface IExchangeValue { from: number | '', to: number | '' }

interface CardData {
  name: string
  value: number
}

interface QuotesProps {
  quotes: Record<string, number>
}
interface CurrencyModalProps {
  onClose?: () => void
  from: string
}

export type {
  CardData, CurrencyModalProps,
  IExchangeRate, IExchangeValue, QuotesProps,
};
