import { getSession } from '@auth0/nextjs-auth0';

export default async function ProfileServer() {
  const { user } = await getSession();

  return (
      user && (
          <div>
            {/* <Image width="30" height="30" src={user.picture} alt={user.name}></Image> */}
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
      )
  );
}