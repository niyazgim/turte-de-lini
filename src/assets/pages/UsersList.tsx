import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
// import { CategoriesWrapper, CategoryBtn } from "../components/CategoriesWrapper";
// import { usersRolesData } from "../data/roles";
import UserCard, { UserCardOnLoad } from "../components/UserCard";
import { UserType } from "../../types";

export default function UsersList() {
  const [users, setUsers] = useState<UserType[]>([]);

  const fetchUser = async () => {
    try {
      const userResponse = await axios.get('https://randomuser.me/api/');
      const userData = userResponse.data.results[0];
      const user: UserType = {
        id: userResponse.data.info.results,
        imageUrl: userData.picture.large,
        name: {
          first: userData.name.first,
          last: userData.name.last,
        },
        username: userData.login.username,
        email: userData.email,
        role_id: Math.floor(Math.random() * 3) + 1,
      };
      setUsers(users => [...users, user]);
    } catch (error) {
      console.error('Error fetching fake user:', error);
    }
  };

  useEffect(() => {
    for (let i = 0; i < 12; i++) {
      fetchUser();
    }
  }, []);

  return (
    <section className="md:container m-auto pt-5">
      {/* <CategoriesWrapper>
        <CategoryBtn id={null} name={"Все"} />
        {usersRolesData.map((category, key) => (
          <CategoryBtn key={key} id={category.id} name={category.name} />
        ))}
      </CategoriesWrapper> */}
      <h1 className='mt-4 text-5xl font-semibold'>Пользователи</h1>
      <div className="grid grid-cols-3 gap-x-5 gap-y-5 mt-12">
        {users.map((user, key) => (
          <InfiniteScroll
            dataLength={users.length}
            next={() => fetchUser()}
            hasMore={true}
            loader={<UserCardOnLoad />}
            endMessage={<p>No more data to load.</p>}
          >
            <UserCard key={key} id={user.id} imageUrl={user.imageUrl} name={user.name} email={user.email} username={user.username} />
          </InfiniteScroll>
        ))}
      </div>
    </section >
  );
}