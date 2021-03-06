import React, { FC, useState } from 'react'

import Button from '../../public/Button'
import { IChatContainerProps } from '../../../container/chat'
import { InputChangeHandler, InputKeyDownHandler } from '../../../modules/handler/handler'

const ChatInput: FC<IChatContainerProps> = ({ currentTalker }) => {
    const [ content, setContent ] = useState<IChatHistory['content']>('')

    const _onChange: InputChangeHandler = event => {
        setContent(event.currentTarget.value)
    }

    const sendMsg = () => {
        if (!content) {
            console.log('没有内容')
            return
        }
        if (currentTalker && 'id' in currentTalker) {
            const { id } = currentTalker
            socket.emit('sendMsg', {
                currentTalkUserId: id,
                content
            })
            setContent('')
        }
    }

    const _onKeyDown: InputKeyDownHandler = event => {
        if (event.keyCode === 13) sendMsg()
    }

    return (
        <div className="chatInputBg">
            <div className="chatInput">
                <input
                    placeholder="发送消息"
                    value={content}
                    onChange={_onChange}
                    onKeyDown={_onKeyDown}
                />

                <Button onClick={sendMsg}>发送</Button>
            </div>
        </div>
    )
}

export default ChatInput
