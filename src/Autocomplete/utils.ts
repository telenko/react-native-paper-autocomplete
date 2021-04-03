export const filter = (
  options: any[],
  inputV: string,
  labelExtractor: (item: any) => string
): any[] => {
  return options.filter((option) =>
    labelExtractor(option).toUpperCase().includes(inputV.toUpperCase())
  );
};
