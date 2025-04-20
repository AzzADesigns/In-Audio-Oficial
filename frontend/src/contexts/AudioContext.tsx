import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
    onEndReached: (() => void) | null;
    setOnEndReached: (callback: (() => void) | null) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
    const [currentTrackInfo, setCurrentTrackInfo] = useState<TrackInfo | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackList, setTrackList] = useState<TrackInfo[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [onEndReached, setOnEndReached] = useState<(() => void) | null>(null);

    useEffect(() => {
        if (trackList.length === 0 || currentIndex < 1 || currentIndex >= trackList.length) return;
        const track = trackList[currentIndex];
        playTrack(track);
    }, [currentIndex, trackList]);

    const playTrack = (track: TrackInfo) => {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.onended = null;
        }

        const newAudio = new Audio(track.audioUrl);
        newAudio.play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));

        newAudio.onended = () => {
            setIsPlaying(false);
            setCurrentTrackInfo(null);

            if (currentIndex + 1 < trackList.length) {
                setCurrentIndex(prev => prev + 1);
            } else if (onEndReached) {
                onEndReached(); 
            }
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

        if (currentIndex + 1 < trackList.length) {
            setCurrentIndex(prev => prev + 1);
        } else if (onEndReached) {
            onEndReached();
        }
    };

    const prevTrack = () => {
        if (trackList.length === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex - 1 + trackList.length) % trackList.length);
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
            pauseTrack,
            onEndReached,
            setOnEndReached
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
