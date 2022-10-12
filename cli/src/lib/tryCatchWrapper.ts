function tryCatchWrapperSync(fn, sccb, errcb) {
  return (...args) => {
    try {
      fn(...args);
      sccb();
    } catch (e) {
      errcb();
    }
  };
}

function tryCatchWrapper(fn, sccb, errcb) {
  return async (...args) => {
    try {
      const result = await fn(...args);
      sccb();
      return result;
    } catch (e) {
      errcb();
    }
  };
}

export { tryCatchWrapper, tryCatchWrapperSync };
