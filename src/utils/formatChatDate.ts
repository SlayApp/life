import {
  differenceInCalendarDays,
  format,
  isToday,
  isValid,
  isYesterday,
  Locale,
} from 'date-fns';

export function formatChatDate(input: string, locale?: Locale): string {
  const date = new Date(input);

  if (!isValid(date)) {
    return '';
  }

  if (isToday(date)) {
    return format(date, 'p', {locale});
  }

  if (isYesterday(date)) {
    return 'Yesterday';
  }

  const daysAgo = differenceInCalendarDays(new Date(), date);

  if (daysAgo >= 3 && daysAgo <= 7) {
    return format(date, 'EEEE', {locale});
  }

  return format(date, 'P', {locale});
}
