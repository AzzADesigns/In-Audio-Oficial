import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TrackInfo {
    title: string;
    artist: string;
    album: string;
    audioUrl: string;
}

interface AudioContextType {
    currentAudio: HTMLAudioElement | null;
    setCurrentAudio: (audio: HTMLAudioElement | null) => void;
    currentTrackInfo: TrackInfo | null;
    setCurrentTrackInfo: (track: TrackInfo | null) => void;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    trackList: TrackInfo[];
    setTrackList: (tracks: TrackInfo[]) => void;
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
    nextTrack: () => void;
    prevTrack: () => void;
    playTrack: (track: TrackInfo) => void;
    pauseTrack: () => void; 
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
    const [currentTrackInfo, setCurrentTrackInfo] = useState<TrackInfo | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackList, setTrackList] = useState<TrackInfo[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const playTrack = (track: TrackInfo) => {
        if (currentAudio) {
            currentAudio.pause();
        }
        const newAudio = new Audio(track.audioUrl);
        newAudio.play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        newAudio.onended = () => {
            setIsPlaying(false);
            setCurrentTrackInfo(null);
        };
        setCurrentAudio(newAudio);
        setCurrentTrackInfo(track);
    };

    const pauseTrack = () => {
        if (currentAudio) {
            currentAudio.pause();
            setIsPlaying(false);
        }
    };

    const nextTrack = () => {
        if (trackList.length === 0) return;
        const next = (currentIndex + 1) % trackList.length;
        setCurrentIndex(next);
        const track = trackList[next];
        setCurrentTrackInfo(track);
        playTrack(track);
    };

    const prevTrack = () => {
        if (trackList.length === 0) return;
        const prev = (currentIndex - 1 + trackList.length) % trackList.length;
        setCurrentIndex(prev);
        const track = trackList[prev];
        setCurrentTrackInfo(track);
        playTrack(track);
    };

    return (
        <AudioContext.Provider value={{
            currentAudio,
            setCurrentAudio,
            currentTrackInfo,
            setCurrentTrackInfo,
            isPlaying,
            setIsPlaying,
            trackList,
            setTrackList,
            currentIndex,
            setCurrentIndex,
            nextTrack,
            prevTrack,
            playTrack,
            pauseTrack  
        }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) throw new Error('useAudio debe usarse dentro de AudioProvider');
    return context;
};