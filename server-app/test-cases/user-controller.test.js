const {
  store,
  index,
  update,
  destroy,
  indexPins,
  simulateRoute,
} = require("../dist/src/api/controllers/users");
const userDAL = require("../dist/src/database/data-access/users");
const pinDAL = require("../dist/src/database/data-access/pins");

const User = require("../dist/src/database/models/User").default;

describe("User controller", () => {
  let req;
  let res;
  let create;
  let getAll;
  let DALupdate;
  let deleteById;
  let getUserPins;

  const pins = [
    {
      id: 29,
      long: 96.1219,
      lat: 16.816,
      userId: 1,
      createdAt: "2023-02-22T19:23:48.000Z",
      updatedAt: "2023-02-23T00:54:21.000Z",
    },
    {
      id: 31,
      long: 96.1219,
      lat: 16.8147,
      userId: 1,
      createdAt: "2023-02-22T19:25:20.000Z",
      updatedAt: "2023-02-23T00:55:04.000Z",
    },
    {
      id: 35,
      long: 96.1219,
      lat: 16.8175,
      userId: 1,
      createdAt: "2023-02-22T19:28:36.000Z",
      updatedAt: "2023-02-23T00:55:10.000Z",
    },
  ];

  const pin = {
    id: 1,
  };

  const endPin = {
    id: 3,
  };

  const mockUsers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
  ];
  const visitedNodes = {
    0: {
      id: 29,
      long: 96.1219,
      lat: 16.816,
      userId: 1,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    },
    1: {
      id: 31,
      long: 96.1219,
      lat: 16.8147,
      userId: 1,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    },
    2: {
      id: 35,
      long: 96.1219,
      lat: 16.8175,
      userId: 1,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    },
  };
  beforeEach(() => {
    req = { body: { username: "testuser" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    create = jest
      .spyOn(userDAL, "create")
      .mockResolvedValue(new User({ username: "testuser" }));
    getAll = jest.spyOn(userDAL, "getAll").mockResolvedValue(mockUsers);
    DALupdate = jest
      .spyOn(userDAL, "update")
      .mockResolvedValue({ id: 1, username: "testuser" });
    deleteById = jest.spyOn(userDAL, "deleteById").mockResolvedValue(true);
    getUserPins = jest.spyOn(userDAL, "getUserPins").mockResolvedValue(pins);
  });

  afterEach(() => {
    create.mockRestore();
  });

  it("should create a new user", async () => {
    await store(req, res);
    expect(create).toHaveBeenCalledWith({ username: "testuser" });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User created successfully.",
    });
  });

  it("should get users", async () => {
    await index(req, res);
    expect(getAll).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Users fetched successfully",
      data: mockUsers,
    });
  });

  it("should update user and return updated user", async () => {
    const req = {
      params: { id: 1 },
      body: { username: "testuser" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await update(req, res);

    expect(DALupdate).toHaveBeenCalledWith(1, { username: "testuser" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User updated successfully",
      data: { id: 1, username: "testuser" },
    });
  });

  it("should delete user and return success message", async () => {
    const req = { params: { id: 1 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await destroy(req, res);

    expect(deleteById).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User deleted successfully.",
    });
  });

  it("should return pins for user", async () => {
    const req = { params: { id: 1 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await indexPins(req, res);

    expect(getUserPins).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User pins successfully fetched",
      data: pins,
    });
  });

  it("should generate the route successfully", async () => {
    const userId = 1;
    const startPinId = 29;

    const req = { params: { pinId: startPinId, id: userId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    const result = await simulateRoute(req, res);
    expect(result.json).toHaveBeenCalledTimes(1);
  });
});
