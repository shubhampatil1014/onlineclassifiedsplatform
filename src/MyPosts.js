import { useEffect, useState } from "react";
import { getPostDetails } from "./api/Api";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const myPosts = await getPostDetails();
      setPosts(myPosts);
    };
    getPosts();
  }, []);

  return (
    <div className="post-details" id="users-post">
      <h1>My Posts</h1>

      {posts.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Category Details</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {posts.map((post) => (
                <tr key={post.productId}>
                  <td>{post.title}</td>
                  <td>{post.description}</td>
                  <td>{post.categoryName}</td>
                  <td>{post.categoryDetails}</td>
                  <td className="price">₹ {post.price}.00 /-</td>
                  <td className="actions">
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-posts">You haven’t posted anything yet.</p>
      )}

      <style>
        {`
          /* === Admin Tables Scoped Styles === */
          .post-details {
            width: 90%;
            max-width: 1200px;
            margin: 40px auto;
            background-color: #fff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border-radius: 10px;
            padding: 30px;
            font-family: "Poppins", sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .post-details h1 {
            text-align: center;
            color: #333;
            margin-bottom: 25px;
            font-size: 24px;
          }

          /* ✅ Scroll container (only vertical) */
          .post-details .table-container {
            width: 100%;
            max-height: 500px;
            overflow-y: auto;
            overflow-x: hidden;
            border-radius: 8px;
          }

          /* ✅ Table Layout */
          .post-details table {
            width: 100%;
            border-collapse: collapse;
            word-wrap: break-word;
          }

          .post-details thead tr {
            background-color: #007bff;
            color: #fff;
          }

          .post-details th,
          .post-details td {
            padding: 12px 10px;
            border-bottom: 1px solid #ddd;
            font-size: 16px;
            width:fit-content;
          }

          .post-details td {
            color: #333;
          }

          .post-details tbody tr:hover {
            background-color: #f9f9f9;
            transition: background 0.2s ease;
          }

          .post-details td.price {
            text-align: center;
            font-weight: 600;
            color: #28a745;
          }

          .post-details td.actions {
            text-align: center;
          }

          .post-details button {
            background-color: #dc3545;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            transition: background 0.2s ease;
          }

          .post-details button:hover {
            background-color: #c82333;
          }

          .post-details .no-posts {
            text-align: center;
            color: #777;
            font-style: italic;
            margin-top: 30px;
          }

          /* ✅ Responsive */
          @media (max-width: 768px) {
            .post-details {
              width: 95%;
              padding: 20px;
            }

            .post-details th,
            .post-details td {
              font-size: 12px;
              padding: 10px;
            }

            .post-details h1 {
              font-size: 20px;
            }

            .post-details table thead tr th {
            text-align:center !important;
            }
          }
        `}
      </style>
    </div>
  );
}
