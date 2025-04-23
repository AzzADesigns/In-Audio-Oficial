import { BsSkipBackward, BsSkipForward, BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { FaMusic } from "react-icons/fa6";
import { useAudio } from "../../contexts/AudioContext";

interface AudioControlsProps {
    progress: number;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
}

const AudioControls: React.FC<AudioControlsProps> = ({ progress, setProgress }) => {
    const { currentAudio, currentTrackInfo, setIsPlaying, isPlaying, nextTrack, prevTrack } = useAudio();

    const handlePlayPause = () => {
        if (!currentAudio) return;
        if (isPlaying) {
            currentAudio.pause();
            setIsPlaying(false);
        } else {
            currentAudio.play();
            setIsPlaying(true);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!currentAudio) return;
        const newTime = parseFloat(e.target.value) * currentAudio.duration;
        currentAudio.currentTime = newTime;
        setProgress(newTime / currentAudio.duration);
    };

    return (
        <div className="w-full max-w-4xl flex flex-col md:flex-row justify-center items-center gap-4 px-4">
            <div className="text-xs max-w-52 md:text-sm text-center flex gap-2 items-center text-tertiary">
                <FaMusic className="text-secundary w-5 h-5 " />
                <p className="w-40">{currentTrackInfo?.title} - {currentTrackInfo?.artist}</p>
            </div>

            <div className="flex gap-3 items-center">
                <button onClick={prevTrack} className="px-2 py-1 text-secundary hover:text-tertiary cursor-pointer">
                    <BsSkipBackward className="w-8 h-8" />
                </button>
                <button onClick={handlePlayPause} className="px-2 py-1 text-secundary hover:text-tertiary cursor-pointer">
                    {isPlaying ? (
                        <BsPauseCircleFill className="w-8 h-8" />
                    ) : (
                        <BsFillPlayCircleFill className="w-8 h-8" />
                    )}
                </button>
                <button onClick={nextTrack} className="px-2 py-1 text-secundary hover:text-tertiary cursor-pointer">
                    <BsSkipForward className="w-8 h-8" />
                </button>
            </div>
              
            <input
                type="range"
                min={0}
                max={1}
                step={0.001}
                value={progress}
                onChange={handleSeek}
                className="w-full md:w-1/2 accent-secundary cursor-pointer"
            />
        </div>
    );
};

export default AudioControls;