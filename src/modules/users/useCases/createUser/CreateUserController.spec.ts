import { app } from "../../../../app";
import request from "supertest";
import { Connection } from "typeorm";

import createConnection from "../../../../database/"

let connection: Connection;

describe("Authenticate User Controller", () => {

  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
    
    // const id = uuidV4();

    // const password = await hash("test123", 8)

    // await connection.query(
    //   `INSERT INTO users(id, name, email, password, created_at)
    //   VALUES('${id}', 'test', 'test@testmail.com', '${password}', 'now()' )`
    // );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a user", async () => {
    const response = await request(app).post("/api/v1/users").send({
      name: "Test",
      email: "test@testmail.com",
      password: "test123",
    });
    expect(response.status).toBe(201)
  });

  it("should not be able to create a user with existing email", async () => {
    await request(app).post("/api/v1/users").send({
      name: "Test",
      email: "test@testmail.com",
      password: "test123",
    });

    const response = await request(app).post("/api/v1/users").send({
      name: "Test",
      email: "test@testmail.com",
      password: "test123",
    });
    expect(response.status).toBe(400)
  });

});