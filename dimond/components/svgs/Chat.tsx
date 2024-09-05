

import React from "react"
const Chat: React.FC = () => {
    return (
        <>
            <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <rect y="0.5" width="32" height="32" fill="url(#pattern0_48_88)" />
                <defs>
                    <pattern id="pattern0_48_88" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlinkHref="#image0_48_88" transform="scale(0.01)" />
                    </pattern>
                    <image id="image0_48_88" width="100" height="100" xlinkHref="data:image/png;base64,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" />
                </defs>
            </svg>

        </>
    )
}
export default Chat
