
const request = require("supertest");

const BASE_URL = "http://127.0.0.1:5000";

let jobId;

// Test data
const newJob = {
    companyName: "Microsoft",
    jobRole: "Software Developer",
    applicantName: "Halima",
    location: "Bangalore",
    status: "Applied"
};

describe("Job Application Tracker API", () => {

    // 1. Test Home Route
    test("GET / should return server message", async () => {

        const response = await request(BASE_URL).get("/");

        expect(response.statusCode).toBe(200);

        expect(response.text).toBe(
            "Job Application Tracker API is running"
        );

    });


    // 2. Test GET All Jobs
    test("GET /api/jobs should return all jobs", async () => {

        const response = await request(BASE_URL).get("/api/jobs");

        expect(response.statusCode).toBe(200);

        expect(Array.isArray(response.body)).toBe(true);

    });


    // 3. Test POST - Add New Job
    test("POST /api/jobs should create a new job", async () => {

        const response = await request(BASE_URL)
            .post("/api/jobs")
            .send(newJob);

        expect(response.statusCode).toBe(200);

        expect(response.body.companyName).toBe("Microsoft");

        expect(response.body.jobRole).toBe("Software Developer");

        expect(response.body.applicantName).toBe("Halima");

        expect(response.body.location).toBe("Bangalore");

        expect(response.body.status).toBe("Applied");

        expect(response.body._id).toBeDefined();

        jobId = response.body._id;

    });


    // 4. Test GET Job by ID
    test("GET /api/jobs should contain the created job", async () => {

        const response = await request(BASE_URL).get("/api/jobs");

        const createdJob = response.body.find(
            job => job._id === jobId
        );

        expect(createdJob).toBeDefined();

        expect(createdJob.companyName).toBe("Microsoft");

    });


    // 5. Test PUT - Update Job
    test("PUT /api/jobs/:id should update the job", async () => {

        const response = await request(BASE_URL)
            .put(`/api/jobs/${jobId}`)
            .send({
                status: "Interview"
            });

        expect(response.statusCode).toBe(200);

        expect(response.body.status).toBe("Interview");

    });


    // 6. Test DELETE - Remove Job
    test("DELETE /api/jobs/:id should delete the job", async () => {

        const response = await request(BASE_URL)
            .delete(`/api/jobs/${jobId}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.message).toBe(
            "Job deleted successfully"
        );

    });


    // 7. Verify Deleted Job
    test("GET /api/jobs should not contain deleted job", async () => {

        const response = await request(BASE_URL).get("/api/jobs");

        const deletedJob = response.body.find(
            job => job._id === jobId
        );

        expect(deletedJob).toBeUndefined();

    });

});
