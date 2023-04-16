const fs = require('fs');
const usersFiltePath = `${__dirname}/../dev-data/data/users-simple.json`;
const users = JSON.parse(fs.readFileSync(usersFiltePath));
//get all users handler

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
};

//create new user handler

exports.createUser = (req, res) => {
  const newId = users[users.length - 1].id + 1;
  const newUSer = { ...req.body, id: newId };
  users.push(newUSer);
  fs.writeFile(usersFiltePath, JSON.stringify(users), (err) => {
    if (err) {
      res.status(404).json({
        message: 'something went wrong',
      });
    } else {
      res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
          users,
        },
      });
    }
  });
};

//get specific user handler

exports.getUser = (req, res) => {
  let user = users.find((user) => user.id == req.params.id);
  if (!user) {
    res.status(404).json({
      message: "this user doesn't exist",
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  }
};

//update specif user handler

exports.updateUser = (req, res) => {
  let oldUser = users.find((user) => user.id == req.params.id);
  const restOfUsers = users.filter((user) => user.id != req.params.id);
  if (!oldUser) {
    res.status(404).json({
      message: "this user doesnm't exist",
    });
  } else {
    const newUser = { ...oldUser, ...req.body };
    console.log(newUser, JSON.stringify([...restOfUsers, newUser]));
    fs.writeFile(
      usersFiltePath,
      JSON.stringify([...restOfUsers, newUser]),
      (err) => {
        if (err) {
          res.status(404).json({
            message: 'soemthing went wrong ',
          });
        } else {
          res.status(200).json({
            message: 'updated sucessfully',
            data: {
              users,
            },
          });
        }
      }
    );
  }
};

//delete user handler
exports.deleteUser = (req, res) => {
  let user = users.filter((user) => user.id == req.params.id);
  if (!user) {
    res.status(404).json({
      message: "this user doesn't exist",
    });
  } else {
    let newUsers = users.filter((user) => user.id != req.params.id);
    fs.writeFile(usersFiltePath, JSON.stringify(newUsers), (err) => {
      if (err) {
        res.status(404).json({
          message: 'something went wrong ',
        });
      } else {
        res.status(200).json({
          status: 'success',
          results: newUsers.length,
          data: {
            users: newUsers,
          },
        });
      }
    });
  }
};
