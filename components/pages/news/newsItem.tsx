import React from "react";
import Image from "next/image";

interface NewsItem {
  image: string;
  title: string;
  link: string;
  snippet: string;
  timestamp: string
}

const NewsItem: React.FC<NewsItem> = (newsprop) => {
  let [date, time] = newsprop.timestamp.split("T");
  time = time.split(".")[0];

  return (
    <div className="flex ">
      <div className="font-sans">
        <a href={newsprop.link} target="_blank">
          <h1 className="mb-2 text-lg font-bold">{newsprop.title}</h1>

          <p className="mt-5">{newsprop.snippet}</p>
        </a>
        <div className="flex items-end justify-end mt-5">
          {date} {time}
        </div>
      </div>
      <div className=" w-2/3 flex items-center justify-end">
        <img
          src={newsprop.image}
          alt={newsprop.title}
          className="object-conatin w-64 h-36"
          style={{ borderRadius: 5 }}
        />
      </div>
    </div>
  );
};

export default NewsItem;
