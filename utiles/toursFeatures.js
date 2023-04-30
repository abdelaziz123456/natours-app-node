exports.excludeFields = (req, Tour) => {
  console.log({ ...req.query });
  let queryObject = { ...req.query };

  let excludedFileds = ['limit', 'page', 'field', 'sort'];

  excludedFileds.forEach((el) => delete queryObject[el]);
  console.log({ queryObject });
  //{difficulty:'easy',duration:{$gte:5}}
  //{ duration: { gte: '5' }, difficulty: 'easy' }
  let queryStr = JSON.stringify(queryObject);

  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  let query = Tour.find(JSON.parse(queryStr));
  return query;
};

exports.sortHandler = (req, query) => {
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');

    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  return query;
};

exports.fieldhandler = (req, query) => {
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v -description');
  }
  return query;
};
