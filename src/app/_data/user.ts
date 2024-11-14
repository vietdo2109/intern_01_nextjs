// import { verifySession } from "@/lib/session";
// import { User } from "@/types/loginPage";
// import { sql } from "@vercel/postgres";
// import { cache } from "react";

// export const getUserInfo = cache(async () => {
//   // verify user's session
//   const session = await verifySession();
//   console.log("verify session: " + session);

//   // fetch user data
//   const data = await sql`
//     SELECT *
//     FROM users
//     WHERE userid = ${session.userId}
//   `;

//   const user = <User>data.rows[0];

//   // filter data
//   const filteredUser = userDTO(user);
//   return filteredUser;
// });

// function userDTO(user: User) {
//   return {
//     username: user.username,
//     todoIds: user.todoids,
//   };
// }
