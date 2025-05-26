import React, { use } from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router';
function nft() {
    const location = useLocation();
    const contract = location.pathname.split('/')[2];
    const id = location.pathname.split('/')[3];
    const [nftData, setNftData] = useState([]);
    const [nftFinanceData, setNftFinanceData] = useState([]);
    const [nftBestOffer, setNftBestOffer] = useState(); 
    const [nftPriceUsd, setNftPriceUsd] = useState();
    const [bestOfferPrice, setBestOfferPrice] = useState();

    async function convertCurrency(value) { 
        const url = `http://localhost:8090/api/conversion/usd/ethereum`
        const res = await fetch(url);
        if (!res.ok) throw new Error("Server error");
        const data = await res.json();
        const price = new Intl.NumberFormat('en', {
            notation: 'compact',
            maximumFractionDigits: 2,
        }).format((value * data.ethereum.usd));
        return price;
    }


    useEffect(() => {
        try {
            const getNftData = async () => {
                const res = await fetch(`http://localhost:8090/api/item/ethereum/${contract}/${id}`);
                if (!res.ok) throw new Error("Server error");
                const data = await res.json();
                data.nft.display_image_url = data.nft.display_image_url.replace("?w=500", "?w=3840");
                console.log(data.nft);
                setNftData(data.nft);
            }
            getNftData();
        } catch (e) {

        }
    }, [id, contract])

    useEffect(() => {
        const getNftFinanceData = async () => {
            try {
                if (nftData && nftData.identifier) {
                    const url = `http://localhost:8090/api/collection/${nftData.collection}/identifier/${id}/listing`
                    console.log(url)
                    const res = await fetch(url);
                    if (!res.ok) throw new Error("Server error");
                    const data = await res.json();
                    if (data.price && data.price.current && data.price.current.value !== undefined) {
                        const price = await convertCurrency(data.price.current.value / Math.pow(10, data.price.current.decimals))
                        setNftPriceUsd(price);
                        setNftFinanceData(data);
                    } else {
                        setNftFinanceData(null);
                    }
                }
            } catch (e) { console.error(e) }
        }
        getNftFinanceData();
    }, [nftData]);

    useEffect(() => { 
        try {
            if (nftData && nftData.identifier) {
                const getNftBestOffer = async () => {
                    const url = `http://localhost:8090/api/collection/${nftData.collection}/identifier/${id}/bestOffer`
                    const res = await fetch(url);
                    if (!res.ok) throw new Error("Server error");
                    const data = await res.json();
                    console.log(data)
                    // const price = await convertCurrency(data.price.value / Math.pow(10, data.price.decimals))
                    // setBestOfferPrice(price);
                    setNftBestOffer(data);
                }
                getNftBestOffer();
                
            }
        } catch (e) { console.error }
        
    }, [nftData])
    

    return (
        // <div style={{ display: "flex", height: "calc(100vh - 56px)", padding:"3rem", justifyContent:"center", alignItems:"center"}} className='container-fluid'>
        //     {nftData && (
        //         <div className="container-fluid" style={{ width: "100%", display: "flex", justifyContent: "center", height: "100%", overflowY: "auto", padding:"0"}}>
        //             <div className="row col-sm-12 " style={{width: "100%" }}>
        //                 <div className="col" style={{ marginRight : "3rem"}}>
        //                     <img src={nftData.display_image_url} alt="NFT" style={{ width: "100%", height: "auto", maxHeight:"50rem" }} />
        //                 </div>
        //                 <div className="col sm-col-12" style={{}}>
        //                     <div className="card" style={{ width: "100%", height: "100%", backgroundColor:"#141414", boxShadow: "0 0 0", color: "white", padding:"0"}}>
        //                         <div className="card-body">
        //                             <h2 className="card-title">{nftData.name ? nftData.name : `${nftData.collection} #${nftData.identifier}`}</h2>
        //                             <h6 className="card-text" style={{ marginTop: "1rem", display: "flex" }}>{nftData.collection} <p style={{ marginLeft: "0.5rem", display: "flex", color: "gray" }}>| Owned by {nftData.owners && nftData.owners.length > 0 ? nftData.owners[0].address : "Unknown"}</p></h6> 
        //                             <p style={{width:"100"}}>
        //                                 <a className='btn btn-outline-dark text-light '>{ nftData.collection }</a>
        //                                 <a className='btn btn-outline-dark text-light ms-2' >{ nftData.collection }</a>
        //                                 <a className='btn btn-outline-dark text-light ms-2'>{ `TOKEN #${nftData.identifier}` }</a>
        //                                 <a className='btn btn-outline-dark text-light ms-2'>{ `${nftData.token_standard }` }</a>
        //                             </p>
        //                             <div className="finance"> {/* TODO: fare un get dei dati finanaziari, prendendo offerte */}
        //                                 <div className="container-fluid">
        //                                     <div className="row d-sm-flex">
        //                                         <div className="col d-flex flex-column">
        //                                             <p className='fs-7 text-white-50'>TOP OFFER</p>
        //                                             {nftBestOffer && nftBestOffer.price
        //                                                 ? <p>{nftBestOffer.price.value / Math.pow(10, nftBestOffer.price.decimals)} {nftBestOffer.price.currency}</p>
        //                                                 : <p>-</p>
        //                                             }
        //                                         </div>
        //                                         <div className="col d-flex flex-column"></div>
        //                                         <div className="col d-flex flex-column"></div>
        //                                         <div className="col d-flex flex-column"></div>
        //                                     </div>
        //                                     <hr />
        //                                     <div className="row">
        //                                         <div className="col">
        //                                             <p className='fs-7 text-white-50'>BUY FOR</p>
        //                                             <div>
        //                                                 {nftFinanceData && nftFinanceData.price && nftFinanceData.price.current
        //                                                     ? (
        //                                                         <div className='d-flex align-items-center'>
        //                                                             <p className='fs-1'>
        //                                                                 {(nftFinanceData.price.current.value / Math.pow(10, nftFinanceData.price.current.decimals))} {nftFinanceData.price.current.currency}
        //                                                             </p>
        //                                                             <p className='fs-5 ' style={{ color: "gray", marginLeft: "0.5rem" }}>(${nftPriceUsd})</p>
        //                                                         </div>
        //                                                     )
        //                                                     : <p className='fs-2 '>-</p>
        //                                                 }
                                                        
        //                                             </div>
        //                                             <div className="container-fluid ">
        //                                                 <div className="row">
        //                                                     <div className="col-9">{nftPriceUsd ? <a href="" className="btn btn-primary w-100">Buy now</a> : <a href="" className="btn btn-primary w-100 disabled">Buy now</a>}</div>
        //                                                     <div className="col-3"><a href="" className="btn btn-outline-light w-100">Make offer</a></div>   
        //                                                 </div>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                     <hr />
        //                                     <div className='container-fluid' style={{ marginTop: "2rem", maxHeight:"300px", overflowY:"auto"}}>
        //                                         <p className='fs-7'>TRAITS : {nftData && nftData.traits ? nftData.traits.length : ""}</p>
        //                                         <div className='container-fluid'>
        //                                             <div className='row'>

        //                                                 {
        //                                                     nftData.traits && nftData.traits.length > 0 ? (
        //                                                         nftData.traits.map((trait, index) => {
        //                                                             return (
        //                                                                 <div key={index} className='col-4 d-flex flex-column mb-3'>
        //                                                                     <div className='card w-100 bg-dark' style={{ height: "120px", width: "5rem" }}>
        //                                                                         <div className='card-body '>
        //                                                                             <p className='fs-7' style={{ color: "gray" }}>{trait.trait_type}</p>
        //                                                                             <p className='fs-7 text-light'>{trait.value}</p>
        //                                                                         </div>
        //                                                                     </div>
        //                                                                 </div>
        //                                                             )
        //                                                         })
        //                                                     ) : (
        //                                                         <p>No traits available</p>
        //                                                     )
        //                                                 }
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     )}
        // </div>
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center py-5">
            {nftData && (
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-6 col-md-12">
                            <img src={nftData.display_image_url} alt="NFT" className="img-fluid rounded" />
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="card bg-dark text-white p-3">
                                <div className="card-body">
                                    <h2 className="card-title">{nftData.name || `${nftData.collection} #${nftData.identifier}`}</h2>
                                    <div className="d-flex align-items-center mb-2">
                                        <h6 className="card-text mb-0">{nftData.collection}</h6>
                                        <p className="mb-0 ms-2 text-muted">| Owned by {nftData.owners?.[0]?.address || "Unknown"}</p>
                                    </div>
                                    <div className="mb-3">
                                        <a className="btn btn-outline-dark text-light">{nftData.collection}</a>
                                        <a className="btn btn-outline-dark text-light ms-2">TOKEN #{nftData.identifier}</a>
                                        <a className="btn btn-outline-dark text-light ms-2">{nftData.token_standard}</a>
                                    </div>
                                    <div className="mb-3">
                                        <div className="row">
                                            <div className="col">
                                                <p className="fs-7 text-white-50">TOP OFFER</p>
                                                {nftBestOffer?.price ? (
                                                    <p>{nftBestOffer.price.value / Math.pow(10, nftBestOffer.price.decimals)} {nftBestOffer.price.currency}</p>
                                                ) : <p>-</p>}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col">
                                                <p className="fs-7 text-white-50">BUY FOR</p>
                                                <div className="d-flex align-items-center">
                                                    {nftFinanceData?.price?.current ? (
                                                        <>
                                                            <p className="fs-1 mb-0">
                                                                {(nftFinanceData.price.current.value / Math.pow(10, nftFinanceData.price.current.decimals))} {nftFinanceData.price.current.currency}
                                                            </p>
                                                            <p className="fs-5 text-muted ms-2">(${nftPriceUsd})</p>
                                                        </>
                                                    ) : <p className="fs-2">-</p>}
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-9">
                                                        <a href="#" className="btn btn-primary w-100">Buy now</a>
                                                    </div>
                                                    <div className="col-3">
                                                        <a href="#" className="btn btn-outline-light w-100">Make offer</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="mt-4">
                                            <p className="fs-7">TRAITS: {nftData.traits?.length || 0}</p>
                                            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
                                                {nftData.traits?.map((trait, index) => (
                                                    <div key={index} className="col">
                                                        <div className="card bg-dark h-100">
                                                            <div className="card-body">
                                                                <p className="text-muted fs-7">{trait.trait_type}</p>
                                                                <p className="text-light fs-7">{trait.value}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default nft
