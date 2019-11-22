const request = require("supertest");

const db = require("../database/db-config");

const server = require("../server");

beforeEach(async () => {
  await db("nannies").truncate();
});

describe("nanny router", () => {
  xdescribe("[POST] /register endpoint", () => {
    test("the db env is testing", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });

    // it("responds with json", function(done) {
    //   const nannyDetails = {
    //     email: "oji@gmail.com",
    //     password: "1234",
    //     first_name: "Adesuwa",
    //     last_name: "Ichong",
    //     address: "Jos",
    //     hourly_rate: 2000,
    //     can_drive: true,
    //     phone: "+2335690211"
    //   };
    //   request(server)
    //     .post("/api/nanny/register")
    //     .send(nannyDetails)
    //     .set("Accept", "application/json")
    //     .expect("Content-Type", /json/)
    //     .expect(201)
    //     .end(function(err, res) {
    //       if (err) return done(err);
    //       done();
    //     });
    // });
  });
});

describe("POST /nanny", function() {
  let data = {
    email: "oji@gmail.com",
    password: "1234",
    first_name: "Adesuwa",
    last_name: "Ichong",
    address: "Jos",
    hourly_rate: 2000,
    can_drive: "true",
    phone: "+2335690211"
  };
  it("respond with 201 created",  function(done) {
    request(server)
      .get("/api/nanny/")
    //   .post("/api/nanny/register")
      .set("Accept", "application/json")
    //   .send(data)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
     
    //   done()
  });
});

xdescribe("login router", () => {
  describe("[POST] /login endpoint", () => {
    test("the db env is testing", () => {
      expect(process.env.DB_ENV).toEqual("testing");
    });

    it("responds with json", function(done) {
      request(server)
        .post("/api/nanny/login")
        .send({ email: "oji@gmail.com", password: "1234" })
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
    const response = await request(server).get("/api/nanny");
    expect(response.status).toBe(200);
  });

  it("respond with json containing a list of all nannies", function(done) {
    request(server)
      .get("/api/nanny")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

xdescribe("[GET] /nanny/:id", function() {
  it("respond with json containing a single nanny", function(done) {
    let nanny_id = 1;
    request(server)
      .get(`/api/nanny/${nanny_id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

xdescribe("put router", () => {
  it("should edit nanny details", function(done) {
    request(server)
      .put("/api/nanny/4")
      .send({ first_name: "cece" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        res.body.first_name.toBe("cece");
        if (err) return done(err);
        done();
      });
  });
});

xdescribe("delete router", () => {
  it("should delete nanny details", function(done) {
    request(server)
      .delete("/api/nanny/4")
      .expect(200, done);
  });
});
