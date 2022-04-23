import request from "supertest";
import app from '../app'

const sampleDataInput =  {
  "account": "7741566054",
  "balance": 7000,
  "createdAt": "2022-04-04T20:06:21.756Z"
}
const sampleDataInput2 =  {
  "account": "5987454698",
  "balance": 7000,
  "createdAt": "2022-04-04T20:06:21.756Z"
}

const transferSample =  {
  "from": "5987454698",
  "to": "7741566054",
  "amount": 1000
}




describe('GET API TESTS', () => {
  
 test("GET /balances/:accountNumber", async () => {
    const postReq = await request(app).post('/create-account').send(sampleDataInput)
    const getReq = await request(app).get("/balance/" + postReq.body.account)
    expect(postReq.statusCode).toBe(201)
    expect(getReq.statusCode).toBe(200)
  });
})

describe('POST API TESTS', () => {
  test('it creates users', async () => {
    const res = await request(app).post('/create-account').send(sampleDataInput)
    expect(res.statusCode).toBe(201)
    expect(res.body).toEqual(expect.objectContaining({balance: expect.any(Number)}))
  })
})

describe('PUT API TESTS', () => {
  test('it transfers between clients and produces a result', async () => {
    await request(app).post('/create-account').send(sampleDataInput)
    await request(app).post('/create-account').send(sampleDataInput2)
    const postReq = await request(app).post('/transfer').send(transferSample)
    expect(postReq.statusCode).toBe(201);
    expect(postReq.body).toMatchObject( 
       expect.objectContaining({
         reference: expect.any(String),
         amount: 1000
      })
      )
  })
})

