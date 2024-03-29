import React from 'react'
import "./AdminPosts.scss"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from '../../../utils/newRequest';
import { Link } from "react-router-dom";
import FormatRupiah from "../../../utils/formatRupiah";

const AdminPosts = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      newRequest.get(`/posts/admin`).then((res) => {
        return res.data;
      }),
  });

  console.log(data)

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/posts/admin/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
    window.location.reload();
  };


  return (
    <div className='adminPosts'>
      {currentUser?.isAdmin && (
        <>
        <div className="container">
          <div className="title">
            <h1>Daftar Post</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Seller</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {data?.map((post) => (
              <tr key={post._id}>
                <td>
                  <img className='image' src={post.cover} alt="" />
                </td>
                <td>
                <Link to={`/post/${post._id}`} className="link">
                  <td>{post.title}</td>
                </Link>
                </td>

                <td>{post.userId.username}</td>
                <td><FormatRupiah value={post.price}/></td>
                <td>
                  {
                    post.isSold? 
                    <span>Terjual</span>
                    : "Belum Terjual"
                  }
                </td>
                <td>
                  <img 
                  className='delete'
                  src="/img/delete.png"
                  alt="" 
                  onClick={() => handleDelete(post._id)}/>
                </td>
               
              </tr>
            ))}
          </table>
        </div>
        </>
      )}
      
    </div>
  )
}

export default AdminPosts;