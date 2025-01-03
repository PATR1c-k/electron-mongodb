const { MongoClient } = require("mongodb");
const ObjectID = require("mongodb").ObjectId;

class Employees {
  dbName;
  Client;

  constructor(uri, dbName) {
    this.uri = uri;
    this.dbName = dbName;
    this.client = new MongoClient(this.uri);
  }

  #getCollection = async () => {
    //# indicates that this is a private class
    await this.client.connect();
    console.log("connected to mongoDB");
    const db = this.client.db(this.dbName);
    const employees = db.collection("employees");
    return employees;
  };

  getEmployees = async () => {
    console.log("employees.js > getEmployees");

    const employees = await this.#getCollection();
    let res = await employees.find({}).toArray();

    res = res.map((employee) => {
      return {
        id: employee._id.toHexString(),
        name: employee.name,
        position: employee.position,
        salary: employee.salary,
      };
    });

    console.log(res);
    return res;
  };

  addemployee = async (employee) => {
    console.log(`employee.js > addEmployee : ${employee}`);

    const employees = await this.#getCollection();
    return await employees.insertOne(employee);
  };

  updateEmployee = async (id, employee) => {
    console.log(`Employee.js > updateEmployee:${employee}`);

    const employees = await this.#getCollection();
    return await employees.updateOne(
      { _id: new ObjectID(id) },
      { $set: employee }
    );
  };

  deleteEmployee = async (id) => {
    console.log(`Employee.js > deleteEmployee : ${id}`);

    const employees = await this.#getCollection();
    const res = await employees.deleteOne({ _id: new ObjectID(id) });
    return res.deletedCount > 0;
  };
}

module.exports = Employees;
