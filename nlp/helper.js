function maxSizeFileHandler(textFile) {
  const length = textFile.length;
  const arraySize = Math.ceil(length / 6500);
  let docsArray = Array(arraySize);
  for (i = 0; i < arraySize; i++) {
    docsArray[i] = textFile.slice(0, 6499);
  }
  return docsArray;
}

module.exports = { maxSizeFileHandler };
