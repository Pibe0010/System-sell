export const GeneratorCode = (data) => {
  const lastIdProduct = data.id + 1;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const codeLength = 4;
  let randomCode = "";

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomCode += characters.charAt(randomIndex);
  }
  const code = `${randomCode}${lastIdProduct}333`;
  return code;
};
