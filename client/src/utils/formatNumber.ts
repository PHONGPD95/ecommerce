export const CURRENCY_FORMAT = "currency";
export const NUMBER_FORMAT = "number";

export const formatNumber = (number: number, format = NUMBER_FORMAT) => {
  if (!number) return;

  switch (format) {
    case CURRENCY_FORMAT:
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
      }).format(number);

    default:
      return new Intl.NumberFormat("vi-VN").format(number);
  }
};
