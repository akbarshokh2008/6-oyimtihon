import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../axios";
import Header from "../components/Header";

function Details() {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    http
      .get(`/books/${id}`)
      .then((data) => {
        console.log(data.data);
        setUser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div>
      <Header />
      <div className=" asosiy">
        <hr className="pb-16" />
        <div className="flex bg-amber-100 container mx-auto  w-1/2 gap-3  py-4 px-5 rounded-lg border-2 border-blue-400 ">
          <img
            src={user.thumbnailUrl}
            alt="rasm"
            width={300}
            className="w-1/2 "
          />
          <div className="bg-white w-1/2 py-2 px-3 flex flex-col  text-zinc-800 pt-12 gap-4">
            <h2 className="text-2xl">
              <span className=" font-bold ">Title: </span>
              {user.title}
            </h2>
            <p className="text-xl">
              <span className="font-bold">Authors: </span>
              {user.authors && user.authors.join(", ")}
            </p>
            <p className="text-xl">
              <span className="font-bold">Categories: </span>
              {user.categories}
            </p>
            <p className="text-xl">
              <span className="font-bold">PageCount: </span>
              {user.pageCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
