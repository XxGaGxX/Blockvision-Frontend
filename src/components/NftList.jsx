import React, { useEffect, useState } from 'react';
import './NftList.css';
import { useNavigate } from 'react-router-dom';
import { Rss, Search, Star, StarFill } from 'react-bootstrap-icons';

export default function Nft() {
  const [nftList, setNftList] = useState([]);
  const [next, setNext] = useState("");
  const [searchResult, setSearchResult] = useState([])
  const navigate = useNavigate();

  async function getNft() {
    const url = "http://localhost:8090/api/collections"; 
    try {
      const res = await fetch(url);
      const nftArray = await res.json();
      console.log(nftArray);

      setNftList(nftArray.collections || []);
      setNext(nftArray.next || "");
    } catch (err) {
      console.error("Errore nel fetch:", err);
    }
  }

  async function showMore() {
    const url = `http://localhost:8090/api/collections/next/${next}`;
    try {
      const res = await fetch(url);
      const nftArray = await res.json();
      if (!res.ok) {
        console.log(":(");
        return;
      }

      setNftList((prevList) => [...prevList, ...nftArray.collections]);
      setNext(nftArray.next);
    } catch (err) {
      console.error(err);
    }
  }

  const handleInputChange = (event) => {
    const search = event.target.value.trim();
    if (search !== "" || search === " ") {
      const filteredNfts = nftList.filter(item =>
        item.collection.toLowerCase().startsWith(search.toLowerCase())
      );
      setSearchResult(filteredNfts);
    } else {
      setSearchResult([]);
    }
  };

  const handleRowClickNft = (collectionId) => {
    navigate(`/nft/collections/${collectionId}`);
  };

  useEffect(() => {
    getNft();
  }, []);

  useEffect(()=>{
    console.log(searchResult)
  }, [searchResult])

  return (
    <div className="mainDivNftPage">
      <div className="titleDivNftPage cenHor ">
        <h1>NFT Collections</h1>
      </div>
      <div className="searchDiv w-100% d-flex justify-content-center align-items-center flex-column">
        <div class="input-group mb-3 mt-4" >
          <input type="text" class="form-control" placeholder="cryptopunks, boredapeyachtclub ecc..." onChange={handleInputChange} aria-label="Recipient's username" aria-describedby="basic-addon2" />
        </div>
        <div>
          {searchResult.length > 0 ? (
            <div className="searchResult bg" style={{ marginTop: "1rem"}}>
              {searchResult.map((col, index) => (
                <div key={index} className="row" onClick={() => handleRowClickNft(col.collection)}>
                  <div className="col">{col.collection}</div>
                </div>
              ))}
            </div>
          ) : (<p></p>
          )}
        </div>
      </div>
      <div className="nftCollectionsDiv">
        <table>
          <tbody>
            {nftList.map((col, index) => (
              <tr key={index} className="rownft" onClick={() => handleRowClickNft(col.collection)}>
                <td>{col.collection}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {next && (
          <button className="loadMoreBtn" onClick={showMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
