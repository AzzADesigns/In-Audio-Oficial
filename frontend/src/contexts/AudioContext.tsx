import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AudioContextType {
    currentAudio: HTMLAudioElement | null;
    setCurrentAudio: (audio: HTMLAudioElement | null) => void;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    currentTrackInfo: {
        title: string;
        artist: string;
        album: string;
    } | null;
    setCurrentTrackInfo: (info: { title: string; artist: string; album: string } | null) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackInfo, setCurrentTrackInfo] = useState<{ title: string; artist: string; album: string } | null>(null);

    return (
        <AudioContext.Provider value={{ currentAudio, setCurrentAudio, isPlaying, setIsPlaying, currentTrackInfo, setCurrentTrackInfo }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
};
