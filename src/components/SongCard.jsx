import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import {playPause, setActiveSong} from '../redux/features/playerSlice'

const SongCard = ({song, i, data, activeSong, isPlaying}) => {


 const dispatch = useDispatch();

 const handlePauseClick= ()=>{
  dispatch(playPause(false))
 };
 const handlePlayClick= ()=>{
  dispatch((setActiveSong({song, data, i})));
  dispatch(playPause(true))
 };
  return(
  <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slidedown rounded-lg cursor-pointer">
    
    <div className="relative w-full h-56 group">
      
      <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
        <PlayPause 
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
        isPlaying={isPlaying}  
        activeSong={activeSong}
        setActiveSong={setActiveSong}
        />
      </div>
      <img src={song.images?.coverart} alt="song_img" />
    </div>
    <div className="mt4 flex flex-col">
      <p className="font-semibold text-lg text-white truncate">
        <Link to={`/songs/${song?.key}`}>
          {song.title}
        </Link>
      </p>
      <p className="text-gray-300 truncate text-sm">
        <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
          {song.subtitle}
        </Link>
      </p>
    </div>
  </div>
)};

export default SongCard;