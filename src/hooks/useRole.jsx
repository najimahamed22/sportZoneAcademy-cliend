// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";
// import useAuth from "./useAuth";

// const useRole = () => {
//   const { user } = useAuth();

//   const axiosSecure = useAxiosSecure();

//   const {
//     data: role,
//     isLoading,
//     isError,
//   } = useQuery(["role", user.email], async () => {
//     const res = await axiosSecure.get(`/users/role/${user.email}`);
//     return res.data.role;
//   });

//   return {
//     role,
//     isLoading,
//     isError,
//   };
// };

// export default useRole;

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const {
    data: role = "",
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user?.email}`);
      console.log(res);
      return res.data.role;
    },
  });

  return {
    role,
    isLoading,
    isError,
  };
};

export default useRole;
