import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom"
import useAuthUser from "../hooks/useAuthUser";
import useStreamToken from "../hooks/useStreamToken";
import {
    Call,
    CallControls,
    CallingState,
    PaginatedGridLayout,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
    useCallStateHooks,

} from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";
import { Check, Grid2X2Icon } from "lucide-react";
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;
const CallPage = () => {
    const { id: callId } = useParams();
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
    const [client, setClient] = useState<StreamVideoClient | null>(null);
    const [call, setCall] = useState<Call | null>(null);
    const [isConnecting, setIsConnecting] = useState(true);
    const { authUser, isLoading } = useAuthUser();

    const { tokenData } = useStreamToken();
    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <><PaginatedGridLayout /></>
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition={'left'} />
            case 'speaker-left':
                return <SpeakerLayout participantsBarPosition={'right'} />
            default:
                break;
        }
    }
    const CallContent = () => {
        const { useCallCallingState } = useCallStateHooks();
        const callingState = useCallCallingState();
        if (callingState === CallingState.LEFT) return <Navigate to={"/"} replace />;
        return (
            <StreamTheme >
                <CallLayout />
                <div className="flex items-center gap-2">
                    <CallControls />
                    <div className="dropdown dropdown-top">
                        <button tabIndex={0} className="rounded-full bg-[#19232d] hover:bg-[#4c535b] size-10 flex items-center justify-center">
                            <Grid2X2Icon size={20} className="!mx-auto" />
                        </button>
                        <ul tabIndex={0} className="menu dropdown-content bg-[#19232d] rounded-box z-[1] w-52 p-2 shadow flex flex-col gap-2 mb-2">
                            <li className="hover:text-primary cursor-pointer" onClick={() => setLayout("grid")}>
                                <p>
                                    Grid {layout === "grid" && <Check size={10} />}
                                </p>
                            </li>
                            <li className="hover:text-primary cursor-pointer" onClick={() => setLayout("speaker-right")}>
                                <p>
                                    Speaker right {layout === "speaker-right" && <Check size={10} />}
                                </p>
                            </li>
                            <li className="hover:text-primary cursor-pointer" onClick={() => setLayout("speaker-left")}>
                                <p>
                                    Speaker left {layout === "speaker-left" && <Check size={10} />}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </StreamTheme>
        )
    }
    useEffect(() => {
        const initCall = async () => {
            if (call || !tokenData?.data?.token || !authUser) {
                setIsConnecting(false);
                return;
            }
            try {
                console.log(`Initializing stream video call client...`);
                const user = {
                    id: authUser._id,
                    name: authUser.fullName,
                    image: authUser.profilePic
                };
                const videoClient = new StreamVideoClient({
                    apiKey: STREAM_API_KEY,
                    token: tokenData?.data?.token,
                    user
                });
                const callInstance = videoClient.call("default", callId || "");

                await callInstance.join({ create: true });
                console.log("Joined call successfully");

                setClient(videoClient);
                setCall(callInstance);
            } catch (error) {
                console.error("Error joining call: ", error);
                toast.error("Could not join call. Please try again.");
            } finally {
                setIsConnecting(false);
            }
        }
        initCall();
    }, [authUser, call, callId, tokenData?.data?.token])
    if (isConnecting || isLoading) return <PageLoader />
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div className="relative">
                {
                    client && call ?
                        <StreamVideo client={client}>
                            <StreamCall call={call}>
                                <CallContent />
                            </StreamCall>
                        </StreamVideo> :
                        !call ?
                            <div className="flex items-center justify-center h-full">
                                <p>Please wait a minutes or refresh the page.</p>
                            </div> :
                            !client &&
                            <div className="flex items-center justify-center h-full">
                                <p>Could not initialize call. Please refresh or try again later.</p>
                            </div>


                }
            </div>
        </div>
    )
}

export default CallPage