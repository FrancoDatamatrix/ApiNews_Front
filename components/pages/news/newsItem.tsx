import React from "react";

interface NewsItem {
  image: string;
  title: string;
  link: string;
  snippet: string;
}

const NewsItem: React.FC<NewsItem> = (newsprop) => {
  return (
    <div className="flex ">
      <div className="font-sans">
        <a href={newsprop.link} target="_blank">
          <h1 className="mb-2 text-lg font-bold">{newsprop.title}</h1>

          <p className="mt-5">{newsprop.snippet}</p>
          {/* <div>{newsprop.link}</div> */}
        </a>
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
