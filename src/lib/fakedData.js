import faker from "faker/locale/en"

export function fakeAuthor() {
  return {
    avatar: faker.image.avatar(),
    fullName: faker.name.findName("", "", undefined),
  }
}

export function fakePosts(amount = 3) {
  return new Array(amount).fill(null).map(() => ({
    id: faker.random.uuid(),
    content: faker.lorem.lines(),
    author: fakeAuthor(),
    timestamp: faker.date.recent(),
  }))
}
