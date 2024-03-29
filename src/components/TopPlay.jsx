import { useEffect, useRef } from "react";
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode} from "swiper";


import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";


import 'swiper/css';
import 'swiper/css/free-mode'

const TopPlay = ({}) => {

  useEffect(()=> {
    divRef.current.scrollIntoView({behavior: 'smooth'})
  })

  const dispatch = useDispatch();
  const {activeSong, isPlaying} = useSelector((state)=> state.player);
  const {data} = useGetTopChartsQuery();
  const divRef = useRef(null);

  const topPlays= data?.slice(0, 4); 
  const topArtists= data?.slice(0, 15);

  const TopChartCard = ({song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick})=>(
    <div className=" w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <h3 className=" text-white font-medium mr-3 text-base">{i+1}.</h3>
      <div className="flex flex-1 flex-row justify-between items-center">
        <img src={song?.images?.coverart} alt={song?.title} className='w-20 h-20 rounded-full'/>
        <div className="flex flex-1 flex-col justify-center mx-3">
          <Link to={`/songs/${song.key}`}>
            <p className=" text-xl font-bold text-white">{song?.title}</p>          
          </Link>
          <Link to={`/artists/${song?.artists[0]?.adamid}`}>
            {console.log(song.artists[0])}
            <p className=" text-base text-gray-300 mt-1 ">{song?.subtitle}</p>          
          </Link>
        </div>
      </div>
      <PlayPause 
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={()=>handlePlayClick(song, i)}
      />
    </div>
  );

  
 const handlePauseClick= ()=>{
  dispatch(playPause(false))
 };
 const handlePlayClick= (song, i)=>{
  dispatch(setActiveSong({song, data, i}));
  dispatch(playPause(true))
 };

return (
    <div ref={divRef} className='xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[390px] max-w-full flex flex-col'>
      
      <div className=" w-full flex flex-col">
        <div className=" flex flex-row justify-between items-center ">
          <h2 className="text-2xl text-white font-bold">Top Charts</h2>
          <Link to='/top-charts'>
            <p className=" text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className=" mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i)=> (
            <TopChartCard 
            song={song} 
            key={song.key} 
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
            />
          ))}
        </div>
      </div>

      <div className=" w-full flex flex-col mt-8">
      <div className=" flex flex-row justify-between items-center ">
          <h2 className="text-2xl text-white font-bold">Top Artists</h2>
          <Link to='/top-artists'>
            <p className=" text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper 
          slidesPerView='auto'
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className='mt-4'
        >
          {topArtists?.map((song, i)=>(
            <SwiperSlide 
            key={song.key} 
            song={song} 
            i={i}
            style={{width: '20%', height: 'auto'}}
            className='shadow-lg rounded-full animate-slideright'
            >
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img src={song?.images?.background} alt="artist" 
                className="rounded-full object-cover w-full"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      </div>
)};

export default TopPlay;
