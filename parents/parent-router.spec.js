const request = require("supertest");

const db = require("../database/db-config");

const server = require("../server");

beforeEach(async () => {
  await db("parents").truncate();
});

xdescribe("parent router", () => {
  describe("[POST] /register endpoint", () => {
    test("the db env is testing", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });

    it("responds with json", function(done) {
      request(server)
        .post("/api/parent/register")
        .send({
          first_name: "Sule",
          last_name: "Suleman",
          phone: "+2459830263",
          address: "Kaduna",
          email: "oyin@gmail.com",
          password: "1234"
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect("Content-Type", /json/)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
});

xdescribe("login router", () => {
  describe("[POST] /login endpoint", () => {
    test("the db env is testing", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });

    test("responds with json", function(done) {
      request(server)
        .post("/api/parent/login")
        .send({ email: "oyin@gmail.com", password: "1234" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
});

xdescribe("[GET] / endpoint", () => {
  it("should return status 200 OK", async () => {
    const response = await request(server).get("/api/parent");
    expect(response.status).toBe(200);
  });

  it("respond with json containing a list of all parents", function(done) {
    request(server)
      .get("/api/parent")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// describe("[GET] /parent/:id", function() {
//   it("respond with json containing a single parent", function(done) {
//     let parent_id = 1;
//     request(server)
//       .get(`/api/nanny/${parent_id}`)
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(200, done);
//   });
// });

// describe("put router", () => {
//   it("should edit parent details", function(done) {
//     request(server)
//       .put("/api/parent/4")
//       .send({ first_name: "cece" })
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(200)
//       .end(function(err, res) {
//         res.body.first_name.toBe("cece");
//         if (err) return done(err);
//         done();
//       });
//   });
// });

// describe("delete router", () => {
//   it("should delete parent details", function(done) {
//     request(server)
//       .delete("/api/parent/4")
//       .expect(200, done);
//   });
// });
