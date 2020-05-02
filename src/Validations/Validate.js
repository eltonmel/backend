module.exports = (app) => {
  function isSet(value, msg) {
    if (!value) throw msg;
    if (Array.isArray(value) && value.length === 0) throw msg;
    if (typeof value === 'string' && !value.trim()) throw msg;
  }

  function isNotSet(value, msg) {
    try {
      exists(value, msg);
    } catch (msg) {
      return;
    }
    throw msg;
  }

  function isNumeric(value, label) {
    if (isNaN(value)) throw `Valor numérico obrigatório ${label}`;
  }

  return { isSet, isNotSet, isNumeric };
};
