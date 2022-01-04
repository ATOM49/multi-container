import apiInstance from ".";

const getFibonacciValues = async () => {
  const response = await apiInstance.get("/values/current");
  return response.data;
};

const getIndices = async () => {
  const response = await apiInstance.get("/values/all");
  return response.data;
};

const addIndex = async (value: { index: number }) => {
  const response = await apiInstance.post("/values", value);
  return response.data;
};

export { getFibonacciValues, getIndices, addIndex };
