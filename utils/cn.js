export default (...classes) => {
  console.log(classes);
  return [...classes].join(' ');
};
