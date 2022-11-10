import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs} from '../components';

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery,  useGetSongRelatedQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
    const {songid} = useParams();
    const dispatch = useDispatch();
    const {activeSong, isPlaying} = useSelector((state) => state.player);
    const {data: songData, isFetching: isFetchingSongDetails} = useGetSongDetailsQuery({songid});
    const {data, isFetching: isFetchingRelatedSongs, error} =  useGetSongRelatedQuery({songid});



    if(isFetchingRelatedSongs || isFetchingSongDetails) return <Loader title='Searching for song details...'/>;

    if(error) return <Error/>;



    const handlePauseClick= ()=>{
        dispatch(playPause(false))
       };
       const handlePlayClick= ({song, i})=>{
        dispatch((setActiveSong({song, data, i})));
        dispatch(playPause(true))
       };

    



   

return (
    <div className="flex flex-col">
        <DetailsHeader artistId='' songData={songData}/>

       <div className=" mb-10">
        <h2 className=" text-white text-3xl font-bold">Lyrics:</h2>
        <div className=" mt-5">
           
            { songData?.sections[1].type === 'LYRICS' ? songData?.sections[1].text.map((Line, i) => (
                <p key={i} className=" text-gray-300 text-base">{Line}</p>
             )) : <p className=" text-gray-300 text-base my-1">
            Sorry no lyrics found!
        </p> }
        </div>
       </div>
        
        <RelatedSongs 
        isPlaying= {isPlaying}
        data= {data}
        activeSong= {activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        />

    </div>         
)};

export default SongDetails;
