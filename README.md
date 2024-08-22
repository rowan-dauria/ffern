This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Rowan's Thoughts

### Supabase Client and DAL (Data Access Layer)
- Put the Supabase database user's creds in the environment variables
- You have to asycnchronously authenticate each DB client, this makes building a nice DB client more difficult. You should not be instantiating the client layer on each client method call.
- I didn't end up implementing this, but I would make different DB clients for each level of authentication: public, members, team. Public would have INSERT permissions on the members table and nothing else, members would be able to UPDATE/DELETE on the members table, and add users to the ledger, team client would be able to INSERT on the triggers table etc.
- There is currently an issue with the supabase client throwing an error when I attempt to check if a member is in the ledger. It says the JWT has expired for the user immediately after signing in. This only appeared after a refactor.

### UI
- Need to implement form validation: password length, some regex to check valid telephone numbers.
- Wasn't aware of the useActionState hook and how it is possible to use server components to create a form rendered on the server.
- All of the state and callbacks are defined on the SignUp component to centralise state and logic
- If I were to do it again, i would redirect the user to a new page after a successful login. This would save data being sent to the user needlessly.

### DB
- I implemented some foreign key constraints like member region must match a value in the regions table, and that a member_id on the ledger must correspond to an id on the members table. I also included some cascades to remove users from the ledger if they opt out.
- In future, I would add some DB triggers for the adding users to the invited_to_join table. 

### Testing
- I would refactor the DAL to make it easier for testing, for example making it easier to inject a mock client that can return dummy data.
- I didn't use TDD to make this because I have never used the Next framework before, so wanted to focus on getting something working.

