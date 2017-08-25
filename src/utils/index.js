export function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length)
    return false;
  for (let i = arr1.length; i--;) {
    if (arr1[i] !== arr2[i])
      return false;
  }

  return true;
}


export function getFileType (key) {
    const fileTypes = {
      'application/pdf': 'pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'doc',
      'application/msword': 'doc'

    };
    return fileTypes[key];
}

export function fileIsNotValid(type) {
  return type != 'application/pdf' && type != 'application/msword' &&
      type != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
}

export function getFileSizeInMb(file) {
  return Math.ceil( file / (1028 * 1028));
}
