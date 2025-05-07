import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import useAuthUser from "../hooks/useAuthUser";
import {
    Chat,
    Channel as ChannelReact,
    Window,
    ChannelHeader,
    MessageList,
    MessageInput,
    Thread,
} from "stream-chat-react";

import { StreamChat, Channel, DefaultGenerics } from "stream-chat";
import toast from "react-hot-toast";
import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";
import useStreamToken from "../hooks/useStreamToken";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;
const ChatPage = () => {
    const { id: targetUserId } = useParams();

    const [chatClient, setChatClient] = useState<StreamChat<DefaultGenerics> | null>(null);
    const [channel, setChannel] = useState<Channel<DefaultGenerics> | null>(null);
    const [loading, setLoading] = useState(true);

    const { authUser } = useAuthUser();
    const { tokenData } = useStreamToken();

    useEffect(() => {
        const initChat = async () => {
            if (!tokenData?.data?.token || !authUser) return;
            try {
                console.log(`Initializing stream chat client...`);

                const client = StreamChat.getInstance(STREAM_API_KEY);
                await client.connectUser({
                    id: authUser._id,
                    name: authUser.fullName,
                    image: authUser.profilePic
                }, tokenData.data.token);

                //Create a channel
                const channelId = [authUser._id, targetUserId].sort().join("-");

                // You and me
                // if i start the chat => chatId = [myId, yourId]
                // if you start the chat => chatId = [yourId, myId]

                const currentChannel = client.channel("messaging", channelId, {
                    members: [authUser._id, targetUserId]
                });

                await currentChannel.watch();
                setChatClient(client);
                setChannel(currentChannel);
            } catch (error) {
                console.error("Error in initializing stream chat client: ", error);
                toast.error("Could not connect to chat. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        initChat();
    }, [authUser, targetUserId, tokenData?.data?.token]);
    const handleVideoCall = () => {
        if (channel) {
            const callUrl = `${window.location.origin}/call/${channel.id}`;

            channel.sendMessage({
                text: `I've started a video call. Join me here: ${callUrl}`
            })

            toast.success("Video call link sent successfully!");
        }
    }
    if (loading || !chatClient || !channel) return <ChatLoader />
    return (
        <div className="h-[calc(100vh-77px)]">
            <Chat client={chatClient}>
                <ChannelReact channel={channel}>
                    <div className="w-full relative">
                        <CallButton handleVideoCall={handleVideoCall} />
                        <Window>
                            <ChannelHeader />
                            <MessageList />
                            <MessageInput focus />
                        </Window>
                    </div>
                    <Thread />
                </ChannelReact>
            </Chat>
        </div>
    )
}
export default ChatPage