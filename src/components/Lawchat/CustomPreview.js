import {useChatContext} from 'stream-chat-react';
import './CustomPreview.scss';

export const CustomPreview = (props) => {
    const { channel, setActiveChannel } = props;

    const { channel: activeChannel } = useChatContext();

    const selected = channel?.id === activeChannel?.id;

    const renderMessageText = () => {
        const lastMessageText = channel.state.messages[channel.state.messages.length - 1]?.text;

        const text = lastMessageText || 'message text';

        return text.length < 60 ? lastMessageText : `${text.slice(0, 70)}...`;
    };

    // if (!channel.state.messages.length) return null;

    return (
        <div
            className={selected ? 'channel-preview__container selected' : 'channel-preview__container'}
            onClick={() => setActiveChannel(channel)}
        >
            <div className='channel-preview__content-wrapper'>
                <div className='channel-preview__content-top'>
                    <p className='channel-preview__content-name'>{channel.data?.name || 'Channel'}</p>
                    <p className='channel-preview__content-name'>{channel.data?.subtitle}</p>
                </div>
                <p className='channel-preview__content-message'>{renderMessageText()}</p>
                <div>전화 하는 UI 넣으면 됨</div>
            </div>
        </div>
    );
};