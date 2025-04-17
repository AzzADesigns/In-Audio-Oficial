import React from 'react'

interface MusicPlayerProps {
    title: string;
    artist: string;
    album: string;
    audioUrl: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ title, artist, album, audioUrl }) => {
    return (
        <div className='text-2xl text-red-500 flex'>
            <h4>{title}</h4>
            <p>{artist}</p>
            <p>{album}</p>
            <audio controls src={audioUrl}></audio>
        </div>
    );
};
