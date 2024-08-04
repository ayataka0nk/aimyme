export const parseYearMonth = (
  yearMonth: string
): { year: number; month: number } => {
  const [year, month] = yearMonth.split('-').map(Number)
  return { year, month }
}

export const formatYearMonth = (year: number, month: number) => {
  return `${year}-${String(month).padStart(2, '0')}`
}

export const calcPrevYearMonth = (year: number, month: number) => {
  if (month === 1) {
    return { year: year - 1, month: 12 }
  } else {
    return { year: year, month: month - 1 }
  }
}

export const calcNextYearMonth = (year: number, month: number) => {
  if (month === 12) {
    return { year: year + 1, month: 1 }
  } else {
    return { year: year, month: month + 1 }
  }
}

export const getCurrentYearMonth = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  return { year, month }
}
