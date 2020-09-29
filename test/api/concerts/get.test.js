const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concerts.model');
const Seat = require('../../../models/seats.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts',() => {
    before(async () => {
        const testConcertOne = new Concert(
            {
                _id: '5d9f1140f10a81216cfd4408',
                performer: 'TestPreformer1',
                genre: 'metal',
                price: 100,
                day: 25,
                image: 'test.jpg',
            }
        )
        await testConcertOne.save();

        const testConcertTwo = new Concert(
            {
                _id: '5d9f1159f81ce8d1ef2bee48',
                performer: 'TestPreformer2',
                genre: 'metal',
                price: 100,
                day: 26,
                image: 'test.jpg',
            }
        )
        await testConcertTwo.save();

        const testSeatOne = new Seat(
            {
                day: 25,
                seat: 1,
                client: 'Test1',
                email: 'test@email.com',
            }
        );

        await testSeatOne.save();

        const testSeatTwo = new Seat(
            {
                day: 25,
                seat: 2,
                client: 'Test2',
                email: 'test@email.com',
            }
        );

        await testSeatTwo.save();

        const testSeatThree = new Seat(
            {
                day: 26,
                seat: 1,
                client: 'Test3',
                email: 'test@email.com',
            }
        );

        await testSeatThree.save();
    });

    it('should return all concerts', async () => {
        const res = await request(server).get('/api/concerts');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    it('should return proper tickets number', async () => {
        const res = await request(server).get('/api/concerts');
        res.body.forEach(concert => {
            if(concert.day === 25) expect(concert.ticket).to.be.equal(48);
            if(concert.day === 26) expect(concert.ticket).to.be.equal(49);
        });
    });

    it('/random should return one random concert', async () => {
        const res = await request(server).get('/api/concerts/random');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
    });

    it('/:id should return one concert by :id', async () => {
        const res = await request(server).get(
            '/api/concerts/5d9f1140f10a81216cfd4408'
          );
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.not.be.null;
    });

    after(async () => {
        await Concert.deleteMany();
        await Seat.deleteMany();
    })
});