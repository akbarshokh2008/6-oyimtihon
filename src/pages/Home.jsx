import React, { useEffect, useRef, useState } from "react";
import http from "../axios";
import "../App.css";
import Header from "../components/Header";
import Search from "../img/search.svg";
import { useNavigate } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";

function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filterBook, setFilterBook] = useState([]);
  const [loading, setLoading] = useState(false);

  const minRef = useRef();
  const maxRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    http
      .get("/books")
      .then((data) => {
        setBooks(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    if (search.length >= 2) {
      http
        .get(`/books?search=${search}`)
        .then((data) => {
          setBooks(data.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [search]);

  function handleDetails(id) {
    navigate(`/books/${id}`);
  }

  const bookFillter = (filterBook.length > 0 ? filterBook : books).filter(
    (item) => {
      return search.toLowerCase() === ""
        ? item
        : item.title.toLowerCase().includes(search.toLowerCase());
    }
  );

  function handleFilter() {
    const minPage = minRef.current.value;
    const maxPage = maxRef.current.value;
    setLoading(true);
    http
      .get(`/books/filter?minPages=${minPage}&maxPages=${maxPage}`)
      .then((data) => {
        setFilterBook(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <Header />
      <div className="bg-slate-200">
        <div className="container px-32 mx-auto pt-10 pb-5 qidiruv flex justify-between items-center">
          <div className="search bg-white flex gap-2 border-2 border-solid border-slate-900 py-1 px-2 rounded-md">
            <img src={Search} alt="" width={20} />
            <input
              type="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Qidiruv..."
              className="outline-none"
            />
          </div>
          <div className="filter">
            <form className="flex gap-4">
              <input
                ref={minRef}
                type="number"
                placeholder="Min"
                className="w-[100px] outline-none border border-solid border-slate-900 py-1 px-4 rounded-md"
              />
              <input
                ref={maxRef}
                type="number"
                placeholder="Max"
                className=" w-[100px] outline-none border border-solid border-slate-900 py-1 px-4 rounded-md"
              />
              <button
                type="button"
                onClick={handleFilter}
                className="bg-slate-500 py-2 px-5 rounded-lg text-white hover:bg-slate-400"
              >
                Filter
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className=" px-32 grid grid-cols-4 gap-4 container mx-auto pt-10">
        {loading ? (
          <PuffLoader
            color="#00faff"
            size={300}
            className="ml-[450px] mt-[200px]"
          />
        ) : (
          bookFillter.length > 0 &&
          bookFillter.map((book) => {
            return (
              <div
                key={book.id}
                onClick={() => {
                  handleDetails(book.id);
                }}
                className="w-[250px] border-2 border-solid bg-slate-200 rounded-2xl px-2 pb-4 hover:shadow-xl cursor-pointer "
              >
                <img
                  src={book.thumbnailUrl}
                  alt="rasm"
                  width={250}
                  height={200}
                  className="rounded-2xl mb-4"
                />
                <h3>
                  <b className="text-gray-600">Title: </b>
                  {book.title}
                </h3>
                <p>
                  <b className="text-gray-600">Authors: </b>
                  {book.authors.join(" , ")}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Home;
