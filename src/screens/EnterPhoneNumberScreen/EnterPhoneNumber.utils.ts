const regex = /^\+\d+\s*|\s+/g;

export const formatPhoneNumber = (text: string) => {
  return text.replaceAll(regex, '');
};
