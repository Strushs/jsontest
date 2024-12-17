import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = "https://randomuser.me/api";
  let arr = [];
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      let Data = await response.json();
      setData(Data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setTimeout(() => setLoading(false), 1000);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const back = () => {
    console.table(arr);
  };

  return (
    <div className="screen w-full h-screen flex justify-center items-center">
      {loading && (
        <p className="info text-5xl p-4 rounded-md shadow-xl select-none">
          Loading...
        </p>
      )}
      {error && (
        <p className="info text-5xl p-4 rounded-md shadow-xl select-none">
          {error}
        </p>
      )}
      {data && (
        <div className="main flex h-fit w-fit rounded-xl flex-col gap-8 shadow-2xl min-h-[500px] min-w-[300px] justify-between">
          <div className="name flex flex-1 flex-row gap-8 text-5xl justify-between p-8">
            <p className="">
              {data.results[0].name.first + " " + data.results[0].name.last}
            </p>
            <img src={data.results[0].picture.medium} className="select-none" />
          </div>
          <div className="email flex flex-col gap-4 justify-center items-center px-8 text-4xl">
            <p>{data.results[0].email}</p>
            <p>{data.results[0].phone}</p>
          </div>
          <div className="location flex flex-col">
            <p className="px-8 font-bold text-3xl">
              {data.results[0].location.city +
                ", " +
                data.results[0].location.country}
            </p>
            <p className="p-8 py-2">
              {data.results[0].location.street.name +
                " " +
                data.results[0].location.street.number}
            </p>
          </div>
          <div className="button flex justify-center items-center pb-8">
            <button
              className="py-4 px-8 shadow-xl text-xl "
              id="btn"
              onClick={() => {
                fetchData();
              }}
            >
              GENERATE &nbsp; &#x21BA;
            </button>
            <button
              className="py-4 px-8 shadow-xl text-xl ml-5"
              id="back"
              onClick={() => {
                back();
              }}
            >
              Back &#x219E;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
