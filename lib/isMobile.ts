export const isMobile = (userAgent: string): boolean => {
  
  return /android.+mobile|ip(hone|od)|tablet|iPad/i.test(userAgent);
};
