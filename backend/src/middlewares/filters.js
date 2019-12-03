function getFilters(req, res, next) {
  try {
    req.filters = {};
    const filters = req.query.filters;
    if (!filters || filters.length <= 0) {
      next();
      return;
    }

    req.filters['$or'] = [];

    filters.forEach(e => {
      const filter = {};
      if (e.type === 'like') {
        filter[e.field] = new RegExp(e.value, 'i');
      } else {
        filter[e.field] = {};
        if (e.type === '>') {
          filter[e.field]['$gt'] = e.value;
        } else if (e.type === '=') {
          filter[e.field]['$eq'] = e.value;
        } else if (e.type === '>=') {
          filter[e.field]['$gte'] = e.value;
        } else if (e.type === '<') {
          filter[e.field]['$lt'] = e.value;
        } else if (e.type === '<=') {
          filter[e.field]['$lte'] = e.value;
        } else if (e.type === '!=') {
          filter[e.field]['$ne'] = e.value;
        }
      }
      req.filters['$or'].push(filter);
    });

    next();
  } catch (error) {
    return res.status(400).json({ success: false, errorCode: error.code, message: error.message });
  }
}

module.exports = getFilters;
