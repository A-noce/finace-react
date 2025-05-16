import { MaskEnum } from "@typing/enums";

export const mask = (value: string, mask: MaskEnum | string) => {
  let i = 0;

  const resPattern = mask.replace(/#/g, () => value[i++] || "#");

  const indexHash = resPattern.indexOf("#");
  if (indexHash === -1) return resPattern;

  if (value[value.length - 1] !== resPattern[resPattern.length - 1]) {
    return resPattern.substring(
      0,
      resPattern.lastIndexOf(value[value.length - 1]) + 1
    );
  }
  if (indexHash !== -1) return resPattern.substring(0, indexHash);
  return resPattern;
};

export const makeQuery = (data: Record<string, any>) => {
  const objectArray = Object.entries(data).filter(
    ([_, value]) => value !== null && value !== undefined && value !== ""
  );
  const params = objectArray.map(([key, value]) => `${key}=${value}`);
  return "?" + params.join("&");
};

export const formatCpfCnp = (document: string) => {
  const documentMask = document.length > 11 ? MaskEnum.CNPJ : MaskEnum.CPF;
  const masdkDcument = mask(document, documentMask);
  return masdkDcument;
};
