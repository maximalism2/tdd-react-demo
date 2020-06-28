import faker from "faker/locale/en"

export function fakeAuthor() {
  return {
    avatar: faker.image.avatar(),
    fullName: faker.name.findName("", "", undefined),
  }
}

export function fakeComments(min, max) {
  const amount = faker.random.number({ min, max })
  return new Array(amount).fill(null).map(() => ({
    id: faker.random.uuid(),
    author: fakeAuthor(),
    content: faker.lorem.lines(),
  }))
}

export function fakePosts(amount = 3) {
  return new Array(amount).fill(null).map(() => ({
    id: faker.random.uuid(),
    content: faker.lorem.lines(),
    author: fakeAuthor(),
    timestamp: faker.date.recent(),
    comments: fakeComments(0, 5),
  }))
}
