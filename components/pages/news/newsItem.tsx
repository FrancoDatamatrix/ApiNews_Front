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
      <div>
        <h1 className="mb-2">{newsprop.title}</h1>

        <p>{newsprop.snippet}</p>
        <div>{newsprop.link}</div>
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
