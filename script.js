import { prisma } from "./lib/prisma.js";

async function main() {
  //   const user = await prisma.user.create({
  //     data: {
  //       username: "thatOneGuy",
  //       password: "123456",
  //       admin: true,
  //       posts: {
  //         create: {
  //           title: "Hello World",
  //           content: "This is my first post!",
  //           published: true,
  //         },
  //       },
  //     },
  //     include: { posts: true },
  //   });
  //   console.log("Created User", user);

  //   const allUsers = await prisma.user.findMany({
  //     include: { posts: true, comments: true },
  //   });
  //   console.log("All Users: ", JSON.stringify(allUsers, null, 2));

  const allPosts = await prisma.post.findMany({
    include: { comments: true },
  });
  console.log("All Posts: ", JSON.stringify(allPosts, null, 2));

  //   const comment = await prisma.comment.create({
  //     data: {
  //       message: "first comment",
  //       author: {
  //         connect: {
  //           id: 1,
  //         },
  //       },
  //       post: {
  //         connect: { id: 1 },
  //       },
  //     },
  //   });
  //   console.log("First Comment", JSON.stringify(comment, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
