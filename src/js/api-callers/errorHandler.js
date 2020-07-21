export default (res) => {
  if (!res.ok) {
    const { status, statusText } = res;
    return {
      status,
      statusText
    };
  }
  return res.json();
};