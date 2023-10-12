export const generateId = () => {
  let id = "";
  const str = "hpf840!gb;lyi23wzipxs";
  for (let i = 0; i < 8; i++) {
    id += str[Math.floor(Math.random() * str.length)];
  }
  return id;
};

export const calculateRows = (
  width: number,
  height: number,
  actualWidth: number
) => {
  const cn = height / width;
  const span = Math.ceil(Math.ceil((cn * actualWidth) / 20) / 2) + 2;
  return span;
};
