import uuidv4 from "uuid/v4";

export default function mapValueToState(value) {
  const result = {};
  value.forEach((val, index) => {
    const tempId = uuidv4();
    result[tempId] = val;
  });
  return result;
};