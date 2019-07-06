function costToString(cost) {
  if (cost === 0) {
    return 'Free';
  }

  const str = [];
  for (let i = 0; i < cost; i += 1) {
    str.push('$');
  }
  return str.join('');
}

export { costToString };
