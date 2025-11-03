import {webhooks} from "@/db/schema";
import {db} from "@/db/index";
import {faker} from "@faker-js/faker";


function generateBody() {
  const jsonType = faker.helpers.arrayElement(['user', 'product', 'order']);
  let jsonData: object;

  if (jsonType === 'user') {
    jsonData = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };
  } else if (jsonType === 'product') {
    jsonData = {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
    };
  } else {
    jsonData = {
      id: faker.string.uuid(),
      productId: faker.string.uuid(),
      quantity: faker.number.int({min: 1, max: 10}),
      date: faker.date.past(),
    };
  }
  return JSON.stringify(jsonData, null, 2);
}

async function seed() {
  const items = Array.from({length: 60}, () => {
    const url = faker.internet.url()
    const contentType = faker.helpers.arrayElement([
      "application/json",
      "application/xml",
      "text/html",
      "text/plain",
      "application/x-www-form-urlencoded",
    ])


    return {
      method: faker.helpers.arrayElement(["POST", "PUT", "PATCH", "DELETE", "GET"]),
      pathname: `/${Array.from({length: faker.number.int({min: 1, max: 4})}, () =>
        faker.lorem.slug({min: 1, max: 3})
      ).join('/')}`,
      ip: faker.internet.ip(),
      statusCode: faker.number.int({min: 100, max: 599}),
      contentType,
      contentLength: faker.number.int({min: 0, max: 10000}),
      queryParams: Object.fromEntries(
        Array.from({length: faker.number.int({min: 0, max: 5})}, () => [
          faker.lorem.word(),
          faker.lorem.word(),
        ])
      ),
      headers: {
        "content-type": contentType,
        "x-request-id": faker.string.alphanumeric(12),
        host: new URL(url).host,
      },
      body: generateBody(),
      created_at: faker.date.past(),
    }
  });

  await db.insert(webhooks).values(items);
  console.log(`Inserted ${items.length} webhooks`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
