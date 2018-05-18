import React from "react";
import {ReactiveBase, DataSearch} from "@appbaseio/reactivesearch";
import {ReactiveMap} from "@appbaseio/reactivemaps";

import "./App.css";
import Filters from "./filters";

export default () => (
  <div className="main-container">
    <ReactiveBase
      app="housing"
      credentials="0aL1X5Vts:1ee67be1-9195-4f4b-bd4f-a91cd1b5e4b5"
      type="listing"
      theme={{
        colors: {
          primaryColor: "#FF3A4E"
        }
      }}
    >
      <div className="nav-container">
        <nav className="nav">
          <div className="title">airbeds</div>
        </nav>
      </div>

      <div className="filter-search-container">
        <Filters />
        <DataSearch
          componentId="search"
          dataField="name"
          autosuggest={false}
          placeholder="Search housings..."
          iconPosition="left"
          className="search"
        />
      </div>
      <div>
        <ReactiveMap
          componentId="map"
          dataField="location"
          defaultZoom={13}
          pagination
          onPageChange={() => {
            window.scrollTo(0, 0);
          }}
          style={{
            width: "calc(100% - 280px)",
            height: "calc(100vh - 52px)"
          }}
          className="rightCol"
          showMarkerClusters={false}
          showSearchAsMove={false}
          onAllData={(
            hits,
            streamHits,
            loadMore,
            renderMap,
            renderPagination
          ) => (
            <div style={{display: "flex"}}>
              <div className="card-container">
                {hits.map(data => (
                  <div key={data._id} className="card">
                    <div
                      className="card__image"
                      style={{backgroundImage: `url(${data.image})`}}
                      alt={data.name}
                    />
                    <div>
                      <h2>{data.name}</h2>
                      <div className="card__price">${data.price}</div>
                      <p className="card__info">
                        {data.room_type} · {data.accommodates} guests
                      </p>
                    </div>
                  </div>
                ))}
                {renderPagination()}
              </div>
              <div className="map-container">{renderMap()}</div>
            </div>
          )}
          onData={data => ({
            label: (
              <span style={{width: 40, display: "block", textAlign: "center"}}>
                ${data.price}
              </span>
            )
          })}
          react={{
            and: ["GuestSensor", "PriceSensor", "DateRangeSensor", "search"]
          }}
        />
      </div>
    </ReactiveBase>
  </div>
);
